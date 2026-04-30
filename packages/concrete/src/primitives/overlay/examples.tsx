import { defineExamples } from '../../factories/createExamples'
import { Panel } from '../panel'
import { Overlay } from './component'

export const overlayExamples = defineExamples({
	default: {
		description: 'Inline overlay placement primitive.',
		render: () => (
			<Overlay>
				<Panel description="Overlay children own their surface." title="Inline overlay">
					Ready
				</Panel>
			</Overlay>
		)
	},
	fixed: {
		description: 'Fixed overlay stack with scrim policy.',
		render: () => (
			<Overlay presentation="fixed" scrim>
				<Panel depth="raised" title="Fixed overlay">
					Dialog surface slot
				</Panel>
			</Overlay>
		)
	},
	stretch: {
		description: 'Stretch placement for drawer-like surfaces.',
		render: () => (
			<Overlay placement="stretch">
				<Panel title="Drawer overlay">Full-height slot</Panel>
			</Overlay>
		)
	}
})
