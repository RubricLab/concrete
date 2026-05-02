import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { CodeBlock } from '../../primitives'
import { Footer } from './component'
import { footerExamples } from './examples'
import { footerMeta } from './meta'
import { type FooterComponentValue, footerComponentSchema } from './schema'

export type { FooterColumn, FooterLink, FooterProps } from './component'
export { Footer } from './component'
export type {
	FooterColumnValue,
	FooterComponentInput,
	FooterComponentValue,
	FooterLinkValue
} from './schema'
export { footerColumnSchema, footerComponentSchema, footerLinkSchema } from './schema'

export const footerComponentDefinition = createComponent({
	...footerMeta,
	component: Footer,
	kind: 'component',
	renderExample: (state?: string) => renderExample(footerExamples, state),
	renderInput: input => renderFooterInput(footerComponentSchema.parse(input)),
	schema: footerComponentSchema,
	seed: footerComponentSchema.parse({
		asideCode: 'npm i @rubriclab/concrete',
		brandLabel: 'Concrete',
		columns: [
			{
				id: 'system',
				links: [
					{ href: '/foundations', id: 'foundations', label: 'Foundations' },
					{ href: '/primitives', id: 'primitives', label: 'Primitives' },
					{ href: '/components', id: 'components', label: 'Components' }
				],
				title: 'System'
			}
		],
		description: 'Dense primitives, compact components, calm docs.',
		title: 'Concrete for AI-native software.'
	}),
	slug: 'footer',
	states: exampleStates(footerExamples, ['default', 'actions', 'command', 'minimal'])
})

function renderFooterInput(input: FooterComponentValue) {
	const { asideCode, brandLabel, columns, actions, ...props } = input

	return (
		<Footer
			{...props}
			actions={actions}
			aside={asideCode ? <CodeBlock code={asideCode} language="Shell" mode="command" /> : undefined}
			brand={brandLabel}
			columns={columns}
		/>
	)
}
