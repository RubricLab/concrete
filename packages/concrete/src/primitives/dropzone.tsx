import type { HTMLAttributes, ReactNode } from 'react'
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

export type DropzoneProps = HTMLAttributes<HTMLDivElement> & {
	active?: boolean | undefined
	description?: ReactNode | undefined
	disabled?: boolean | undefined
	icon?: IconName | undefined
	title?: ReactNode | undefined
}

export function Dropzone({
	active = false,
	children,
	className,
	description = 'Drag and drop files here',
	disabled = false,
	icon = 'upload',
	title = 'Upload files',
	...props
}: DropzoneProps) {
	return (
		<div
			className={cn(concreteClassNames.dropzone, className)}
			data-active={active ? true : undefined}
			data-disabled={disabled ? true : undefined}
			{...props}
		>
			<span className={concreteClassNames.dropzoneIcon}>
				<ConcreteIcon name={icon} />
			</span>
			<span className={concreteClassNames.dropzoneTitle}>{title}</span>
			<span className={concreteClassNames.dropzoneDescription}>{description}</span>
			{children}
		</div>
	)
}

export const dropzonePropsSchema = z
	.object({
		active: z.boolean().default(false),
		description: z.string().optional(),
		disabled: z.boolean().default(false),
		icon: z.string().default('upload'),
		title: z.string().default('Upload files')
	})
	.strict()

export const dropzonePrimitiveDefinition = defineConcretePrimitive({
	category: 'form',
	component: Dropzone,
	controls: [
		textControl('title', 'Title', 'Upload files'),
		textControl('description', 'Description', 'Drag or choose a research artifact.'),
		selectOptionsControl('icon', 'Icon', 'upload', iconOptions),
		booleanControl('active', 'Active', 'false'),
		booleanControl('disabled', 'Disabled', 'false')
	],
	description: 'Dashed upload target primitive with active, disabled, icon, and descriptive states.',
	guidance:
		'Dropzone is a visual target and label surface. Product code or a higher-level upload component owns file transport and storage.',
	kind: 'primitive',
	name: 'Dropzone',
	pressure: ['product'],
	props: [
		prop('title', 'ReactNode', 'Primary drop target label.', 'Upload files'),
		prop('description', 'ReactNode', 'Secondary drop target copy.'),
		prop('icon', 'IconName', 'Glyph shown in the circular affordance.', 'upload'),
		prop('active', 'boolean', 'Highlights drag-over state.', 'false'),
		prop('disabled', 'boolean', 'Locks the target visually and functionally.', 'false')
	],
	renderExample: renderDropzoneExample,
	schema: dropzonePropsSchema,
	slug: 'dropzone',
	states: states([
		['default', 'Passive upload target.'],
		['active', 'Drag-over state.'],
		['image', 'Image-specific icon and copy.'],
		['disabled', 'Locked upload target.']
	])
})

function renderDropzoneExample(state = 'default') {
	return (
		<Frame>
			<Dropzone
				active={state === 'active'}
				description={
					state === 'disabled' ? 'File input is locked.' : 'Drag or choose a research artifact.'
				}
				disabled={state === 'disabled'}
				icon={state === 'image' ? 'image' : 'upload'}
				title={state === 'image' ? 'Upload images' : 'Upload files'}
			/>
		</Frame>
	)
}
