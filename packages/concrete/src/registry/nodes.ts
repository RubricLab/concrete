import type { z } from 'zod/v4'
import {
	type ConcreteItemReferenceKind,
	type ConcreteNode,
	type ConcreteNodeTree,
	concreteNodeSchema,
	concreteNodeTreeSchema
} from '../schemas'
import { componentDefinitions, primitiveDefinitions } from './items'

export type ConcreteNodeItemDefinition = {
	kind: ConcreteItemReferenceKind
	schema: z.ZodType
	slug: string
}

export type ConcreteNodeValidationPath = Array<number | string>

export type ConcreteNodeValidationIssue = {
	message: string
	path: ConcreteNodeValidationPath
}

export type ConcreteNodeValidationSuccess<Value> = {
	data: Value
	success: true
}

export type ConcreteNodeValidationFailure = {
	issues: ConcreteNodeValidationIssue[]
	success: false
}

export type ConcreteNodeValidationResult<Value> =
	| ConcreteNodeValidationFailure
	| ConcreteNodeValidationSuccess<Value>

export const concreteNodeItemDefinitions: readonly ConcreteNodeItemDefinition[] = [
	...primitiveDefinitions.map(definition => ({
		kind: definition.kind,
		schema: definition.schema,
		slug: definition.slug
	})),
	...componentDefinitions.map(definition => ({
		kind: definition.kind,
		schema: definition.schema,
		slug: definition.slug
	}))
]

export function validateConcreteNode(
	input: unknown,
	definitions: readonly ConcreteNodeItemDefinition[] = concreteNodeItemDefinitions
): ConcreteNodeValidationResult<ConcreteNode> {
	const parsedNode = concreteNodeSchema.safeParse(input)

	if (!parsedNode.success) {
		return { issues: issuesFromZodError(parsedNode.error, []), success: false }
	}

	const issues = collectConcreteNodeIssues(parsedNode.data, definitionsByReference(definitions), [])

	return issues.length > 0 ? { issues, success: false } : { data: parsedNode.data, success: true }
}

export function validateConcreteNodeTree(
	input: unknown,
	definitions: readonly ConcreteNodeItemDefinition[] = concreteNodeItemDefinitions
): ConcreteNodeValidationResult<ConcreteNodeTree> {
	const parsedTree = concreteNodeTreeSchema.safeParse(input)

	if (!parsedTree.success) {
		return { issues: issuesFromZodError(parsedTree.error, []), success: false }
	}

	const definitionMap = definitionsByReference(definitions)
	const issues = parsedTree.data.nodes.flatMap((node, nodeIndex) =>
		collectConcreteNodeIssues(node, definitionMap, ['nodes', nodeIndex])
	)

	return issues.length > 0 ? { issues, success: false } : { data: parsedTree.data, success: true }
}

function collectConcreteNodeIssues(
	node: ConcreteNode,
	definitionMap: ReadonlyMap<string, ConcreteNodeItemDefinition>,
	path: ConcreteNodeValidationPath
): ConcreteNodeValidationIssue[] {
	switch (node.type) {
		case 'text':
			return []
		case 'item':
			return [
				...itemReferenceIssues(node, definitionMap, path),
				...node.children.flatMap((childNode, childIndex) =>
					collectConcreteNodeIssues(childNode, definitionMap, [...path, 'children', childIndex])
				),
				...Object.entries(node.slots).flatMap(([slotName, slotNodes]) =>
					slotNodes.flatMap((slotNode, slotNodeIndex) =>
						collectConcreteNodeIssues(slotNode, definitionMap, [
							...path,
							'slots',
							slotName,
							slotNodeIndex
						])
					)
				)
			]
	}
}

function itemReferenceIssues(
	node: Extract<ConcreteNode, { type: 'item' }>,
	definitionMap: ReadonlyMap<string, ConcreteNodeItemDefinition>,
	path: ConcreteNodeValidationPath
): ConcreteNodeValidationIssue[] {
	const definition = definitionMap.get(definitionKey(node.item.kind, node.item.slug))

	if (!definition) {
		return [
			{
				message: `Unknown ${node.item.kind} reference "${node.item.slug}".`,
				path: [...path, 'item', 'slug']
			}
		]
	}

	const parsedProps = definition.schema.safeParse(node.props)

	return parsedProps.success ? [] : issuesFromZodError(parsedProps.error, [...path, 'props'])
}

function definitionsByReference(
	definitions: readonly ConcreteNodeItemDefinition[]
): ReadonlyMap<string, ConcreteNodeItemDefinition> {
	return new Map(
		definitions.map(definition => [definitionKey(definition.kind, definition.slug), definition])
	)
}

function definitionKey(kind: ConcreteItemReferenceKind, slug: string): string {
	return `${kind}:${slug}`
}

function issuesFromZodError(
	error: z.ZodError,
	path: ConcreteNodeValidationPath
): ConcreteNodeValidationIssue[] {
	return error.issues.map(issue => ({
		message: issue.message,
		path: [...path, ...issue.path.map(pathPart)]
	}))
}

function pathPart(value: PropertyKey): number | string {
	return typeof value === 'number' ? value : String(value)
}
