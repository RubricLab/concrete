import {
	Badge,
	Button,
	Checkbox,
	Chip,
	Cluster,
	CodeBlock,
	ConceptConnector,
	Container,
	Frame,
	Grid,
	Heading,
	Inline,
	InlineCode,
	Input,
	Label,
	type LabelIntent,
	MetricCard,
	PageSection,
	Progress,
	renderComponentExample,
	Sparkline,
	Split,
	Stack,
	Surface,
	type SurfaceIntent,
	Switch,
	Tag,
	Text,
	TextLink
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { RenderContractDemo } from '@/render-contract-demo'

type HeroFeatureAccent = 'ink' | 'sky' | 'terminal' | 'ultra'

type HeroFeature = {
	accent: HeroFeatureAccent
	description: string
	icon: 'code' | 'image' | 'sliders-horizontal' | 'zap'
	title: string
}

type SystemLayer = {
	description: string
	href: string
	items: readonly string[]
	key: 'applications' | 'components' | 'foundations' | 'primitives'
	title: string
}

type PressureMode = {
	body: string
	mode: string
	title: 'Editorial' | 'Product' | 'Generative' | 'Educational'
}

const heroFeatures = [
	{
		accent: 'ink',
		description: 'Schemas, examples, states.',
		icon: 'code',
		title: 'Typed surface'
	},
	{
		accent: 'sky',
		description: 'Same grid, four contexts.',
		icon: 'sliders-horizontal',
		title: 'Pressure aware'
	},
	{
		accent: 'terminal',
		description: 'React and image URLs.',
		icon: 'image',
		title: 'Render native'
	},
	{
		accent: 'ultra',
		description: 'Strict specs machines can use.',
		icon: 'zap',
		title: 'Agent legible'
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
		href: '#contract',
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
		mode: 'Explainer',
		title: 'Educational'
	}
] as const satisfies readonly PressureMode[]

export default function HomeRoute() {
	return (
		<>
			<PageSection ground="field" rhythm="hero" separated>
				<Container as="main" density="editorial" measure="wide">
					<Stack density="editorial">
						<Split
							aside={
								<Frame
									align="stretch"
									header="Composer"
									headerMeta="Product density"
									scale="showcase"
									texture="lattice"
								>
									{renderComponentExample('composer')}
								</Frame>
							}
							density="editorial"
							ratio="even"
						>
							<Stack density="editorial">
								<Stack density="compact">
									<Label intent="sky" purpose="status">
										Concrete
									</Label>
									<Heading hierarchy="hero" level="1">
										The language layer for labs that <em>ship.</em>
									</Heading>
									<Text as="p" intent="muted" purpose="lead">
										A rigorous React design system for research writing, dense products, generated interfaces,
										agent workflows, and the strange space between them.
									</Text>
								</Stack>
								<CodeBlock
									code="bun add @rubriclab/concrete"
									copyValue="bun add @rubriclab/concrete"
									language="Shell"
									mode="command"
								/>
								<Cluster density="compact">
									<TextLink href="/foundations" purpose="nav">
										Foundations
									</TextLink>
									<TextLink href="/primitives" purpose="nav">
										Primitives
									</TextLink>
									<TextLink href="/components" purpose="nav">
										Components
									</TextLink>
									<TextLink external href="https://github.com/RubricLab/concrete" purpose="nav">
										GitHub
									</TextLink>
								</Cluster>
							</Stack>
						</Split>
						<Grid columns="two" density="compact">
							{heroFeatures.map(renderHeroFeature)}
						</Grid>
					</Stack>
				</Container>
			</PageSection>

			<PageSection ground="perspective" rhythm="chapter" separated>
				<Container density="editorial" measure="wide">
					<Stack density="editorial">
						<SectionIntro
							body="Layers build on each other. Each one does one thing well; together, they scale from a sentence of research to a working product surface."
							title="The system, from the ground up."
						/>
						<LayerPath />
						<Grid density="editorial">{systemLayers.map(renderSystemLayer)}</Grid>
					</Stack>
				</Container>
			</PageSection>

			<PageSection rhythm="chapter" separated>
				<Container density="editorial" measure="wide">
					<Stack density="editorial">
						<SectionIntro
							body="Pressure changes composition, not the component contract. The same spatial system expands, compresses, focuses, or simplifies around the user's job."
							title="One grid. Four pressures."
						/>
						<Surface depth="raised">
							<Grid density="compact">{pressureModes.map(renderPressureMode)}</Grid>
						</Surface>
					</Stack>
				</Container>
			</PageSection>

			<PageSection ground="depth" id="contract" rhythm="chapter" intent="inverse">
				<Container density="editorial" measure="wide">
					<Split aside={<RenderContractDemo />} density="editorial" ratio="even">
						<Stack density="editorial">
							<Stack density="compact">
								<Label intent="terminal" purpose="status">
									Interface contract
								</Label>
								<Heading hierarchy="display" intent="inverse" level="2">
									Built for agents and developers.
								</Heading>
								<Text as="p" intent="inverse" purpose="lead">
									Every public item carries typed props, examples, states, usage guidance, generated
									controls, DOM render routes, and screenshot routes from one package-owned definition.
								</Text>
							</Stack>
							<Grid columns="two" density="compact">
								{[
									'Zod/v4 schemas',
									'Generated controls',
									'Fixed visual state',
									'React or image output'
								].map(item => (
									<Surface density="compact" depth="sunken" key={item}>
										<Inline density="compact">
											<Badge intent="terminal">Ready</Badge>
											<Text intent="strong">{item}</Text>
										</Inline>
									</Surface>
								))}
							</Grid>
							<Cluster density="compact">
								<TextLink href="/render/primitive/button" intent="sky">
									React render
								</TextLink>
								<TextLink href="/render/primitive/button/screenshot" intent="sky">
									Image render
								</TextLink>
								<InlineCode>@rubriclab/concrete/registry</InlineCode>
							</Cluster>
						</Stack>
					</Split>
				</Container>
			</PageSection>
		</>
	)
}

function renderHeroFeature(feature: HeroFeature): ReactNode {
	return (
		<Surface
			as="article"
			density="compact"
			depth="raised"
			intent={getHeroFeatureSurfaceIntent(feature.accent)}
			key={feature.title}
		>
			<Inline align="start" density="compact">
				<Label intent={getHeroFeatureLabelIntent(feature.accent)} leadingIcon={feature.icon}>
					{feature.title}
				</Label>
				<Stack density="compact">
					<Heading hierarchy="subsection" level="3">
						{feature.title}
					</Heading>
					<Text as="p" intent="muted" purpose="caption">
						{feature.description}
					</Text>
				</Stack>
			</Inline>
		</Surface>
	)
}

function getHeroFeatureSurfaceIntent(accent: HeroFeatureAccent): SurfaceIntent {
	switch (accent) {
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
			return 'default'
	}
}

function getHeroFeatureLabelIntent(accent: HeroFeatureAccent): LabelIntent {
	switch (accent) {
		case 'sky':
			return 'sky'
		case 'terminal':
			return 'terminal'
		case 'ultra':
			return 'ultra'
		case 'ink':
			return 'strong'
	}
}

function LayerPath() {
	return (
		<Cluster density="compact">
			<Label intent="subtle">Foundations</Label>
			<ConceptConnector intent="sky" kind="straight" />
			<Label intent="subtle">Primitives</Label>
			<ConceptConnector intent="sky" kind="straight" />
			<Label intent="subtle">Components</Label>
			<ConceptConnector intent="sky" kind="straight" />
			<Label intent="subtle">Applications</Label>
		</Cluster>
	)
}

function renderSystemLayer(layer: SystemLayer): ReactNode {
	return (
		<Surface as="article" density="compact" depth="raised" key={layer.key}>
			<Stack density="compact">
				<Inline justify="between">
					<Heading hierarchy="section" level="3">
						{layer.title}
					</Heading>
					<TextLink href={layer.href} purpose="nav">
						Open
					</TextLink>
				</Inline>
				<Text as="p" intent="muted" purpose="caption">
					{layer.description}
				</Text>
				<Frame align="stretch" header={layer.title} headerMeta="Layer" scale="compact" texture="field">
					{renderLayerPreview(layer.key)}
				</Frame>
				<Cluster density="compact">
					{layer.items.map(item => (
						<Chip key={item}>{item}</Chip>
					))}
				</Cluster>
			</Stack>
		</Surface>
	)
}

function renderLayerPreview(layer: SystemLayer['key']): ReactNode {
	switch (layer) {
		case 'applications':
			return (
				<Stack density="compact">
					<Inline justify="between">
						<Text intent="strong">Agent ops</Text>
						<Badge intent="terminal">Live</Badge>
					</Inline>
					<Grid columns="two" density="compact">
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
							trendIntent="error"
							value="4.2%"
						/>
					</Grid>
				</Stack>
			)
		case 'components':
			return <Stack align="center">{renderComponentExample('command-menu')}</Stack>
		case 'foundations':
			return (
				<Stack align="center" density="compact">
					<Heading hierarchy="display" level="4">
						Ag
					</Heading>
					<Cluster density="compact" justify="center">
						<Tag intent="sky">Sky</Tag>
						<Tag intent="terminal">Terminal</Tag>
						<Tag intent="ultra">Ultra</Tag>
					</Cluster>
					<Sparkline area values={[18, 24, 20, 31, 38, 36, 44]} />
				</Stack>
			)
		case 'primitives':
			return (
				<Stack density="compact">
					<Inline density="compact">
						<Button density="small" hierarchy="soft" intent="sky">
							Button
						</Button>
						<Input aria-label="Primitive preview input" placeholder="Input" />
					</Inline>
					<Cluster density="compact">
						<Badge>Badge</Badge>
						<Tag density="compact" hierarchy="outline" intent="ultra">
							Agent
						</Tag>
						<Switch checked readOnly aria-label="Primitive preview switch" />
						<Checkbox checked readOnly aria-label="Primitive preview checkbox" />
					</Cluster>
				</Stack>
			)
	}
}

function renderPressureMode(mode: PressureMode): ReactNode {
	return (
		<Stack density="compact" key={mode.title}>
			<Inline justify="between">
				<Heading hierarchy="subsection" level="3">
					{mode.title}
				</Heading>
				<Label intent="subtle">{mode.mode}</Label>
			</Inline>
			{renderPressureSpecimen(mode.title)}
			<Text as="p" intent="muted" purpose="caption">
				{mode.body}
			</Text>
		</Stack>
	)
}

function renderPressureSpecimen(title: PressureMode['title']): ReactNode {
	switch (title) {
		case 'Editorial':
			return (
				<Frame align="stretch" scale="compact" texture="lines">
					<Stack density="compact">
						<Heading hierarchy="title" level="4">
							Q2 conversion rose 18%.
						</Heading>
						<Text as="p" intent="muted" purpose="caption">
							Evidence stays selected, readable, and paced.
						</Text>
						<Sparkline area values={[12, 18, 16, 24, 22, 31, 38]} />
					</Stack>
				</Frame>
			)
		case 'Product':
			return (
				<Frame align="stretch" scale="compact" texture="lattice">
					<Surface density="compact" depth="sunken">
						<Stack density="compact">
							<Progress density="compact" intent="terminal" value={84} />
							<Progress density="compact" intent="ultra" value={58} />
							<Text intent="strong" purpose="number">
								184ms
							</Text>
							<Badge intent="terminal">Live</Badge>
						</Stack>
					</Surface>
				</Frame>
			)
		case 'Generative':
			return (
				<Frame align="stretch" scale="compact" texture="field">
					<Stack density="compact">
						<Tag hierarchy="outline" intent="sky">
							Why did Q2 rise?
						</Tag>
						<Text as="p" intent="muted" purpose="caption">
							Output is focused into one immediately useful panel.
						</Text>
						<Progress density="compact" intent="sky" value={68} />
					</Stack>
				</Frame>
			)
		case 'Educational':
			return (
				<Frame scale="compact" texture="dots">
					<Stack align="center" density="compact">
						<Tag>Input</Tag>
						<Progress density="compact" intent="sky" value={50} />
						<Tag intent="terminal">Process</Tag>
						<Progress density="compact" intent="terminal" value={74} />
						<Tag intent="ultra">Output</Tag>
					</Stack>
				</Frame>
			)
	}
}

type SectionIntroProps = {
	body: string
	title: string
}

function SectionIntro({ body, title }: SectionIntroProps) {
	return (
		<Stack density="compact">
			<Heading hierarchy="display" level="2">
				{title}
			</Heading>
			<Text as="p" intent="muted" purpose="lead">
				{body}
			</Text>
		</Stack>
	)
}
