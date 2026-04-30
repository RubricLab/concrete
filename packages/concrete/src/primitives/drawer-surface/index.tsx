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
	DrawerSurfaceSide,
	DrawerSurfaceSize,
	DrawerSurfaceValue
} from './schema'
export {
	drawerSurfacePropsSchema,
	drawerSurfaceSchema,
	drawerSurfaceSideSchema,
	drawerSurfaceSizeSchema
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

function renderDrawerSurfaceInput({ content, modal, side, size }: DrawerSurfaceValue) {
	return (
		<DrawerSurface modal={modal} side={side} size={size}>
			<Panel title="Drawer">{content}</Panel>
		</DrawerSurface>
	)
}
