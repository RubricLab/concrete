import type { HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { Progress, type ProgressTone } from './progress'
import { cn } from './utils'

const distributionToneValues = ['default', 'sky', 'terminal', 'ultra', 'error'] as const

export type DistributionDatum = {
	label: string
	tone?: ProgressTone
	value: number
}

export type DistributionProps = HTMLAttributes<HTMLDivElement> & {
	data: readonly DistributionDatum[]
}

export function Distribution({ className, data, ...props }: DistributionProps) {
	return (
		<div className={cn(concreteClassNames.distribution, className)} {...props}>
			{data.map(datum => (
				<div className={concreteClassNames.distributionRow} key={datum.label}>
					<span>{datum.label}</span>
					<Progress tone={datum.tone ?? 'default'} value={datum.value} />
					<span className={concreteClassNames.distributionValue}>{datum.value}%</span>
				</div>
			))}
		</div>
	)
}

export const distributionDatumSchema = z
	.object({
		label: z.string().min(1),
		tone: z.enum(distributionToneValues).optional(),
		value: z.number().min(0).max(100)
	})
	.strict()

export const distributionPropsSchema = z
	.object({
		data: z.array(distributionDatumSchema).default([
			{ label: 'Direct', value: 47 },
			{ label: 'Referral', tone: 'sky', value: 28 },
			{ label: 'Agentic', tone: 'terminal', value: 18 }
		])
	})
	.strict()

export const distributionPrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Distribution,
	controls: [],
	description: 'Part-to-whole bar list for dense summary data.',
	guidance:
		'Distribution is for small labeled shares. Use it when comparison matters more than exact chart reading.',
	kind: 'primitive',
	name: 'Distribution',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'data',
			'readonly { label: string; value: number; tone?: ProgressTone }[]',
			'Part-to-whole rows.',
			'',
			true
		)
	],
	renderExample: renderDistributionExample,
	schema: distributionPropsSchema,
	slug: 'distribution',
	states: states([['default', 'Labeled part-to-whole bars.']])
})

function renderDistributionExample() {
	return (
		<Frame>
			<Distribution
				data={[
					{ label: 'Direct', value: 47 },
					{ label: 'Referral', tone: 'sky', value: 28 },
					{ label: 'Agentic', tone: 'terminal', value: 18 }
				]}
			/>
		</Frame>
	)
}
