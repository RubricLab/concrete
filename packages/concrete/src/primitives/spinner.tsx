import type { SVGProps } from 'react'
import { z } from 'zod/v4'
import { numberControl, selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

export type SpinnerProps = SVGProps<SVGSVGElement> & {
	size?: number
	tone?: 'default' | 'inverse' | 'sky'
}

export function Spinner({ className, size = 18, tone = 'default', ...props }: SpinnerProps) {
	return (
		<svg
			aria-label="Loading"
			className={cn(
				concreteClassNames.spinnerSvg,
				tone === 'sky' && concreteClassNames.spinnerSky,
				tone === 'inverse' && concreteClassNames.spinnerInverse,
				className
			)}
			height={size}
			role="img"
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			<title>Loading</title>
			<circle cx="12" cy="12" r="9" strokeWidth="2.5" />
			<path d="M12 3a9 9 0 0 1 9 9" strokeWidth="2.5" />
		</svg>
	)
}

const spinnerToneValues = ['default', 'sky', 'inverse'] as const

export const spinnerPropsSchema = z
	.object({
		size: z.number().min(1).default(18),
		tone: z.enum(spinnerToneValues).default('default')
	})
	.strict()

export const spinnerPrimitiveDefinition = defineConcretePrimitive({
	category: 'feedback',
	component: Spinner,
	controls: [
		numberControl('size', 'Size', '18'),
		selectControl('tone', 'Tone', 'default', spinnerToneValues)
	],
	description: 'Small loading indicator for command and inline pending states.',
	guidance:
		'Spinners are for short pending states. Prefer progress when completion is measurable and skeletons when layout is pending.',
	kind: 'primitive',
	name: 'Spinner',
	pressure: ['product', 'generative'],
	props: [
		prop('size', 'number', 'Rendered SVG width and height.', '18'),
		prop('tone', "'default' | 'sky' | 'inverse'", 'Stroke tone.', 'default')
	],
	renderExample: renderSpinnerExample,
	schema: spinnerPropsSchema,
	slug: 'spinner',
	states: states([
		['default', 'Default, sky, and inverse spinners.'],
		['tiny', 'Small inline pending indicator.']
	])
})

function renderSpinnerExample(state = 'default') {
	return (
		<Frame>
			<Spinner size={state === 'tiny' ? 12 : 14} />
			<Spinner size={18} tone="sky" />
			<span style={{ background: 'var(--concrete-ink-9)', borderRadius: 999, padding: '6px 10px' }}>
				<Spinner size={12} tone="inverse" />
			</span>
		</Frame>
	)
}
