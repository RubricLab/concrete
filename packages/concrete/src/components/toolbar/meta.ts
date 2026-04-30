import { prop } from '../../registry/props'

export const toolbarMeta = {
	category: 'control',
	description:
		'Atomic toolbar with quiet icon controls, optional chip appearance, tooltip shortcuts, roving arrow-key focus, selected state, and pressed feedback.',
	guidance:
		'Toolbar is for quiet clustered controls. Use icon or subtle appearance for tools, and reserve chip appearance for true labeled toggle choices.',
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
	]
} as const
