import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Frame } from '../frame/component'
import { IconPrimitive } from './component'

export const iconExamples = defineExamples({
	default: {
		description: 'Icon-only controls.',
		render: () => (
			<Frame>
				<Button iconOnly leadingIcon="search" variant="secondary" />
				<Button iconOnly leadingIcon="settings" />
				<Button iconOnly leadingIcon="sparkles" variant="ultra" />
			</Frame>
		)
	},
	inline: {
		description: 'Standalone currentColor icons.',
		render: () => (
			<Frame>
				<IconPrimitive name="search" />
				<IconPrimitive name="settings" />
				<IconPrimitive name="sparkles" />
			</Frame>
		)
	}
})
