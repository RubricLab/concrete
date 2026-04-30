import { defineExamples } from '../../factories/createExamples'
import { Panel } from '../panel'
import { DrawerSurface } from './component'

export const drawerSurfaceExamples = defineExamples({
	default: {
		description: 'Drawer surface for side-panel workflows.',
		render: () => (
			<DrawerSurface>
				<Panel title="Inspector">Drawer body</Panel>
			</DrawerSurface>
		)
	},
	left: {
		description: 'Left-side drawer placement.',
		render: () => (
			<DrawerSurface side="left">
				<Panel title="Navigation">Left drawer body</Panel>
			</DrawerSurface>
		)
	},
	wide: {
		description: 'Wide drawer for dense generated interfaces.',
		render: () => (
			<DrawerSurface size="wide">
				<Panel title="Settings">Wide drawer body</Panel>
			</DrawerSurface>
		)
	}
})
