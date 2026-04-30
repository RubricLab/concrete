import {
	Badge,
	Button,
	Checkbox,
	FeatureCard as ConcreteFeatureCard,
	ConcreteIcon,
	type IconName,
	Input,
	MetricCard,
	renderComponentExample,
	ScaleFrame,
	Switch,
	Tag,
	Texture,
	Wordmark
} from '@rubriclab/concrete'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CopyCommand } from '../src/copy-command'
import { RenderContractDemo } from '../src/render-contract-demo'

type HeroFeature = {
	accent: 'ink' | 'sky' | 'terminal' | 'ultra'
	description: string
	icon: IconName
	title: string
}

type SystemLayer = {
	description: string
	href: string
	items: readonly string[]
	key: 'foundations' | 'primitives' | 'components' | 'applications'
	title: string
}

const heroFeatures = [
	{
		accent: 'ink',
		description: 'Zod props, examples, states.',
		icon: 'code',
		title: 'Typed surface'
	},
	{
		accent: 'sky',
		description: 'Same grid, four contexts.',
		icon: 'sliders-horizontal',
		title: 'Density aware'
	},
	{
		accent: 'terminal',
		description: 'React and image URLs.',
		icon: 'image',
		title: 'Render routes'
	},
	{
		accent: 'ultra',
		description: 'Specs machines can use.',
		icon: 'zap',
		title: 'Agent native'
	}
] as const satisfies readonly HeroFeature[]

const systemLayers = [
	{
		description: 'The rules of the system.',
		href: '/foundations',
		items: ['Color', 'Type', 'Space', 'Surface', 'Radius', 'Texture'],
		key: 'foundations',
		title: 'Foundations'
	},
	{
		description: 'Low-level building blocks.',
		href: '/primitives',
		items: ['Button', 'Input', 'Badge', 'Switch', 'Checkbox', 'Tag'],
		key: 'primitives',
		title: 'Primitives'
	},
	{
		description: 'High-level composable UI.',
		href: '/components',
		items: ['Composer', 'Menu', 'Chart', 'Table', 'Trace'],
		key: 'components',
		title: 'Components'
	},
	{
		description: 'Interfaces that ship.',
		href: '#library',
		items: ['Dashboards', 'Docs', 'Agents', 'Generated UI'],
		key: 'applications',
		title: 'Applications'
	}
] as const satisfies readonly SystemLayer[]

const pressureModes = [
	{
		body: 'Generous margins, long measures, open rhythm, and selected proof.',
		mode: 'Hierarchy',
		title: 'Editorial'
	},
	{
		body: 'High information density, efficient scanning, persistent tools, and visible states.',
		mode: 'Compact',
		title: 'Product'
	},
	{
		body: 'Focused flow, one useful output, progressive reveal, and inline artifacts.',
		mode: 'Standard',
		title: 'Generative'
	},
	{
		body: 'Simplified frames, clear annotations, mocked fidelity, and easy scanning.',
		mode: 'Mocked',
		title: 'Explainer'
	}
] as const satisfies readonly {
	body: string
	mode: string
	title: string
}[]

