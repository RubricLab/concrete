import type { PrimitiveRecord, PrimitiveSlug } from '@rubriclab/concrete'
import {
	Avatar,
	Badge,
	Bubble,
	Button,
	Card,
	Caret,
	Checkbox,
	Chip,
	Code,
	componentRegistry,
	Delta,
	Distribution,
	Divider,
	EmptyState,
	Frame,
	foundationRegistry,
	Icon,
	Indicator,
	Input,
	iconRegistry,
	Kbd,
	Link,
	Pill,
	Progress,
	primitiveRegistry,
	Radio,
	Row,
	Scrollbar,
	Select,
	Skeleton,
	Slider,
	Sparkline,
	Spinner,
	Stat,
	Switch,
	Tag,
	Textarea,
	Tooltip
} from '@rubriclab/concrete'
import type { CSSProperties, ReactNode } from 'react'

const inkSwatches = [
	['ink-9', '#0A0B0F'],
	['ink-8', '#16171C'],
	['ink-7', '#22242B'],
	['ink-6', '#3A3C45'],
	['ink-5', '#5A5D68'],
	['ink-4', '#878A95'],
	['ink-3', '#B4B7C0'],
	['ink-2', '#D7D9E0']
] as const

const signalSwatches = [
	['sky-soft', '#D9E6F8', 'sky bg'],
	['sky', '#1F6FD4', 'action'],
	['terminal-soft', '#DDF8E8', 'terminal bg'],
	['terminal', '#16C46A', 'terminal'],
	['ultra-soft', '#E7E4FF', 'ultra bg'],
	['ultra', '#6B5BFF', 'ultra'],
	['error-soft', '#FCE0E0', 'error bg'],
	['error', '#F03A3A', 'error']
] as const

const spacingScale = [
	['1', '4'],
	['2', '8'],
	['3', '12'],
	['4', '16'],
	['5', '20'],
	['6', '24'],
	['8', '32'],
	['10', '40'],
	['12', '48']
] as const

const primitiveExamples: Record<PrimitiveSlug, ReactNode> = {
	avatar: <Avatar initials="RL" size="lg" />,
	badge: <Badge tone="terminal">Running</Badge>,
	bubble: <Bubble>Conversion increased 18% in Q2.</Bubble>,
	button: (
		<Button leadingIcon="sparkles" tone="sky">
			Run analysis
		</Button>
	),
	card: (
		<Card className="docs-mini-card" padding="sm" variant="raised">
			<strong>Run 42</strong>
			<span>Complete</span>
		</Card>
	),
	caret: <Caret />,
	checkbox: <Checkbox checked label="Include archived" readOnly />,
	chip: (
		<Chip leadingIcon="check" selected tone="sky">
			Healthy
		</Chip>
	),
	code: <Code>bun run build</Code>,
	delta: <Delta value="18.6%" />,
	distribution: <Distribution />,
	divider: <Divider />,
	'empty-state': (
		<EmptyState description="Start with a source or generated run." title="No runs yet" />
	),
	frame: (
		<Frame eyebrow="FIG" footer="source: package" title="Frame">
			<Sparkline />
		</Frame>
	),
	icon: <Icon name="activity" size={24} />,
	indicator: <Indicator label="Live" />,
	input: <Input aria-label="Search datasets" placeholder="Search datasets" />,
	kbd: <Kbd>Cmd K</Kbd>,
	link: <Link href="#api">Open API</Link>,
	pill: <Pill tone="sky">Beta</Pill>,
	progress: <Progress value={72} />,
	radio: <Radio checked label="Production" readOnly />,
	row: (
		<Row
			description="prod-us-east"
			label="Web app"
			leading={<Icon name="database" />}
			trailing={<Badge tone="terminal">Healthy</Badge>}
		/>
	),
	scrollbar: <Scrollbar items={['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']} />,
	select: (
		<Select aria-label="Environment" defaultValue="production">
			<option value="production">Production</option>
			<option value="preview">Preview</option>
		</Select>
	),
	skeleton: (
		<div className="docs-skeleton-stack">
			<Skeleton width="84%" />
			<Skeleton width="62%" />
			<Skeleton width="72%" />
		</div>
	),
	slider: <Slider aria-label="Density" defaultValue={64} />,
	sparkline: <Sparkline />,
	spinner: <Spinner />,
	stat: <Stat helper="+4.2%" label="Conversion" value="18%" />,
	switch: <Switch checked label="Enabled" readOnly />,
	tag: <Tag>owner: labs</Tag>,
	textarea: <Textarea aria-label="Prompt" placeholder="Summarize the run..." rows={3} />,
	tooltip: (
		<Tooltip content="Inspect source">
			<Button size="sm" variant="outline">
				Hover
			</Button>
		</Tooltip>
	)
}

