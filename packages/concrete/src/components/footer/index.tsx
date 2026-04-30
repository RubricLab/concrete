import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { CodeBlock } from '../../primitives'
import { Footer, type FooterColumn, type FooterLink } from './component'
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
		asideCode: 'npm install @rubriclab/concrete',
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
		description: 'AI-native software primitives from Rubric Labs.',
		title: 'Build compact, powerful interfaces.'
	}),
	slug: 'footer',
	states: exampleStates(footerExamples, ['default', 'actions', 'command'])
})

function renderFooterInput(input: FooterComponentValue) {
	const { asideCode, brandLabel, columns, actions, ...props } = input

	return (
		<Footer
			{...props}
			actions={renderFooterLinks(actions)}
			aside={asideCode ? <CodeBlock code={asideCode} language="Shell" mode="command" /> : undefined}
			brand={brandLabel}
			columns={renderFooterColumns(columns)}
		/>
	)
}

function renderFooterColumns(
	columns: readonly FooterComponentValue['columns'][number][]
): readonly FooterColumn[] {
	return columns.map(column => ({
		...column,
		links: renderFooterLinks(column.links),
		title: column.title
	}))
}

function renderFooterLinks(
	links: readonly FooterComponentValue['actions'][number][]
): readonly FooterLink[] {
	return links.map(link => ({ ...link, label: link.label }))
}
