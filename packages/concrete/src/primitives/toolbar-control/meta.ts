import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ToolbarControlMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const toolbarControlMeta = {
	category: 'control',
	description:
		'Atomic toolbar control with quiet icon controls, optional chip appearance, tooltip shortcuts, roving arrow-key focus, selected state, and pressed feedback.',
	guidance:
		'Use ToolbarControl for clustered editing, filtering, and inspection commands. Use icon or subtle appearance for tools, and reserve chip appearance for true labeled toggle choices.',
	name: 'Toolbar Control',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Accessible toolbar label.', 'Toolbar'),
		prop('compact', 'boolean', 'Tightens the rail for dense product surfaces.', 'false'),
		prop(
			'ToolbarControlButton.appearance',
			"'icon' | 'subtle' | 'chip'",
			'Visual role for the control.',
			'icon'
		),
		prop('ToolbarControlButton.icon', 'IconName', 'Optional tool glyph.'),
		prop('ToolbarControlButton.shortcut', 'readonly string[]', 'Tooltip or inline shortcut hints.'),
		prop(
			'ToolbarControlButton.tooltipPlacement',
			"'top' | 'right' | 'bottom' | 'left'",
			'Tooltip placement for cramped surfaces.',
			'top'
		),
		prop('ToolbarControlButton.selected', 'boolean', 'Persistent selected mode state.', 'false'),
		prop(
			'ToolbarControlButton.defaultSelected',
			'boolean',
			'Initial selected state for uncontrolled toggle chips.',
			'false'
		),
		prop(
			'ToolbarControlButton.toggleable',
			'boolean',
			'Allows click to update uncontrolled selected state.',
			'false'
		),
		prop(
			'ToolbarControlButton.onSelectedChange',
			'(selected: boolean) => void',
			'Back-propagates local toggle state for controlled toolbars.'
		),
		prop('ToolbarControlButton.pressed', 'boolean', 'Transient keyboard activation state.', 'false'),
		prop(
			'ToolbarControlButton.showLabel',
			'boolean',
			'Shows the label beside the icon. Defaults to true only for chip appearance or text-only controls.'
		),
		prop(
			'ToolbarFormatGlyph.format',
			"'bold' | 'italic' | 'underline' | 'strikethrough'",
			'Text-format glyph treatment.'
		),
		prop('children', 'ReactNode', 'Toolbar groups, buttons, and separators.')
	]
} as const satisfies ToolbarControlMeta