function getChapterNumber(index: number): string {
	return String(index + 1).padStart(2, '0')
}

function getSwatchStyle(tokenName: string): CSSProperties {
	return { '--docs-swatch': `var(--concrete-${tokenName})` } as CSSProperties
}

function getSpaceStyle(value: string): CSSProperties {
	return { width: `${Number(value) * 2}px` }
}

function renderPrimitiveExample(primitive: PrimitiveRecord): ReactNode {
	return primitiveExamples[primitive.slug]
}

export default function Home() {
	return (
		<main>
			<section className="docs-hero" id="home">
				<div className="docs-hero__texture" />
				<div className="docs-hero__content">
					<p className="docs-kicker">Concrete / Rubric Labs</p>
					<h1>Concrete is a design system for labs that ship</h1>
					<div className="docs-hero__chips">
						<Badge tone="sky">Editorial</Badge>
						<Badge tone="terminal">Product</Badge>
						<Badge tone="ultra">Generative</Badge>
						<Badge tone="error">Explainer</Badge>
					</div>
				</div>
			</section>

			<section className="docs-section" id="foundations">
				<ChapterHeader
					eyebrow="Foundations"
					index={0}
					meta="11 foundations"
					title="The system underneath every surface."
				/>
				<div className="docs-foundation-index">
					{foundationRegistry.map((foundation, index) => (
						<a href={`#foundation-${foundation.slug}`} key={foundation.slug}>
							<span>{getChapterNumber(index)}</span>
							<strong>{foundation.name}</strong>
							<em>{foundation.summary}</em>
						</a>
					))}
				</div>
			</section>

			<FoundationSection
				foundationSlug="color"
				meta="ink / sky / terminal / ultra / error"
				title="Ink-on-paper, action in sky."
			>
				<p className="docs-lead">
					Ink carries structure. Sky is the first-class accent. Terminal, ultra, and error are signals
					with soft and solid states.
				</p>
				<div className="docs-swatch-grid docs-swatch-grid--ink">
					{inkSwatches.map(([name, value]) => (
						<div className="docs-swatch" key={name} style={getSwatchStyle(name)}>
							<strong>{name}</strong>
							<span>{value}</span>
						</div>
					))}
				</div>
				<div className="docs-swatch-grid docs-swatch-grid--signals">
					{signalSwatches.map(([name, value, usage]) => (
						<div className="docs-swatch" key={name} style={getSwatchStyle(name)}>
							<strong>{name}</strong>
							<span>{value}</span>
							<em>{usage}</em>
						</div>
					))}
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="typography"
				meta="2 families / 16 sizes"
				title="Two families, one voice."
			>
				<p className="docs-lead">
					Plus Jakarta Sans carries interface density. Fraunces is reserved for hero display, chapter
					titles, and editorial pull moments.
				</p>
				<Frame className="docs-type-display" title="Display / Fraunces">
					<p>Rubric is a lab that ships</p>
				</Frame>
				<div className="docs-type-scale">
					<Row label={<span className="docs-type-hero">Concrete</span>} trailing="120 / 0.92" />
					<Row label={<span className="docs-type-h1">Hero headline</span>} trailing="72 / 0.95" />
					<Row label={<span className="docs-type-h2">Section title</span>} trailing="48 / 1.05" />
					<Row
						label={<span className="docs-type-body">UI body and dense product copy.</span>}
						trailing="15 / 1.45"
					/>
					<Row
						label={<span className="docs-type-label">EYEBROW / TAGS / ANNOTATIONS</span>}
						trailing="11 / 1.5"
					/>
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="density"
				meta="same grid / four pressures"
				title="One grid, four densities."
			>
				<p className="docs-lead">
					Density is the pressure profile applied to the same tokens and primitives. It changes
					compression, not the language.
				</p>
				<div className="docs-density-grid">
					<DensityCard label="Editorial" mode="Airy" />
					<DensityCard label="Product" mode="Compact" />
					<DensityCard label="Generative" mode="Focused" />
					<DensityCard label="Explainer" mode="Mocked" />
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="spacing"
				meta="4px base scale"
				title="Small steps, clear rhythm."
			>
				<p className="docs-lead">
					Spacing is a base scale for atoms, rows, panels, and editorial sections. Density decides how
					tightly those steps are applied.
				</p>
				<div className="docs-spacing-grid">
					{spacingScale.map(([name, value]) => (
						<div className="docs-space-token" key={name}>
							<span>{name}</span>
							<i style={getSpaceStyle(value)} />
							<strong>{value}px</strong>
						</div>
					))}
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="radii"
				meta="atoms / cards / pills"
				title="Soft edges, strict meaning."
			>
				<p className="docs-lead">Atoms stay tight. Cards stay modest. Only pills go fully round.</p>
				<div className="docs-radius-grid">
					{['0', '2', '3', '4', '5', '6'].map(radius => (
						<div className="docs-radius-token" key={radius}>
							<i data-radius={radius} />
							<span>r-{radius}</span>
						</div>
					))}
					<div className="docs-radius-token">
						<i data-radius="pill" />
						<span>pill</span>
					</div>
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="elevation"
				meta="hairline first"
				title="Depth without decoration."
			>
				<div className="docs-elevation-grid">
					<Card padding="sm">Flat surface</Card>
					<Card padding="sm" variant="raised">
						Raised surface
					</Card>
					<Card padding="sm" variant="sunken">
						Sunken surface
					</Card>
				</div>
			</FoundationSection>

			<FoundationSection foundationSlug="motion" meta="120 / 180 / 320ms" title="Motion proves state.">
				<div className="docs-motion-grid">
					<span />
					<span />
					<span />
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="focus"
				meta="3px sky ring"
				title="One visible interaction contract."
			>
				<div className="docs-focus-row">
					<Button tone="sky">Focused action</Button>
					<Input aria-label="Focusable input" placeholder="Focus uses sky ring" />
					<Chip selected>Selected chip</Chip>
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="textures"
				meta="lattice / dots / grain"
				title="Three textures, one material logic."
			>
				<div className="docs-texture-grid">
					<div className="docs-texture docs-texture--lattice">Lattice</div>
					<div className="docs-texture docs-texture--dots">Dots</div>
					<div className="docs-texture docs-texture--grain">Grain</div>
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="icons"
				meta={`${iconRegistry.length} icons`}
				title="Symbols before labels."
			>
				<div className="docs-icon-grid">
					{iconRegistry.map(icon => (
						<div key={icon.slug}>
							<Icon name={icon.slug} size={20} />
							<span>{icon.name}</span>
						</div>
					))}
				</div>
			</FoundationSection>

			<FoundationSection
				foundationSlug="pressure"
				meta="editorial / product / generative / explainer"
				title="Same primitives, different pressure."
			>
				<div className="docs-pressure-grid">
					<PressureCard description="Hierarchical, spacious, singular focus." label="Editorial" />
					<PressureCard
						description="Peak density with filters, charts, tables, and states."
						label="Product"
					/>
					<PressureCard
						description="Single column, progressive proof, fewer toggles."
						label="Generative"
					/>
					<PressureCard
						description="Mocked data that teaches the concept, not the values."
						label="Explainer"
					/>
				</div>
			</FoundationSection>

			<section className="docs-section" id="primitives">
				<ChapterHeader
					eyebrow="Primitives"
					index={11}
					meta={`${primitiveRegistry.length} primitives`}
					title="Atoms that build product surfaces."
				/>
				<div className="docs-primitive-grid">
					{primitiveRegistry.map(primitive => (
						<article className="docs-primitive-card" key={primitive.slug}>
							<a
								aria-label={`Open ${primitive.name}`}
								className="docs-primitive-card__link"
								href={`/primitives/${primitive.slug}`}
							>
								<span className="docs-visually-hidden">Open {primitive.name}</span>
							</a>
							<header>
								<strong>{primitive.name}</strong>
								<span>{primitive.role}</span>
							</header>
							<div className="docs-primitive-card__stage">{renderPrimitiveExample(primitive)}</div>
						</article>
					))}
				</div>
			</section>

			<section className="docs-section" id="components">
				<ChapterHeader
					eyebrow="Components"
					index={12}
					meta="registered components"
					title="Compositions from the same atoms."
				/>
				<div className="docs-component-grid">
					{componentRegistry.map(component => (
						<Card key={component.slug} padding="md">
							<h3>{component.name}</h3>
							<p>{component.description}</p>
							<div className="docs-component-pills">
								{component.primitives.map(primitive => (
									<Pill key={primitive}>{primitive}</Pill>
								))}
							</div>
						</Card>
					))}
				</div>
			</section>

			<section className="docs-section docs-split" id="skill">
				<ChapterHeader
					eyebrow="Skill"
					index={13}
					meta="design intent"
					title="Use Concrete as a product language."
				/>
				<Card padding="lg">
					<h3>Choose pressure first.</h3>
					<p>
						Editorial, product, generative, and explainer surfaces use the same primitives. Pressure
						decides how much density, proof, state, and navigation is visible.
					</p>
				</Card>
			</section>

			<section className="docs-section docs-split" id="api">
				<ChapterHeader
					eyebrow="API"
					index={14}
					meta="@rubriclab/concrete"
					title="Import it like a package."
				/>
				<Frame title="Consumer model">
					<pre>
						<code>{`import '@rubriclab/concrete/styles.css';
import { Button, primitiveRegistry } from '@rubriclab/concrete';`}</code>
					</pre>
				</Frame>
			</section>
		</main>
	)
}

