import {
	Badge,
	Button,
	Chip,
	type ComponentDefinition,
	type ComponentRegistryEntry,
	type FoundationDefinition,
	type FoundationRegistryEntry,
	type PrimitiveDefinition,
	type PrimitiveRegistryEntry,
	TextLink
} from '@rubriclab/concrete'
import { type ReactNode, Suspense } from 'react'
import { CatalogPropsTable } from './catalog-props-table'
import { ComponentPlayground } from './component-playground'
import { FoundationPlayground } from './foundation-playground'
import { PrimitivePlayground } from './primitive-playground'

type CatalogDetailConfiguration = {
	actionLabel: string
	detailHeroClassName?: string
	detailPreviewClassName?: string
	label: string
	playgroundDescription: string
	stateCardClassName?: string
	stateGridClassName?: string
	stateStageClassName?: string
}

type CatalogDetailPageProps =
	| {
			definition: ComponentDefinition
			entry: ComponentRegistryEntry
			kind: 'component'
	  }
	| {
			definition: FoundationDefinition
			entry: FoundationRegistryEntry
			kind: 'foundation'
	  }
	| {
			definition: PrimitiveDefinition
			entry: PrimitiveRegistryEntry
			kind: 'primitive'
	  }

const catalogDetailConfigurations: Record<
	CatalogDetailPageProps['kind'],
	CatalogDetailConfiguration
> = {
	component: {
		actionLabel: 'Zod schemas',
		detailHeroClassName: 'componentDetailHero',
		detailPreviewClassName: 'componentDetailPreview',
		label: 'Component',
		playgroundDescription:
			'Controls update query params directly. Complex slots use item-owned examples so component states stay deterministic, linkable, and screenshot-ready.',
		stateCardClassName: 'componentStateCard',
		stateGridClassName: 'componentStateGrid',
		stateStageClassName: 'componentStateStage'
	},
	foundation: {
		actionLabel: 'Token schema',
		detailHeroClassName: 'foundationDetailHero',
		detailPreviewClassName: 'foundationDetailPreview',
		label: 'Foundation',
		playgroundDescription:
			'Foundation examples are token specimens. The route stays registry-led so every foundation can be rendered, linked, and screenshotted through the same catalog surface.'
	},
	primitive: {
		actionLabel: 'Typed export',
		label: 'Primitive',
		playgroundDescription:
			'Controls update query params directly, so every primitive state can be linked, rendered, and screenshotted deterministically.'
	}
}

export function CatalogDetailPage(props: CatalogDetailPageProps) {
	const { definition, entry, kind } = props
	const configuration = catalogDetailConfigurations[kind]

	return (
		<main className="main">
			<section className="section">
				<div className={['detailHero', configuration.detailHeroClassName].filter(Boolean).join(' ')}>
					<div className="detailIntro">
						<div className="metaRow">
							<Badge signal="terminal">{entry.category}</Badge>
							{entry.pressure.map(pressure => (
								<Chip key={pressure}>{pressure}</Chip>
							))}
						</div>
						<div>
							<span className="eyebrow">{configuration.label}</span>
							<h1>{entry.name}</h1>
						</div>
						<p>{entry.description}</p>
						<p>{entry.guidance}</p>
						<div className="heroActions">
							<TextLink href={`/render/${kind}/${entry.slug}`}>DOM render</TextLink>
							<TextLink href={`/render/${kind}/${entry.slug}.jpg`}>JPEG render</TextLink>
						</div>
					</div>
					<div
						className={['detailPreview', configuration.detailPreviewClassName].filter(Boolean).join(' ')}
					>
						{definition.renderExample()}
					</div>
				</div>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Playground</span>
						<h1>Props in the URL.</h1>
					</div>
					<p>{configuration.playgroundDescription}</p>
				</div>
				<Suspense fallback={<div className="playgroundLoading">Loading playground.</div>}>
					{renderDetailPlayground(props)}
				</Suspense>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">States</span>
						<h1>Rendered matrix.</h1>
					</div>
					<p>Every state maps to the same {kind} render route through the `state` query param.</p>
				</div>
				<div className={configuration.stateGridClassName ?? 'stateGrid'}>
					{entry.states.map(state => (
						<article
							className={['stateCard', configuration.stateCardClassName].filter(Boolean).join(' ')}
							key={state.query}
						>
							<div className={configuration.stateStageClassName ?? 'stateStage'}>
								{definition.renderExample(state.query)}
							</div>
							<div className="stateMeta">
								<b>{state.name}</b>
								<p>{state.description}</p>
								<TextLink href={`/render/${kind}/${entry.slug}?state=${state.query}`}>
									/render state
								</TextLink>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Props</span>
						<h1>Public contract.</h1>
					</div>
					<Button trailingIcon="arrow-right" variant="secondary">
						{configuration.actionLabel}
					</Button>
				</div>
				<CatalogPropsTable entry={entry} />
			</section>
		</main>
	)
}

function renderDetailPlayground(props: CatalogDetailPageProps): ReactNode {
	switch (props.kind) {
		case 'component':
			return <ComponentPlayground entry={props.entry} />
		case 'foundation':
			return <FoundationPlayground entry={props.entry} />
		case 'primitive':
			return <PrimitivePlayground entry={props.entry} />
	}
}
