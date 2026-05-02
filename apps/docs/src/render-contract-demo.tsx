'use client'

import { Button, ConcreteIcon } from '@rubriclab/concrete'
import Link from 'next/link'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { z } from 'zod/v4'

const renderableButtonVariants = ['primary', 'secondary', 'sky-soft', 'ultra'] as const

const buttonContractSchema = z
	.object({
		label: z.string().min(1).default('Ship'),
		loading: z.boolean().default(false),
		variant: z.enum(renderableButtonVariants).default('primary')
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
	label: 'Invalid JSON',
	variant: 'secondary'
})

const initialContract = `{
  "label": "Ship",
  "variant": "sky-soft",
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
		<div className="agentSchemaPanel renderContractDemo">
			<div className="renderContractHead">
				<span className="panelKicker">Editable props JSON</span>
				<span data-valid={result.success}>{result.success ? 'Valid' : 'Schema error'}</span>
			</div>
			<textarea
				aria-label="Editable button props JSON"
				onChange={updateSource}
				spellCheck={false}
				value={source}
			/>
			<div className="renderContractPreview" data-error={result.success ? undefined : true}>
				<div className="renderContractPreviewHead">
					<span>{result.success ? 'Rendered primitive' : result.message}</span>
					<em>Button contract</em>
				</div>
				<div className="renderContractCanvas">
					<Button
						disabled={!result.success}
						loading={result.success ? result.contract.loading : false}
						size="small"
						variant={result.contract.variant}
					>
						{result.contract.label}
					</Button>
				</div>
			</div>
			<div className="agentRouteRow">
				<Link href={reactRoute}>
					<ConcreteIcon name="code" />
					React URL
				</Link>
				<Link href={imageRoute}>
					<ConcreteIcon name="image" />
					Image URL
				</Link>
			</div>
		</div>
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
		label: contract.label,
		variant: contract.variant
	})

	if (contract.loading) {
		routeQuery.set('loading', 'true')
	}

	return routeQuery.toString()
}
