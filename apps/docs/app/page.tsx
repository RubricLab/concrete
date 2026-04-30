import {
	Button,
	Card,
	Chip,
	ConcreteIcon,
	componentRegistry,
	Delta,
	Frame,
	foundationRegistry,
	InlineCode,
	Kbd,
	Progress,
	ProgressRing,
	primitiveRegistry,
	renderComponentExample,
	renderPrimitiveExample,
	SegmentedProgress,
	Spinner,
	Stat,
	Switch,
	TextLink
} from '@rubriclab/concrete'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
	homeTypeRows,
	homeIconNames as iconNames,
	iconRuleRows,
	homeInkStops as inkStops,
	pressureRows,
	homeRadiusRows as radiusRows,
	homeSignalStops as signalStops,
	homeSkyStops as skyStops,
	homeSpaceRows as spaceRows,
	typographySummary
} from '@/foundation-data'

// DX-TODO(docs): This route still owns raw docs HTML/CSS classes. Future UX polish should rebuild the page from Concrete primitives only.
export default function HomeRoute() {
	return (
		<main className="docsHome" id="home">
			<section className="docsChapter docsHero">
				<ChapterMeta label="Concrete" meta="Editorial system / product primitives" number="00" />
				<h1>Concrete is a design system for labs that ship</h1>
				<p className="docsLead">
					An editorial voice for serious tools: crisp type, soft controls, dense product surfaces, and
					one primitive kit underneath every page.
				</p>
				<div className="heroInstall">
					<span>npm</span>
					<code>npm install @rubriclab/concrete</code>
				</div>
				<div className="heroBillboard" aria-hidden>
					<span className="heroKicker">Concrete / 00</span>
					<p>
						Build the <em>language</em>
						<br />
						before the page.
					</p>
					<div className="heroStrip">
						<span>type</span>
						<span>color</span>
						<span>density</span>
						<span>motion</span>
						<span>primitives</span>
					</div>
				</div>
			</section>

			<section className="docsChapter" id="foundations">
				<ChapterMeta
					label="Foundations"
					meta={`${foundationRegistry.length} foundations / registry-backed tokens`}
					number="01"
				/>
				<h2>One language, many pressures.</h2>
				<p className="docsLead">
					Foundations are strict enough for product density and expressive enough for published research.
					Pressure is creative direction, not a universal primitive prop.
				</p>

				<Subhead detail={typographySummary} index="01.01" title="Typography" />
				<div className="foundationSplit">
					<div className="typeSpecimen">
						<p>
							Rubric is a lab
							<br />
							that <em>ships</em>
						</p>
					</div>
					<div className="typeScaleCompact">
						{homeTypeRows.map(([metric, sample, role, className]) => (
							<div key={role}>
								<span>{metric}</span>
								{renderHomeTypeSample(sample, className)}
								<em>{role}</em>
							</div>
						))}
					</div>
				</div>

				<Subhead detail="ink / sky / three signals" index="01.02" title="Color" />
				<div className="colorFigure">
					<SwatchGrid stops={inkStops} />
					<SwatchGrid stops={skyStops} />
					<div className="signalGrid">
						{signalStops.map(([label, color, role]) => (
							<div className="signalTile" key={label}>
								<i style={{ background: color }} />
								<b>{label}</b>
								<span>{role}</span>
							</div>
						))}
					</div>
				</div>

				<Subhead detail="4 contexts / one grid" index="01.03" title="Pressure and density" />
				<div className="densityGrid">
					{pressureRows.map(([title, description]) => (
						<article key={title}>
							<strong>{title}</strong>
							<span>{description}</span>
							<i data-density={title.toLowerCase()} />
						</article>
					))}
				</div>

				<Subhead detail="4px base / strict meaning" index="01.04" title="Space, radius, elevation" />
				<div className="foundationTrio">
					<div className="spacingScale">
						{spaceRows.map(([label, size, role]) => (
							<span key={label} style={{ '--home-space': `${size}px` } as CSSProperties}>
								<b>{label}</b>
								<i>{size}</i>
								<em>{role}</em>
							</span>
						))}
					</div>
					<div className="radiusGrid">
						{radiusRows.map(([label, radius, role]) => (
							<article key={label} style={{ '--home-radius': radius } as CSSProperties}>
								<i />
								<b>{label}</b>
								<span>{role}</span>
							</article>
						))}
					</div>
					<div className="elevationGrid">
						<span>Border</span>
						<span>Raised</span>
						<span>Floating</span>
						<span>Overlay</span>
					</div>
				</div>

				<Subhead detail="state only / always visible" index="01.05" title="Motion, focus, texture" />
				<div className="foundationUtilityGrid">
					<div className="motionFigure">
						<span>Fade</span>
						<span>Move</span>
						<span>Reveal</span>
						<span>Dismiss</span>
					</div>
					<div className="focusFigure">
						<Button className="homeFocusedButton" variant="secondary">
							Focused action
						</Button>
						<Chip selected>Selected chip</Chip>
						<Switch checked label="Visible focus" readOnly />
					</div>
					<div className="textureFigure">
						<div className="concrete-lattice" />
						<div className="concrete-dots" />
						<div className="concrete-lines" />
					</div>
				</div>

				<Subhead detail="currentColor / typed registry" index="01.06" title="Iconography" />
				<div className="iconSystem">
					<div className="iconRules">
						{iconRuleRows.map(([label, value]) => (
							<span key={label}>
								<b>{label}</b>
								<i>{value}</i>
							</span>
						))}
					</div>
					<div className="iconLibrary">
						{iconNames.map(name => (
							<span key={name}>
								<ConcreteIcon name={name} />
								{name}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="docsChapter" id="primitives">
				<ChapterMeta
					label="Primitives"
					meta={`${primitiveRegistry.length} atoms / registry-backed specs`}
					number="02"
				/>
				<h2>Small parts, clear roles.</h2>
				<p className="docsLead">
					Each card shows a real exported primitive centered in a sunken stage. The full card opens the
					typed primitive page with states, props, and render routes.
				</p>
				<div className="homePrimitiveGrid">
					{primitiveRegistry.map(entry => (
						<article className="homePrimitiveCard" key={entry.slug}>
							<Link
								aria-label={`Open ${entry.name} primitive details`}
								className="homeCardOverlay"
								href={`/primitives/${entry.slug}`}
							/>
							<header>
								<strong>{entry.name}</strong>
								<span>{entry.category}</span>
							</header>
							<div className="homePrimitiveStage">{renderPrimitiveExample(entry.slug)}</div>
						</article>
					))}
				</div>
			</section>

			<section className="docsChapter" id="components">
				<ChapterMeta
					label="Components"
					meta={`${componentRegistry.length} compositions / built from primitives`}
					number="03"
				/>
				<h2>Components declare density.</h2>
				<p className="docsLead">
					Components assemble primitive contracts into agentic interaction, AI-native transcript, and
					form workflows. They can own deterministic local behavior, but product policy stays in the
					application.
				</p>

				<div className="componentFeatureGrid">
					{componentRegistry.map(entry => (
						<article className="componentFeatureCard" key={entry.slug}>
							<Link
								aria-label={`Open ${entry.name} component details`}
								className="homeCardOverlay"
								href={`/components/${entry.slug}`}
							/>
							<header>
								<strong>{entry.name}</strong>
								<span>{entry.category}</span>
							</header>
							<div className="componentFeatureStage" data-component={entry.slug}>
								{renderComponentExample(entry.slug)}
							</div>
							<p>{entry.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className="docsChapter" id="api">
				<ChapterMeta label="API" meta="stable public package surface" number="04" />
				<h2>Contracts stay small.</h2>
				<p className="docsLead">
					Concrete ships one public React package, one registry, one schema boundary, and one render
					contract for DOM and screenshots.
				</p>

				<div className="apiGrid">
					<Card title="Package exports">
						<div className="apiCodeRows">
							<InlineCode>@rubriclab/concrete</InlineCode>
							<InlineCode>@rubriclab/concrete/components</InlineCode>
							<InlineCode>@rubriclab/concrete/primitives</InlineCode>
							<InlineCode>@rubriclab/concrete/styles.css</InlineCode>
							<InlineCode>@rubriclab/concrete/registry</InlineCode>
							<InlineCode>@rubriclab/concrete/icons</InlineCode>
							<InlineCode>@rubriclab/concrete/schemas</InlineCode>
						</div>
					</Card>
					<Card title="Render routes">
						<div className="apiCodeRows">
							<TextLink href="/render/foundation/colors">/render/foundation/colors</TextLink>
							<TextLink href="/render/primitive/button">/render/primitive/button</TextLink>
							<TextLink href="/render/primitive/button.jpg">/render/primitive/button.jpg</TextLink>
							<TextLink href="/render/component/composer">/render/component/composer</TextLink>
							<TextLink href="/render/component/composer.jpg">/render/component/composer.jpg</TextLink>
						</div>
					</Card>
					<Card title="Skill contract">
						<p>
							Use primitives for controls and surfaces. Use registry metadata for docs and screenshots.
							Choose pressure before composing, never as a universal primitive prop.
						</p>
					</Card>
					<Card title="Smoke sample">
						<div className="apiSmoke">
							<Stat delta={<Delta intent="positive" value="100%" />} label="Exports" value="clean" />
							<Progress tone="terminal" value={100} />
							<Kbd>⌘</Kbd>
							<Kbd>K</Kbd>
							<Spinner size={14} tone="sky" />
						</div>
					</Card>
				</div>

				<div className="apiFooter">
					<Frame header="Registry" headerMeta="shared source">
						<div className="apiMetrics">
							<Stat label="Foundations" value={foundationRegistry.length} />
							<Stat label="Primitives" value={primitiveRegistry.length} />
							<Stat label="Components" value={componentRegistry.length} />
							<SegmentedProgress segments={8} value={8} />
							<ProgressRing size={76} tone="terminal" value={100} />
						</div>
					</Frame>
					<Link className="actionLink" href="/components">
						Open components
					</Link>
				</div>
			</section>
		</main>
	)
}

type ChapterMetaProps = {
	label: string
	meta: string
	number: string
}

function ChapterMeta({ label, meta, number }: ChapterMetaProps) {
	return (
		<div className="chapterMeta">
			<span className="chapterNumber">{number}</span>
			<span className="chapterLabel">{label}</span>
			<span>{meta}</span>
		</div>
	)
}

type SubheadProps = {
	detail: string
	index: string
	title: string
}

function Subhead({ detail, index, title }: SubheadProps) {
	return (
		<div className="docsSubhead">
			<span>{index}</span>
			<strong>{title}</strong>
			<em>{detail}</em>
		</div>
	)
}

type SwatchGridProps = {
	stops: readonly (readonly [string, string, string])[]
}

function SwatchGrid({ stops }: SwatchGridProps) {
	return (
		<div className="swatchGridCompact">
			{stops.map(([label, color, role], index) => (
				<span
					className={index > stops.length / 2 ? 'isLight' : undefined}
					key={label}
					style={{ '--home-swatch': color } as CSSProperties}
				>
					<b>{label}</b>
					<i>{role}</i>
				</span>
			))}
		</div>
	)
}

function renderHomeTypeSample(sample: string, className: string) {
	const homeClassName = getHomeTypeClassName(className)

	return className === 'scaleBody' ? (
		<p className={homeClassName}>{sample}</p>
	) : (
		<strong className={homeClassName}>{sample}</strong>
	)
}

function getHomeTypeClassName(className: string): string {
	switch (className) {
		case 'scaleDisplay':
			return 'displayRole'
		case 'scaleHero':
			return 'heroRole'
		default:
			return className
	}
}
