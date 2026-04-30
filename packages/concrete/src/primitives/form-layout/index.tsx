import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FormLayoutGrid, FormLayoutRow, FormLayoutSection, FormLayoutShell } from './component'
import { formLayoutExamples } from './examples'
import { formLayoutMeta } from './meta'
import { type FormLayoutValue, formLayoutSchema } from './schema'

export type {
	FormLayoutGridColumns,
	FormLayoutGridProps,
	FormLayoutRowAlign,
	FormLayoutRowProps,
	FormLayoutSectionProps,
	FormLayoutShellProps,
	FormLayoutShellVariant
} from './component'
export { FormLayoutGrid, FormLayoutRow, FormLayoutSection, FormLayoutShell } from './component'
export type { FormLayoutInput, FormLayoutValue } from './schema'
export { formLayoutPropsSchema, formLayoutSchema } from './schema'

export const formLayoutPrimitiveDefinition = createPrimitive({
	...formLayoutMeta,
	component: FormLayoutShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(formLayoutExamples, state),
	renderInput: input => renderFormLayoutInput(formLayoutSchema.parse(input)),
	schema: formLayoutSchema,
	slug: 'form-layout',
	states: exampleStates(formLayoutExamples, ['default', 'rows'])
})

function renderFormLayoutInput({ columns, compact, status, variant }: FormLayoutValue) {
	return (
		<FormLayoutShell
			compact={compact}
			description="Generated form layout preview."
			status={status}
			title="Workspace settings"
			variant={variant}
		>
			<FormLayoutSection description="Primitive-owned section and grid chrome." title="General">
				<FormLayoutGrid columns={columns} compact={compact}>
					<FormLayoutRow label="Default model" meta="Required">
						concrete-preview
					</FormLayoutRow>
					<FormLayoutRow label="Autonomous mode" meta="On">
						Enabled
					</FormLayoutRow>
				</FormLayoutGrid>
			</FormLayoutSection>
		</FormLayoutShell>
	)
}
