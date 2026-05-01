import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Panel } from '../panel'
import { DrawerSurface } from './component'
import { drawerSurfaceExamples } from './examples'
import { drawerSurfaceMeta } from './meta'
import { type DrawerSurfaceValue, drawerSurfaceSchema } from './schema'

export type { DrawerSurfaceProps } from './component'
export { DrawerSurface } from './component'
export type {
	DrawerSurfaceInput,
	DrawerSurfaceMeasure,
	DrawerSurfaceSide,
	DrawerSurfaceValue
} from './schema'
export {
	drawerSurfaceMeasureSchema,
	drawerSurfacePropsSchema,
	drawerSurfaceSchema,
	drawerSurfaceSideSchema
} from './schema'

export const drawerSurfacePrimitiveDefinition = createPrimitive({
	...drawerSurfaceMeta,
	component: DrawerSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(drawerSurfaceExamples, state),
	renderInput: input => renderDrawerSurfaceInput(drawerSurfaceSchema.parse(input)),
	schema: drawerSurfaceSchema,
	slug: 'drawer-surface',
	states: exampleStates(drawerSurfaceExamples, ['default', 'left', 'wide'])
})

function renderDrawerSurfaceInput({ content, modal, side, measure }: DrawerSurfaceValue) {
	return (
		<DrawerSurface modal={modal} side={side} measure={measure}>
			<Panel title="Drawer">{content}</Panel>
		</DrawerSurface>
	)
}
