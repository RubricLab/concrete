import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { IconButton } from './component'
import { iconButtonExamples } from './examples'
import { iconButtonMeta } from './meta'
import { type IconButtonValue, iconButtonSchema } from './schema'

export type { IconButtonProps } from './component'
export { IconButton } from './component'
export type { IconButtonInput, IconButtonValue } from './schema'
export { iconButtonPropsSchema, iconButtonSchema } from './schema'

export const iconButtonPrimitiveDefinition = createPrimitive({
	...iconButtonMeta,
	component: IconButton,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(iconButtonExamples, state),
	renderInput: input => renderIconButtonInput(iconButtonSchema.parse(input)),
	schema: iconButtonSchema,
	slug: 'icon-button',
	states: exampleStates(iconButtonExamples, ['default', 'pressed', 'set'])
})

function renderIconButtonInput({
	density,
	disabled,
	hierarchy,
	icon,
	intent,
	label,
	pressed
}: IconButtonValue) {
	return (
		<IconButton
			disabled={disabled}
			icon={icon}
			label={label}
			pressed={pressed}
			{...(density ? { density } : {})}
			{...(hierarchy ? { hierarchy } : {})}
			{...(intent ? { intent } : {})}
		/>
	)
}