export default function HomeRoute() {
	return (
		<main className="docsHome" id="home">
			<section className="docsHeroV3" aria-labelledby="hero-title">
				<Texture className="homeLatticeField" variant="lattice" />
				<div className="heroEditorial">
					<span className="homeKicker">Concrete</span>
					<h1 id="hero-title">
						The language layer for labs that <span className="heroShipWord">ship.</span>
					</h1>
					<p className="docsLead">
						A rigorous React design system for research writing, dense products, generated interfaces,
						agent workflows, and the strange space between them.
					</p>
					<div className="heroCommandRow">
						<CopyCommand command="bun add @rubriclab/concrete" label="Copy bun install command" />
					</div>
				</div>
				<div className="heroComponentMount">
					<header>
						<span>Composer</span>
						<em>Product density</em>
					</header>
					<div className="heroComposerStage">{renderComponentExample('composer')}</div>
				</div>
				<div className="heroFeatureRail">{heroFeatures.map(renderHeroFeature)}</div>
			</section>

			<section className="docsChapter systemChapter" id="system">
				<SectionIntro
					title="The system, from the ground up."
					body="Layers build on each other. Each one does one thing well; together, they scale from a sentence of research to a working product surface."
				/>
				<div className="systemShowcase">
					<div className="systemLayerGrid">{systemLayers.map(renderSystemLayer)}</div>
				</div>
			</section>

			<section className="docsChapter pressureChapter" id="pressure">
				<SectionIntro
					title="One grid. Four pressures."
					body="Pressure changes composition, not the component contract. The same spatial system expands, compresses, focuses, or simplifies around the user's job."
				/>
				<div className="pressureExplainer">{pressureModes.map(renderPressureMode)}</div>
			</section>

			<section className="agentChapter" id="api">
				<Texture className="agentDepthTexture" variant="depth" />
				<div className="agentIntro">
					<span className="homeKicker">Interface contract</span>
					<h2>Built for agents and developers.</h2>
					<p>
						Every item carries typed props, examples, states, usage guidance, generated controls, DOM
						render routes, and screenshot routes from one package-owned definition.
					</p>
					<div className="agentContractList">
						{['Zod/v4 schemas', 'Generated controls', 'Fixed visual state', 'React or JPEG output'].map(
							item => (
								<span key={item}>
									<ConcreteIcon name="circle-check" />
									{item}
								</span>
							)
						)}
					</div>
					<div className="agentGithubCallout">
						<strong>Source is the contract.</strong>
						<p>Every public item is registered with schemas, examples, states, and render routes.</p>
						<Link href="https://github.com/RubricLab/concrete" rel="noreferrer" target="_blank">
							<ConcreteIcon name="external-link" />
							GitHub
						</Link>
					</div>
				</div>
				<div className="agentContractSurface">
					<RenderContractDemo />
				</div>
			</section>

			<footer className="docsFooter" id="library">
				<div className="footerIntro">
					<span>Built by</span>
					<Wordmark className="footerWordmark" />
					<p>Concrete is Rubric Labs' system for soft, compact, agent-native interfaces.</p>
				</div>
				<nav className="footerRouteGrid" aria-label="Concrete library">
					<Link href="/foundations">Foundations</Link>
					<Link href="/primitives">Primitives</Link>
					<Link href="/components">Components</Link>
					<Link href="/#api">Render API</Link>
				</nav>
				<div className="footerInstall">
					<CopyCommand command="bun add @rubriclab/concrete" label="Copy bun install command" />
					<Link
						href="https://www.npmjs.com/package/@rubriclab/concrete"
						rel="noreferrer"
						target="_blank"
					>
						NPM
					</Link>
					<Link href="https://github.com/RubricLab/concrete" rel="noreferrer" target="_blank">
						GitHub
					</Link>
				</div>
			</footer>
		</main>
	)
}

function renderHeroFeature(feature: HeroFeature): ReactNode {
	return (
		<ConcreteFeatureCard
			accent={feature.accent}
			className="homeFeatureCard"
			description={feature.description}
			icon={feature.icon}
			interactive={false}
			key={feature.title}
			title={feature.title}
		/>
	)
}

function renderSystemLayer(layer: SystemLayer): ReactNode {
	return (
		<article className="systemLayerCard" data-layer={layer.key} key={layer.key}>
			<header>
				<strong>{layer.title}</strong>
				<span>{layer.description}</span>
			</header>
			<div className="systemLayerPreview">{renderLayerPreview(layer.key)}</div>
			<footer>
				<div className="systemLayerItems">
					{layer.items.map(item => (
						<span key={item}>{item}</span>
					))}
				</div>
				<Link href={layer.href} aria-label={`Open ${layer.title}`}>
					Open
				</Link>
			</footer>
		</article>
	)
}

