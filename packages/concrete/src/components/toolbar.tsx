import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { Frame } from '../primitives'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './toolbar-view'

export {
	Toolbar,
	ToolbarButton,
	type ToolbarButtonAppearance,
	type ToolbarButtonProps,
	ToolbarGroup,
	type ToolbarGroupProps,
	type ToolbarProps,
	ToolbarSeparator,
	type ToolbarSeparatorProps
} from './toolbar-view'

const toolbarAppearanceValues = ['icon', 'subtle', 'chip'] as const
const toolbarShortcutValues = ['none', 'cmd-k', 'cmd-enter'] as const

export const toolbarComponentSchema = z
	.object({
		appearance: z.enum(toolbarAppearanceValues).default('icon'),
		compact: z.boolean().default(false),
		label: z.string().default('Search'),
		pressed: z.boolean().default(false),
		selected: z.boolean().default(false),
		shortcut: z.enum(toolbarShortcutValues).default('cmd-k')
	})
	.strict()

export const toolbarComponentDefinition = defineConcreteComponent({
	category: 'control',
	component: Toolbar,
	controls: [
		booleanControl('compact', 'Compact', 'false'),
		selectControl('appearance', 'Appearance', 'icon', toolbarAppearanceValues),
		textControl('label', 'Label', 'Search'),
		booleanControl('selected', 'Selected', 'false'),
		booleanControl('pressed', 'Pressed', 'false'),
		selectControl('shortcut', 'Shortcut', 'cmd-k', toolbarShortcutValues)
	],
	description:
		'Atomic toolbar with quiet icon controls, optional chip appearance, tooltip shortcuts, roving arrow-key focus, selected state, and pressed feedback.',
	guidance:
		'Toolbar is for quiet clustered controls. Use icon or subtle appearance for tools, and reserve chip appearance for true labeled toggle choices.',
	kind: 'component',
	name: 'Toolbar',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Accessible toolbar label.', 'Toolbar'),
		prop('compact', 'boolean', 'Tightens the rail for dense product surfaces.', 'false'),
		prop(
			'ToolbarButton.appearance',
			"'icon' | 'subtle' | 'chip'",
			'Visual role for the control.',
			'icon'
		),
		prop('ToolbarButton.icon', 'IconName', 'Optional tool glyph.'),
		prop('ToolbarButton.shortcut', 'readonly string[]', 'Tooltip or inline shortcut hints.'),
		prop(
			'ToolbarButton.tooltipPlacement',
			"'top' | 'right' | 'bottom' | 'left'",
			'Tooltip placement for cramped surfaces.',
			'top'
		),
		prop('ToolbarButton.selected', 'boolean', 'Persistent selected mode state.', 'false'),
		prop(
			'ToolbarButton.defaultSelected',
			'boolean',
			'Initial selected state for uncontrolled toggle chips.',
			'false'
		),
		prop(
			'ToolbarButton.toggleable',
			'boolean',
			'Allows click to update uncontrolled selected state.',
			'false'
		),
		prop(
			'ToolbarButton.onSelectedChange',
			'(selected: boolean) => void',
			'Back-propagates local toggle state for controlled toolbars.'
		),
		prop('ToolbarButton.pressed', 'boolean', 'Transient keyboard activation state.', 'false'),
		prop(
			'ToolbarButton.showLabel',
			'boolean',
			'Shows the label beside the icon. Defaults to true only for chip appearance or text-only controls.'
		),
		prop('children', 'ReactNode', 'Toolbar groups, buttons, and separators.')
	],
	renderExample: renderToolbarExample,
	schema: toolbarComponentSchema,
	slug: 'toolbar',
	states: states([
		['default', 'Grouped controls with tooltip and shortcut affordances.'],
		['selected', 'Selected and keyboard-pressed states for mode controls.'],
		['compact', 'Dense rail suitable for editors, inspectors, and composers.']
	])
})

function renderToolbarExample(state = 'default'): ReactNode {
	const compact = state === 'compact'

	return (
		<Frame>
			<Toolbar compact={compact} label="Editor toolbar">
				<ToolbarGroup>
					<ToolbarButton icon="paperclip" label="Attach" showLabel={false} />
					<ToolbarButton icon="at-sign" label="Mention" shortcut={['@']} showLabel={false} />
					<ToolbarButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton
						appearance="subtle"
						label="Bold"
						pressed={state === 'selected'}
						shortcut={['cmd', 'B']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						B
					</ToolbarButton>
					<ToolbarButton
						appearance="subtle"
						label="Italic"
						shortcut={['cmd', 'I']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						<IText />
					</ToolbarButton>
					<ToolbarButton
						appearance="subtle"
						label="Underline"
						selected={state === 'selected'}
						shortcut={['cmd', 'U']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						<UText />
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton icon="settings" label="Settings" showLabel={false} />
				</ToolbarGroup>
			</Toolbar>
		</Frame>
	)
}

function IText() {
	return <span style={{ fontStyle: 'italic' }}>I</span>
}

function UText() {
	return <span style={{ textDecoration: 'underline' }}>U</span>
}
