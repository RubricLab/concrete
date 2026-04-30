import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { IconPrimitive } from './component'

export const iconExamples = defineExamples({
	default: {
		description: 'Icon-only controls.',
		render: () => (
			<>
				<Button iconOnly leadingIcon="search" variant="secondary" />
				<Button iconOnly leadingIcon="settings" />
				<Button iconOnly leadingIcon="sparkles" variant="ultra" />
			</>
		)
	},
	inline: {
		description: 'Standalone currentColor icons.',
		render: () => (
			<>
				<IconPrimitive name="search" />
				<IconPrimitive name="settings" />
				<IconPrimitive name="sparkles" />
			</>
		)
	}
})