function renderLayerPreview(layer: SystemLayer['key']): ReactNode {
	switch (layer) {
		case 'applications':
			return (
				<div className="applicationPreview">
					<ScaleFrame align="center" className="systemScaleFrame" scale={0.52} surface="transparent">
						<div className="systemScaledComponent systemScaledApplication">
							<div className="applicationDashboardPreview">
								<header>
									<strong>Agent ops</strong>
									<Badge signal="terminal">Live</Badge>
								</header>
								<div className="applicationDashboardMetrics">
									<MetricCard
										compact
										delta={{ basis: 'accepted', intent: 'positive', value: '+12%' }}
										label="Latency p95"
										trend={[33, 37, 36, 42, 47, 46, 52, 58, 61, 64]}
										value="184ms"
									/>
									<MetricCard
										compact
										delta={{ basis: 'blocked', intent: 'negative', value: '-2.4%' }}
										label="Interventions"
										trend={[48, 44, 41, 39, 35, 32, 29]}
										trendTone="error"
										value="4.2%"
									/>
								</div>
								<div className="applicationDashboardRows">
									<span>
										<b>Router</b>
										<em>Ready</em>
									</span>
									<span>
										<b>Eval batch</b>
										<em>Queued</em>
									</span>
								</div>
							</div>
						</div>
					</ScaleFrame>
				</div>
			)
		case 'components':
			return (
				<div className="componentPreviewCard">
					<ScaleFrame align="center" className="systemScaleFrame" scale={0.56} surface="transparent">
						<div className="systemScaledComponent systemScaledComponentMenu">
							{renderComponentExample('command-menu')}
						</div>
					</ScaleFrame>
				</div>
			)
		case 'foundations':
			return (
				<div className="foundationPreview">
					<div className="foundationSpecimen">
						<strong>Ag</strong>
					</div>
					<div className="miniSwatches">
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<div className="foundationMarks">
						<span />
						<span />
						<span />
					</div>
				</div>
			)
		case 'primitives':
			return (
				<div className="primitivePreviewList">
					<div className="primitivePreviewRow">
						<Button size="small" variant="sky-soft">
							Button
						</Button>
						<Input aria-label="Primitive preview input" placeholder="Input" />
					</div>
					<div className="primitivePreviewPillLine">
						<Badge>Badge</Badge>
						<Tag size="small" tone="ultra" variant="outline">
							Agent
						</Tag>
						<div className="primitiveInlineControls">
							<Switch checked readOnly aria-label="Primitive preview switch" />
							<Checkbox checked readOnly aria-label="Primitive preview checkbox" />
						</div>
					</div>
				</div>
			)
	}
}

function renderPressureMode(mode: (typeof pressureModes)[number]): ReactNode {
	return (
		<article className="pressureMode" data-pressure={mode.title.toLowerCase()} key={mode.title}>
			<header>
				<strong>{mode.title}</strong>
				<em>{mode.mode}</em>
			</header>
			{renderPressureDiagram(mode.title)}
			<p>{mode.body}</p>
		</article>
	)
}

function renderPressureDiagram(title: (typeof pressureModes)[number]['title']): ReactNode {
	switch (title) {
		case 'Editorial':
			return (
				<div className="pressureDiagram pressureEditorialDiagram" aria-hidden>
					<strong>Q2 conversion rose 18%</strong>
					<span />
					<span />
					<span />
					<svg aria-hidden className="pressureMiniChart" viewBox="0 0 92 52">
						<title>Editorial chart</title>
						<path d="M4 44C15 41 19 34 28 35C38 36 40 24 49 24C58 24 61 13 70 15C78 17 82 10 88 8V48H4Z" />
						<path d="M4 44C15 41 19 34 28 35C38 36 40 24 49 24C58 24 61 13 70 15C78 17 82 10 88 8" />
						<path d="M4 48H88" />
					</svg>
				</div>
			)
		case 'Product':
			return (
				<div className="pressureDiagram pressureProductDiagram" aria-hidden>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
			)
		case 'Generative':
			return (
				<div className="pressureDiagram pressureGenerativeDiagram" aria-hidden>
					<strong>Why did Q2 rise?</strong>
					<span />
					<span />
					<svg aria-hidden className="pressureTinySparkline" viewBox="0 0 92 28">
						<title>Generative output chart</title>
						<path d="M2 24C13 22 20 19 28 20C38 21 42 12 50 13C61 14 65 6 74 8C82 10 86 7 90 3" />
					</svg>
				</div>
			)
		case 'Explainer':
			return (
				<div className="pressureDiagram pressureExplainerDiagram" aria-hidden>
					<span>Input</span>
					<i />
					<span>Process</span>
					<i />
					<span>Output</span>
				</div>
			)
	}
}

type SectionIntroProps = {
	body: string
	title: string
}

function SectionIntro({ body, title }: SectionIntroProps) {
	return (
		<div className="sectionIntro">
			<h2>{title}</h2>
			<p>{body}</p>
		</div>
	)
}
