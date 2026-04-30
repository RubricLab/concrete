import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	ToolbarControl,
	ToolbarControlButton,
	ToolbarControlGroup,
	ToolbarControlSeparator
} from './component'
import { toolbarControlExamples } from './examples'
import { toolbarControlMeta } from './meta'
import { type ToolbarControlValue, toolbarControlSchema } from './schema'

export type {
	ToolbarControlButtonAppearance,
	ToolbarControlButtonProps,
	ToolbarControlGroupProps,
	ToolbarControlProps,
	ToolbarControlSeparatorProps,
	ToolbarFormatGlyphFormat,
	ToolbarFormatGlyphProps
} from './component'
export {
	ToolbarControl,
	ToolbarControlButton,
	ToolbarControlGroup,
	ToolbarControlSeparator,
	ToolbarFormatGlyph
} from './component'
export type { ToolbarControlInput, ToolbarControlValue } from './schema'
export {
	toolbarControlAppearanceValues,
	toolbarControlPropsSchema,
	toolbarControlSchema,
	toolbarControlShortcutValues
} from './schema'

export const toolbarControlPrimitiveDefinition = createPrimitive({
	...toolbarControlMeta,
	component: ToolbarControl,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(toolbarControlExamples, state),
	renderInput: input => renderToolbarControlInput(toolbarControlSchema.parse(input)),
	schema: toolbarControlSchema,
	slug: 'toolbar-control',
	states: exampleStates(toolbarControlExamples, ['default', 'selected', 'compact'])
})

function renderToolbarControlInput(input: ToolbarControlValue) {
	const shortcut =
		input.shortcut === 'cmd-enter'
			? ['cmd', 'enter']
			: input.shortcut === 'cmd-k'
				? ['cmd', 'K']
				: undefined

	return (
		<ToolbarControl compact={input.compact} label="Preview toolbar">
			<ToolbarControlGroup>
				<ToolbarControlButton
					appearance={input.appearance}
					label={input.label}
					pressed={input.pressed}
					selected={input.selected}
					{...(input.appearance === 'chip' ? {} : { icon: 'search' as const })}
					{...(shortcut ? { shortcut } : {})}
					showLabel={input.appearance === 'chip'}
				/>
				<ToolbarControlButton icon="settings" label="Settings" showLabel={false} />
			</ToolbarControlGroup>
			<ToolbarControlSeparator />
			<ToolbarControlGroup>
				<ToolbarControlButton icon="copy" label="Copy" showLabel={false} />
			</ToolbarControlGroup>
		</ToolbarControl>
	)
}
