import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { z } from 'zod/v4'
import { ConcreteIcon, type IconName } from '../icons'
import {
	booleanControl,
	iconOptions,
	selectOptionsControl,
	textControl
} from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

type RowIconSlot = IconName | ReactElement

export type RowProps = HTMLAttributes<HTMLDivElement> & {
	interactive?: boolean
	leadingIcon?: RowIconSlot
	meta?: ReactNode
}

export function Row({
	children,
	className,
	interactive = false,
	leadingIcon,
	meta,
	...props
}: RowProps) {
	return (
		<div
			className={cn(
				concreteClassNames.row,
				interactive && concreteClassNames.rowInteractive,
				className
			)}
			{...props}
		>
			{leadingIcon ? (
				<span className={concreteClassNames.rowIcon}>{renderRowIconSlot(leadingIcon)}</span>
			) : (
				<span />
			)}
			<span className={concreteClassNames.rowLabel}>{children}</span>
			{meta ? <span className={concreteClassNames.rowMeta}>{meta}</span> : null}
		</div>
	)
}

export const rowPropsSchema = z
	.object({
		interactive: z.boolean().default(true),
		label: z.string().default('Research memo'),
		leadingIcon: z.string().optional(),
		meta: z.string().optional()
	})
	.strict()

export const rowPrimitiveDefinition = defineConcretePrimitive({
	category: 'layout',
	component: Row,
	controls: [
		selectOptionsControl('leadingIcon', 'Leading icon', 'file-text', iconOptions),
		textControl('label', 'Label', 'Research memo'),
		textControl('meta', 'Meta', 'edited'),
		booleanControl('interactive', 'Interactive', 'true')
	],
	description: 'Compact scan-line primitive for lists, menus, and dense product panes.',
	guidance:
		'Rows are the base unit of product density. Keep metadata right-aligned, truncate labels, and use one leading affordance.',
	kind: 'primitive',
	name: 'Row',
	pressure: ['product', 'generative'],
	props: [
		prop('leadingIcon', 'IconName | ReactElement', 'Icon tile at the row start.'),
		prop('meta', 'ReactNode', 'Right-aligned mono metadata.'),
		prop('interactive', 'boolean', 'Adds hover surface treatment.', 'false'),
		prop('children', 'ReactNode', 'Row label.')
	],
	renderExample: renderRowExample,
	schema: rowPropsSchema,
	slug: 'row',
	states: states([
		['default', 'Interactive dense rows.'],
		['static', 'Passive row treatment.']
	])
})

function renderRowExample(state = 'default') {
	return (
		<Frame>
			<Row interactive={state !== 'static'} leadingIcon="file-text" meta="12m">
				Agent memory architecture
			</Row>
			<Row interactive={state !== 'static'} leadingIcon="git-branch" meta="live">
				Context structuring experiment
			</Row>
			<Row leadingIcon="lock" meta="private">
				Evaluation dataset
			</Row>
		</Frame>
	)
}

function renderRowIconSlot(icon: RowIconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}
