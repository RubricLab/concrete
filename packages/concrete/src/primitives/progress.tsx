import type { CSSProperties, HTMLAttributes } from 'react'
import { z } from 'zod/v4'
import { numberControl, selectControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import type { ConcreteSignal } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { clampPercent, cn } from './utils'

const progressIndeterminateValues = ['', 'shuttle', 'lined'] as const
const progressSizeValues = ['thin', 'medium', 'thick'] as const
const progressToneValues = ['default', 'sky', 'terminal', 'ultra', 'error'] as const

export type ProgressIndeterminate = 'lined' | 'shuttle'
export type ProgressSize = (typeof progressSizeValues)[number]
export type ProgressTone = 'default' | ConcreteSignal | 'sky'

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
	indeterminate?: ProgressIndeterminate
	size?: ProgressSize
	tone?: ProgressTone
	value?: number
}

type ProgressStyle = CSSProperties & {
	'--concrete-progress-value': string
}

export function Progress({
	className,
	indeterminate,
	size = 'medium',
	tone = 'default',
	value = 0,
	...props
}: ProgressProps) {
	const percent = indeterminate ? 100 : clampPercent(value)
	const style: ProgressStyle = { '--concrete-progress-value': `${percent}%` }

	return (
		<div
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={indeterminate ? undefined : percent}
			className={cn(
				concreteClassNames.progressTrack,
				getProgressSizeClass(size),
				indeterminate === 'lined' && concreteClassNames.progressLined,
				className
			)}
			data-tone={tone}
			role="progressbar"
			{...props}
		>
			{indeterminate === 'lined' ? null : (
				<span
					className={cn(
						concreteClassNames.progressFill,
						getProgressToneClass(tone),
						indeterminate === 'shuttle' && concreteClassNames.progressShuttle
					)}
					style={style}
				/>
			)}
		</div>
	)
}

export type SegmentedProgressProps = HTMLAttributes<HTMLDivElement> & {
	segments: number
	value: number
}

export function SegmentedProgress({
	className,
	segments,
	value,
	...props
}: SegmentedProgressProps) {
	const safeSegments = Math.max(1, Math.floor(segments))
	const activeSegments = clampPercent((value / safeSegments) * 100) / (100 / safeSegments)

	return (
		<div
			aria-label={`${value} of ${safeSegments}`}
			className={cn(concreteClassNames.segmentedProgress, className)}
			role="img"
			{...props}
		>
			{Array.from({ length: safeSegments }, (_, index) => (
				<i data-active={index < activeSegments} key={index} />
			))}
		</div>
	)
}

export type ProgressRingProps = HTMLAttributes<HTMLDivElement> & {
	size?: number
	strokeWidth?: number
	tone?: ProgressTone
	value: number
}

type RingStyle = CSSProperties & {
	'--concrete-ring-size': string
	'--concrete-ring-stroke': string
}

export function ProgressRing({
	className,
	size = 96,
	strokeWidth = 6,
	tone = 'default',
	value,
	...props
}: ProgressRingProps) {
	const percent = clampPercent(value)
	const radius = 42
	const circumference = 2 * Math.PI * radius
	const dash = (percent / 100) * circumference
	const style: RingStyle = {
		'--concrete-ring-size': `${size}px`,
		'--concrete-ring-stroke': `${strokeWidth}px`
	}

	return (
		<div
			aria-label={`${percent}%`}
			className={cn(concreteClassNames.progressRing, getProgressToneClass(tone), className)}
			role="img"
			style={style}
			{...props}
		>
			<svg viewBox="0 0 96 96">
				<title>{`${percent}%`}</title>
				<circle className={concreteClassNames.progressRingTrack} cx="48" cy="48" r={radius} />
				<circle
					className={concreteClassNames.progressRingFill}
					cx="48"
					cy="48"
					r={radius}
					strokeDasharray={`${dash} ${circumference}`}
				/>
			</svg>
			<span className={concreteClassNames.progressRingCenter}>
				{percent}
				<span className={concreteClassNames.progressRingUnit}>%</span>
			</span>
		</div>
	)
}

export const progressPropsSchema = z
	.object({
		indeterminate: z.enum(progressIndeterminateValues).default(''),
		size: z.enum(progressSizeValues).default('medium'),
		tone: z.enum(progressToneValues).default('default'),
		value: z.number().min(0).max(100).default(62)
	})
	.strict()

export const progressPrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Progress,
	controls: [
		numberControl('value', 'Value', '62'),
		selectControl('tone', 'Tone', 'default', progressToneValues),
		selectControl('size', 'Size', 'medium', progressSizeValues),
		selectControl('indeterminate', 'Indeterminate', '', progressIndeterminateValues)
	],
	description: 'Linear completion primitive with neutral, sky, and signal fills.',
	guidance:
		'Progress shows bounded completion. Use indeterminate only when the duration is unknowable, and keep labels outside the bar.',
	kind: 'primitive',
	name: 'Progress',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'number', 'Clamped 0-100 progress value. Optional for indeterminate states.', '0'),
		prop('tone', "'default' | 'sky' | 'terminal' | 'ultra' | 'error'", 'Fill tone.', 'default'),
		prop('size', "'thin' | 'medium' | 'thick'", 'Linear rail thickness.', 'medium'),
		prop('indeterminate', "'shuttle' | 'lined'", 'Unknown-duration progress treatment.'),
		prop('segments', 'number', 'SegmentedProgress segment count.'),
		prop('ProgressRing.size', 'number', 'ProgressRing diameter.'),
		prop('ProgressRing.strokeWidth', 'number', 'ProgressRing stroke width.')
	],
	renderExample: renderProgressExample,
	schema: progressPropsSchema,
	slug: 'progress',
	states: states([
		['default', 'Linear progress.'],
		['signals', 'Signal tone variants.'],
		['indeterminate', 'Unknown-duration shuttle and lined states.'],
		['segmented', 'Step-based completion.'],
		['ring', 'Circular progress composition.']
	])
})

function renderProgressExample(state = 'default') {
	switch (state) {
		case 'ring':
			return (
				<Frame>
					<ProgressRing tone="sky" value={68} />
					<ProgressRing size={72} tone="terminal" value={42} />
					<ProgressRing size={72} value={81} />
				</Frame>
			)
		case 'segmented':
			return (
				<Frame>
					<SegmentedProgress segments={8} value={5} />
					<SegmentedProgress segments={12} value={2} />
				</Frame>
			)
		case 'signals':
			return (
				<Frame>
					<Progress tone="sky" value={68} />
					<Progress tone="terminal" value={42} />
					<Progress tone="ultra" value={58} />
					<Progress tone="error" value={22} />
				</Frame>
			)
		case 'indeterminate':
			return (
				<Frame>
					<Progress indeterminate="shuttle" />
					<Progress indeterminate="shuttle" tone="sky" />
					<Progress indeterminate="lined" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Progress value={62} />
					<Progress size="thin" tone="sky" value={38} />
					<Progress size="thick" tone="terminal" value={82} />
				</Frame>
			)
	}
}

function getProgressToneClass(tone: ProgressTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.progressError
		case 'sky':
			return concreteClassNames.progressSky
		case 'terminal':
			return concreteClassNames.progressTerminal
		case 'ultra':
			return concreteClassNames.progressUltra
		case 'default':
		case undefined:
			return undefined
	}
}

function getProgressSizeClass(size: ProgressSize): string | undefined {
	switch (size) {
		case 'medium':
			return undefined
		case 'thick':
			return concreteClassNames.progressThick
		case 'thin':
			return concreteClassNames.progressThin
	}
}
