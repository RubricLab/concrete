import {
	Badge,
	Button,
	ConcreteIcon,
	Input,
	iconNames,
	Kbd,
	Progress,
	Sparkline,
	Texture
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'

const inkStops = [
	['9', '#0A0B0F'],
	['8', '#16171C'],
	['7', '#22242B'],
	['6', '#3A3C45'],
	['5', '#5A5D68'],
	['4', '#878A95'],
	['3', '#B4B7C0'],
	['2', '#D7D9E0'],
	['1', '#E8EAEE']
] as const

const skyStops = [
	['1', '#EEF3FB'],
	['2', '#D9E6F8'],
	['3', '#A9C6EF'],
	['4', '#4E8BDE'],
	['sky', '#1F6FD4'],
	['strong', '#0F4E9E']
] as const

const signalStops = [
	['terminal', '#16C46A'],
	['ultra', '#6B5BFF'],
	['error', '#F03A3A']
] as const

const surfaceStops = [
	['canvas', '#F7F8FA'],
	['surface', '#FFFFFF'],
	['raised', '#FCFCFD'],
	['sunken', '#F1F2F5'],
	['mist', '#EAECF0']
] as const

const typeRows = [
	['120 / 0.92', 'Concrete', 'Display - Fraunces 300', 'scaleDisplay'],
	['72 / 0.95', 'Hero headline', 'Display - Fraunces 400', 'scaleHero'],
	['48 / 1.05', 'Section title', 'H1 - Jakarta 800', 'scaleH1'],
	['32 / 1.18', 'Chapter heading', 'H2 - Jakarta 700', 'scaleH2'],
	['20 / 1.25', 'Subsection heading', 'H3 - Jakarta 700', 'scaleH3'],
	[
		'17 / 1.55',
		'Long-form body. Sentence case. Measure 68ch.',
		'Article - Jakarta 400',
		'scaleArticle'
	],
	['15 / 1.45', 'UI body. The default for most running copy.', 'Body - Jakarta 400', 'scaleBody'],
	['13 / 1.45', 'UI labels, buttons, table rows.', 'Label - Jakarta 500', 'scaleLabel'],
	['11 / 1.5', 'Eyebrow - tags - annotations', 'Caps - Jakarta 700', 'scaleCaps']
] as const

const spaceRows = [
	['s-1', 4],
	['s-2', 8],
	['s-3', 12],
	['s-4', 16],
	['s-6', 24],
	['s-8', 32],
	['s-12', 48],
	['s-16', 64],
	['s-24', 96],
	['s-32', 128]
] as const

const radiusRows = [
	['r-2', '4px'],
	['r-3', '6px'],
	['r-4', '10px'],
	['r-5', '14px'],
	['r-6', '20px'],
	['pill', '9999px']
] as const

const elevationRows = [
	['hairline', 'border only', 'none'],
	['shadow-1', 'rest', 'var(--concrete-shadow-1)'],
	['shadow-2', 'popover', 'var(--concrete-shadow-2)'],
	['shadow-3', 'modal', 'var(--concrete-shadow-3)'],
	['shadow-4', 'overlay', 'var(--concrete-shadow-4)']
] as const

const scrollItems = [
	'Environment variables',
	'Build and deploy',
	'Domains',
	'SSL certificates',
	'Edge functions',
	'Redirects',
	'Headers',
	'Analytics',
	'Logs',
	'Integrations',
	'Team members',
	'Billing',
	'Audit log',
	'Danger zone'
] as const

export default function FoundationsPage() {
	return (
		<main className="main">
			<section className="specBlock">
				<div className="specHeader">
					<span className="specTitle">Foundations</span>
					<span className="specMeta">
						Type - color - space - radius - elevation - motion - focus - texture - icon
					</span>
				</div>

				<div className="typeIntro">
					<h1>
						Two <em>families,</em>
						<br />
						one voice.
					</h1>
					<p>
						Plus Jakarta Sans carries the interface. Fraunces is the editorial face, reserved for display
						moments, chapter plates, and pull quotes. Concrete stays sparse, ink-first, and sharp enough
						for dense agentic product work.
					</p>
				</div>

				<div className="specSubhead">
					<code>Display</code>
					<h2>Display - Fraunces</h2>
					<span>Google specimen defaults - optical auto</span>
				</div>
				<div className="displaySpecimen">
					<p>
						Rubric is a lab
						<br />
						that <em>ships</em>
					</p>
				</div>

				<div className="specSubhead">
					<code>Scale</code>
					<h2>Type scale</h2>
					<span>9 steps - 11 to 120</span>
				</div>
				<div className="typeScale">
					{typeRows.map(([metric, sample, role, className]) => (
						<div className="typeScaleRow" key={metric}>
							<span className="typeScaleMetric">{metric}</span>
							<span className={`typeScaleSample ${className}`}>{sample}</span>
							<span className="typeScaleRole">{role}</span>
						</div>
					))}
				</div>
			</section>

			<section className="foundationCatalog">
				<FoundationCard meta="Ink - cool graphite" title="Color">
					<div className="foundationRamp foundationRampInk">
						{inkStops.map(([label, value], index) => (
							<div
								className={index > 4 ? 'foundationSwatch foundationSwatchLight' : 'foundationSwatch'}
								key={label}
								style={{ background: value }}
							>
								<b>{label}</b>
								<span>{value.replace('#', '')}</span>
							</div>
						))}
					</div>
					<FoundationSubhead>Sky accent</FoundationSubhead>
					<div className="foundationRamp foundationRampSky">
						{skyStops.map(([label, value], index) => (
							<div
								className={index < 3 ? 'foundationSwatch foundationSwatchLight' : 'foundationSwatch'}
								key={label}
								style={{ background: value }}
							>
								<b>{label}</b>
								<span>{value.replace('#', '')}</span>
							</div>
						))}
					</div>
					<FoundationSubhead>Surfaces</FoundationSubhead>
					<div className="foundationRamp foundationRampSurfaces">
						{surfaceStops.map(([label, value]) => (
							<div
								className="foundationSwatch foundationSwatchLight"
								key={label}
								style={{ background: value }}
							>
								<b>{label}</b>
								<span>{value.replace('#', '')}</span>
							</div>
						))}
					</div>
					<FoundationSubhead>Signals - exactly three</FoundationSubhead>
					<div className="conceptRow">
						<Badge signal="terminal">Terminal</Badge>
						<Badge signal="ultra">Ultra</Badge>
						<Badge signal="error">Error</Badge>
					</div>
					<div className="foundationSignalGrid">
						{signalStops.map(([label, value]) => (
							<div className="foundationSignal" key={label}>
								<i style={{ background: value }} />
								<span>{label}</span>
								<code>{value.replace('#', '')}</code>
							</div>
						))}
					</div>
				</FoundationCard>

				<FoundationCard meta="Scale - corners - elevation" title="Spacing">
					<div className="foundationSpaceScale">
						{spaceRows.map(([label, value]) => (
							<div className="foundationSpaceRow" key={label}>
								<span>{label}</span>
								<i style={{ width: value }} />
								<code>{value}</code>
							</div>
						))}
					</div>
					<FoundationSubhead>Radii</FoundationSubhead>
					<div className="foundationTokenGrid">
						{radiusRows.map(([label, value]) => (
							<div className="foundationToken" key={label}>
								<i style={{ borderRadius: value }} />
								<b>{label}</b>
								<span>{value === '9999px' ? 'pill' : value}</span>
							</div>
						))}
					</div>
					<FoundationSubhead>Elevation</FoundationSubhead>
					<div className="foundationTokenGrid foundationElevationGrid">
						{elevationRows.map(([label, usage, shadow]) => (
							<div className="foundationToken" key={label}>
								<i style={{ boxShadow: shadow }} />
								<b>{label}</b>
								<span>{usage}</span>
							</div>
						))}
					</div>
				</FoundationCard>

				<FoundationCard meta="180ms - cubic-bezier(.2, 0, 0, 1)" title="Motion and Focus">
					<div className="motionTrack">
						<i />
					</div>
					<dl className="foundationSpecList">
						<dt>dur</dt>
						<dd>180ms</dd>
						<dt>ease</dt>
						<dd>cubic-bezier(.2, 0, 0, 1)</dd>
						<dt>reduced</dt>
						<dd>respected</dd>
					</dl>
					<FoundationSubhead>Focus ring tokens</FoundationSubhead>
					<div className="focusTokenGrid foundationFocusTokens">
						<div className="focusToken focusTokenDefault">
							<div>Aa</div>
							<code>--ring</code>
							<span>Default sky</span>
						</div>
						<div className="focusToken focusTokenTerminal">
							<div>Aa</div>
							<code>--ring-terminal</code>
							<span>Terminal</span>
						</div>
						<div className="focusToken focusTokenError">
							<div>Aa</div>
							<code>--ring-error</code>
							<span>Error</span>
						</div>
					</div>
					<div className="conceptRow">
						<Button className="focusVisibleDemo" variant="secondary">
							Secondary
						</Button>
						<Button variant="primary">Primary</Button>
						<Button variant="ultra">Upgrade</Button>
						<Button variant="danger">Delete</Button>
						<Input className="focusDemoInput" placeholder="Search..." />
					</div>
				</FoundationCard>

				<FoundationCard meta="Lattice - dots - lines - scrollbars" title="Textures">
					<div className="foundationTextureGrid">
						<div className="foundationTextureTile foundationLatticeCoarse">
							<div>
								<b>Coarse lattice</b>
								<span>48 - hero</span>
							</div>
						</div>
						<div className="foundationTextureTile foundationLatticeFine">
							<div>
								<b>Fine lattice</b>
								<span>24 - frame</span>
							</div>
						</div>
						<div className="foundationTextureTile">
							<Texture className="foundationTextureFill" variant="dots" />
							<div>
								<b>Dots</b>
								<span>16 - 1px</span>
							</div>
						</div>
						<div className="foundationTextureTile">
							<Texture className="foundationTextureFill" variant="lines" />
							<div>
								<b>Lines</b>
								<span>16 - hairline</span>
							</div>
						</div>
					</div>
					<FoundationSubhead>Scrollbar</FoundationSubhead>
					<div className="foundationScrollPanel">
						{scrollItems.map(item => (
							<div className="foundationScrollItem" key={item}>
								{item}
							</div>
						))}
					</div>
				</FoundationCard>

				<FoundationCard meta="Lucide - 1.5 stroke - currentColor" title="Iconography">
					<div className="foundationIconGrid">
						{iconNames.slice(0, 60).map(name => (
							<div className="foundationIconCell" key={name}>
								<ConcreteIcon name={name} />
								<span>{name}</span>
							</div>
						))}
					</div>
					<FoundationSubhead>Sizes and color follow text</FoundationSubhead>
					<div className="conceptRow">
						<ConcreteIcon name="circle" style={{ width: 12 }} />
						<ConcreteIcon name="circle" style={{ width: 16 }} />
						<ConcreteIcon name="circle" style={{ width: 20 }} />
						<ConcreteIcon name="circle" style={{ width: 24 }} />
						<Kbd>currentColor</Kbd>
					</div>
				</FoundationCard>

				<FoundationCard meta="Data primitives inherit foundation tokens" title="Data Ground">
					<div className="foundationDataGrid">
						<div>
							<span>Line</span>
							<Sparkline area values={[12, 18, 16, 24, 22, 31, 28, 36]} />
						</div>
						<div>
							<span>Bar</span>
							<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
						</div>
						<div>
							<span>Progress</span>
							<Progress tone="sky" value={68} />
							<Progress tone="terminal" value={42} />
						</div>
					</div>
				</FoundationCard>
			</section>
		</main>
	)
}

type FoundationCardProps = {
	children: ReactNode
	meta: string
	title: string
}

function FoundationCard({ children, meta, title }: FoundationCardProps) {
	return (
		<article className="foundationCard">
			<div className="conceptEyebrowRow">
				<span className="conceptEyebrow">{title}</span>
				<span className="conceptEyebrow conceptEyebrowSoft">{meta}</span>
			</div>
			{children}
		</article>
	)
}

type FoundationSubheadProps = {
	children: ReactNode
}

function FoundationSubhead({ children }: FoundationSubheadProps) {
	return <div className="conceptSubhead">{children}</div>
}
