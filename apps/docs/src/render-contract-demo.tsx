'use client'

import {
	Badge,
	Button,
	Cluster,
	Frame,
	Panel,
	Stack,
	Textarea,
	TextLink
} from '@rubriclab/concrete'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { z } from 'zod/v4'

const renderableButtonHierarchies = ['primary', 'secondary', 'soft'] as const
const renderableButtonIntents = ['neutral', 'sky', 'ultra'] as const

const buttonContractSchema = z
	.object({
		hierarchy: z.enum(renderableButtonHierarchies).default('primary'),
		intent: z.enum(renderableButtonIntents).default('sky'),
		label: z.string().min(1).default('Ship'),
		loading: z.boolean().default(false)
	})
	.strict()

type ButtonContract = z.output<typeof buttonContractSchema>

type ButtonContractResult =
	| {
			contract: ButtonContract
			message?: never
			success: true
	  }
	| {
			contract: ButtonContract
			message: string
			success: false
	  }

const fallbackContract = buttonContractSchema.parse({
	hierarchy: 'secondary',
	intent: 'neutral',
	label: 'Invalid JSON'
})

const initialContract = `{
  "label": "Ship",
  "hierarchy": "soft",
  "intent": "sky",
  "loading": false
}`

export function RenderContractDemo() {
	const [source, setSource] = useState(initialContract)
	const result = useMemo(() => parseButtonContract(source), [source])
	const routeQuery = useMemo(() => createRouteQuery(result.contract), [result.contract])
	const reactRoute = `/render/primitive/button?${routeQuery}`
	const imageRoute = `/render/primitive/button/screenshot?${routeQuery}`

	function updateSource(event: ChangeEvent<HTMLTextAreaElement>) {
		setSource(event.currentTarget.value)
	}

	return (
		<Panel
			density="compact"
			depth="raised"
			meta={
				<Badge intent={result.success ? 'terminal' : 'danger'}>
					{result.success ? 'Valid' : 'Error'}
				</Badge>
			}
			title="Editable props JSON"
		>
			<Stack density="compact">
				<Textarea
					aria-label="Editable button props JSON"
					onChange={updateSource}
					rows={7}
					spellCheck={false}
					value={source}
				/>
				<Frame
					align="center"
					header={result.success ? 'Rendered primitive' : result.message}
					headerMeta="Button contract"
					scale="compact"
					texture={result.success ? 'field' : 'dots'}
				>
					<Button
						disabled={!result.success}
						hierarchy={result.contract.hierarchy}
						intent={result.contract.intent}
						density="small"
						loading={result.success ? result.contract.loading : false}
					>
						{result.contract.label}
					</Button>
				</Frame>
				<Cluster density="compact">
					<TextLink href={reactRoute} intent="sky">
						React URL
					</TextLink>
					<TextLink href={imageRoute} intent="sky">
						Image URL
					</TextLink>
				</Cluster>
			</Stack>
		</Panel>
	)
}

function parseButtonContract(source: string): ButtonContractResult {
	try {
		const parsedValue: unknown = JSON.parse(source)
		const parsedContract = buttonContractSchema.safeParse(parsedValue)

		if (parsedContract.success) {
			return {
				contract: parsedContract.data,
				success: true
			}
		}

		return {
			contract: fallbackContract,
			message: parsedContract.error.issues[0]?.message ?? 'Invalid button props.',
			success: false
		}
	} catch (error) {
		return {
			contract: fallbackContract,
			message: error instanceof Error ? error.message : 'Invalid JSON.',
			success: false
		}
	}
}

function createRouteQuery(contract: ButtonContract): string {
	const routeQuery = new URLSearchParams({
		hierarchy: contract.hierarchy,
		intent: contract.intent,
		label: contract.label
	})

	if (contract.loading) {
		routeQuery.set('loading', 'true')
	}

	return routeQuery.toString()
}
