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
import {
	elevationRows,
	foundationInkStops as inkStops,
	foundationRadiusRows as radiusRows,
	scrollItems,
	foundationSignalStops as signalStops,
	foundationSkyStops as skyStops,
	foundationSpaceRows as spaceRows,
	foundationSurfaceStops as surfaceStops,
	typeRows
} from '@/foundation-data'

// DX-TODO(docs): This route still owns raw docs HTML/CSS classes. Future UX polish should rebuild the page from Concrete primitives only.
export default function FoundationsRoute() {
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
					<span>Specimen display instance - opsz 144 / SOFT 100 / WONK 1</span>
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