function ChapterHeader({
	eyebrow,
	index,
	meta,
	title
}: {
	eyebrow: string
	index: number
	meta: string
	title: string
}) {
	return (
		<header className="docs-chapter-header">
			<div>
				<span>{getChapterNumber(index)}</span>
				<strong>{eyebrow}</strong>
			</div>
			<em>{meta}</em>
			<h2>{title}</h2>
		</header>
	)
}

function FoundationSection({
	children,
	foundationSlug,
	meta,
	title
}: {
	children: ReactNode
	foundationSlug: string
	meta: string
	title: string
}) {
	const foundationIndex = foundationRegistry.findIndex(record => record.slug === foundationSlug)
	const foundation = foundationRegistry[foundationIndex]

	return (
		<section className="docs-section docs-foundation" id={`foundation-${foundationSlug}`}>
			<ChapterHeader
				eyebrow={foundation?.name ?? foundationSlug}
				index={foundationIndex + 1}
				meta={meta}
				title={title}
			/>
			{children}
		</section>
	)
}

function DensityCard({ label, mode }: { label: string; mode: string }) {
	return (
		<Card className="docs-density-card" padding="sm">
			<header>
				<strong>{label}</strong>
				<span>{mode}</span>
			</header>
			<div>
				<span />
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
		</Card>
	)
}

function PressureCard({ description, label }: { description: string; label: string }) {
	const iconName =
		label === 'Generative'
			? 'message'
			: label === 'Product'
				? 'grid'
				: label === 'Explainer'
					? 'sparkles'
					: 'layers'

	return (
		<Card className="docs-pressure-card" padding="md">
			<Icon name={iconName} />
			<strong>{label}</strong>
			<p>{description}</p>
		</Card>
	)
}
