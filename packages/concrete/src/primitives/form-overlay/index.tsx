import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FormLayoutRow, FormLayoutSection, FormLayoutShell } from '../form-layout'
import { FormOverlayDialog, FormOverlayDrawer, FormOverlayRoot } from './component'
import { formOverlayExamples } from './examples'
import { formOverlayMeta } from './meta'
import { type FormOverlayValue, formOverlaySchema } from './schema'

export type {
	FormOverlayDialogProps,
	FormOverlayDrawerProps,
	FormOverlayRootPresentation,
	FormOverlayRootProps,
	FormOverlayRootSide,
	FormOverlayRootSize,
	FormOverlayRootType
} from './component'
export { FormOverlayDialog, FormOverlayDrawer, FormOverlayRoot } from './component'
export type { FormOverlayInput, FormOverlayValue } from './schema'
export { formOverlayPropsSchema, formOverlaySchema } from './schema'

export const formOverlayPrimitiveDefinition = createPrimitive({
	...formOverlayMeta,
	component: FormOverlayRoot,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(formOverlayExamples, state),
	renderInput: input => renderFormOverlayInput(formOverlaySchema.parse(input)),
	schema: formOverlaySchema,
	slug: 'form-overlay',
	states: exampleStates(formOverlayExamples, ['default', 'drawer'])
})

function renderFormOverlayInput({ presentation, side, size, type }: FormOverlayValue) {
	const content = (
		<FormLayoutShell compact title="Generated form" variant={type === 'drawer' ? 'drawer' : 'modal'}>
			<FormLayoutSection title="Runtime">
				<FormLayoutRow label="Presentation" meta={presentation}>
					{type}
				</FormLayoutRow>
			</FormLayoutSection>
		</FormLayoutShell>
	)

	return (
		<FormOverlayRoot presentation={presentation} side={side} size={size} type={type}>
			{type === 'drawer' ? (
				<FormOverlayDrawer modal={presentation === 'fixed'}>{content}</FormOverlayDrawer>
			) : (
				<FormOverlayDialog modal={presentation === 'fixed'}>{content}</FormOverlayDialog>
			)}
		</FormOverlayRoot>
	)
}
