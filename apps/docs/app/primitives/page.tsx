'use client'

import {
	Avatar,
	Badge,
	BrandMark,
	Bubble,
	Button,
	Card,
	Caret,
	Checkbox,
	Chip,
	CodeBlock,
	ConcreteIcon,
	Delta,
	Distribution,
	Divider,
	EmptyState,
	Frame,
	Indicator,
	InlineCode,
	Input,
	Kbd,
	Pill,
	type PrimitiveSlug,
	Progress,
	ProgressRing,
	primitiveRegistry,
	Radio,
	Row,
	renderPrimitiveExample,
	SegmentedProgress,
	Skeleton,
	Slider,
	Sparkline,
	Spinner,
	Stat,
	Switch,
	Tag,
	Textarea,
	TextLink,
	Texture,
	Tooltip,
	Wordmark
} from '@rubriclab/concrete'
import type { IconName } from '@rubriclab/concrete/icons'
import Link from 'next/link'
import { type CSSProperties, type ReactNode, useState } from 'react'

const sparklineLineSeries = {
	down: [28, 25, 26, 22, 20, 15, 10, 6],
	neutral: [14, 15, 13, 14, 15, 13, 14],
	plateau: [6, 10, 18, 22, 22, 22, 23, 22, 23],
	step: [8, 8, 13, 13, 18, 18, 24, 24, 28],
	up: [6, 10, 13, 12, 18, 16, 24, 23, 29],
	volatile: [14, 28, 9, 24, 8, 25, 10, 27, 15, 30]
} as const

const dotSeries = {
	dense: [10, 12, 11, 14, 13, 17, 16, 20, 19, 22, 21, 24, 25, 27, 26, 28],
	normal: [12, 14, 16, 18, 19, 18, 16, 14, 12, 10],
	outliers: [12, 12, 13, 12, 28, 13, 12, 11, 12],
	sparse: [14, 18, 12, 22, 15, 20],
	trendDown: [28, 24, 21, 19, 16, 14, 10],
	trendUp: [8, 12, 17, 15, 20, 24, 28]
} as const

const miniIconNames = [
	'search',
	'home',
	'settings',
	'bell',
	'message-square',
	'activity',
	'file-text',
	'folder',
	'check',
	'plus',
	'trash-2',
	'sparkles'
] as const satisfies readonly IconName[]

const emptyStateCatalog = [
	['search', 'No results', 'Filtered views and empty queries.'],
	['file-text', 'No documents yet', 'Blank-slate creation surfaces.'],
	['inbox', 'All caught up', 'Good-empty queues without a CTA.'],
	['user', 'No members', 'Empty groups, channels, and projects.'],
	['lock', 'No access', 'Permission and authentication gates.'],
	['trash-2', 'Trash is empty', 'Destructive history with nothing to show.']
] as const satisfies readonly [IconName, string, string][]

const widePrimitiveSlugs = new Set<PrimitiveSlug>([
	'empty-state',
	'indicator',
	'skeleton',
	'sparkline'
])

export default function PrimitivesPage() {
	return (
		<main className="main">
			<section className="section">
				<div className="sectionHead">
					<div>
						<span className="eyebrow">Primitives</span>
						<h1>Concept cards, implemented atoms.</h1>
					</div>
					<p>
						Each card mirrors the original concept previews: breadth first, terse labels, real primitives,
						and links into the typed prop pages.
					</p>
				</div>

				<div className="primitiveCatalog">
					{primitiveRegistry.map(entry => (
						<article
							className={
								widePrimitiveSlugs.has(entry.slug)
									? 'primitiveConceptCard primitiveConceptWide'
									: 'primitiveConceptCard'
							}
							key={entry.slug}
						>
							<div className="conceptEyebrowRow">
								<span className="conceptEyebrow">{entry.name}</span>
								<Link className="conceptCardLink" href={`/primitives/${entry.slug}`}>
									props
								</Link>
							</div>
							{renderPrimitiveConcept(entry.slug)}
						</article>
					))}
				</div>
			</section>
		</main>
	)
}

function renderPrimitiveConcept(slug: PrimitiveSlug): ReactNode {
	switch (slug) {
		case 'button':
			return <ButtonConcept />
		case 'input':
			return <InputConcept />
		case 'tag':
			return <TagConcept />
		case 'link':
			return <LinkConcept />
		case 'sparkline':
			return <SparklineConcept />
		case 'badge':
			return <BadgeConcept />
		case 'progress':
			return <ProgressConcept />
		case 'distribution':
			return <DistributionConcept />
		case 'card':
			return <CardConcept />
		case 'row':
			return <RowConcept />
		case 'checkbox':
			return <ChoiceConcept kind="checkbox" />
		case 'radio':
			return <ChoiceConcept kind="radio" />
		case 'switch':
			return <SwitchConcept />
		case 'textarea':
			return <TextareaConcept />
		case 'select':
			return <SelectConcept />
		case 'slider':
			return <SliderConcept />
		case 'pill':
			return <PillConcept />
		case 'chip':
			return <ChipConcept />
		case 'kbd':
			return <KbdConcept />
		case 'avatar':
			return <AvatarConcept />
		case 'bubble':
			return <BubbleConcept />
		case 'code':
			return <CodeConcept />
		case 'divider':
			return <DividerConcept />
		case 'empty-state':
			return <EmptyStateConcept />
		case 'tooltip':
			return <TooltipConcept />
		case 'stat':
			return <StatConcept />
		case 'delta':
			return <DeltaConcept />
		case 'skeleton':
			return <SkeletonConcept />
		case 'frame':
			return <FrameConcept />
		case 'texture':
			return <TextureConcept />
		case 'brand-mark':
			return <BrandConcept />
		case 'wordmark':
			return <WordmarkConcept />
		case 'icon':
			return <IconConcept />
		case 'focus-ring':
			return <FocusConcept />
		case 'indicator':
			return <IndicatorConcept />
		case 'caret':
			return <CaretConcept />
		case 'spinner':
			return <SpinnerConcept />
		default:
			return <div className="conceptStage">{renderPrimitiveExample(slug)}</div>
	}
}

function ButtonConcept() {
	const [lastAction, setLastAction] = useState('No command yet')

	return (
		<>
			<ConceptLabel>Variants</ConceptLabel>
			<div className="conceptRow">
				<Button onClick={() => setLastAction('Primary')} variant="primary">
					Primary
				</Button>
				<Button onClick={() => setLastAction('Secondary')} variant="secondary">
					Secondary
				</Button>
				<Button onClick={() => setLastAction('Soft')} variant="soft">
					Soft
				</Button>
				<Button onClick={() => setLastAction('Ghost')} variant="ghost">
					Ghost
				</Button>
				<Button onClick={() => setLastAction('Sky')} variant="sky">
					Sky
				</Button>
				<Button onClick={() => setLastAction('Sky soft')} variant="sky-soft">
					Sky soft
				</Button>
			</div>
			<ConceptLabel>Signals - ultra, error</ConceptLabel>
			<div className="conceptRow">
				<Button leadingIcon="star" variant="ultra">
					Upgrade to Pro
				</Button>
				<Button leadingIcon="trash-2" variant="danger">
					Delete
				</Button>
			</div>
			<ConceptLabel>Sizes</ConceptLabel>
			<div className="conceptRow">
				<Button size="tiny">XS</Button>
				<Button size="small">Small</Button>
				<Button>Default</Button>
				<Button size="large">Large</Button>
			</div>
			<ConceptLabel>With icon</ConceptLabel>
			<div className="conceptRow">
				<Button leadingIcon="plus" variant="primary">
					New
				</Button>
				<Button trailingIcon="arrow-right">Continue</Button>
				<Button leadingIcon="message-square" variant="ghost">
					Comment
				</Button>
				<Button aria-label="More" iconOnly leadingIcon="more-horizontal" />
			</div>
			<ConceptLabel>With kbd</ConceptLabel>
			<div className="conceptRow">
				<Button onClick={() => setLastAction('Send')} shortcut={['cmd', 'enter']} variant="primary">
					Send
				</Button>
				<Button onClick={() => setLastAction('Search')} shortcut={['cmd', 'K']}>
					Search
				</Button>
				<Button shortcut={['O']} variant="ghost">
					Open
				</Button>
				<Button onClick={() => setLastAction('Ship')} shortcut={['shift', 'S']} variant="sky">
					Ship
				</Button>
			</div>
			<p className="conceptInteractionNote">{lastAction}</p>
			<ConceptLabel>States</ConceptLabel>
			<div className="conceptRow">
				<Button loading variant="primary">
					Saving
				</Button>
				<Button disabled variant="primary">
					Disabled
				</Button>
				<Button disabled>Disabled</Button>
			</div>
		</>
	)
}

function InputConcept() {
	return (
		<div className="conceptStack conceptStackWide">
			<ConceptLabel>States</ConceptLabel>
			<Input label="Default" placeholder="you@rubric.bot" />
			<Input defaultValue="ari@rubric.bot" label="Filled" />
			<Input autoFocus defaultValue="ari@rubric.bot" label="Focused" />
			<Input defaultValue="not-an-email" error="Enter a valid email address." label="Error" />
			<Input disabled defaultValue="locked" label="Disabled" />
			<ConceptLabel>With leading glyph</ConceptLabel>
			<Input leadingIcon="search" placeholder="Search everything" />
		</div>
	)
}

function LinkConcept() {
	return (
		<div className="conceptProse">
			<ConceptLabel>Inline</ConceptLabel>
			<p>
				A default <TextLink href="#">ink underline</TextLink> inside prose reads as native type.
			</p>
			<p>
				Use a{' '}
				<TextLink href="#" tone="sky">
					sky link
				</TextLink>{' '}
				when the pointer is the whole point.
			</p>
			<p>
				A{' '}
				<TextLink href="#" tone="muted">
					muted link
				</TextLink>{' '}
				reveals its underline on hover.
			</p>
			<p>
				This sentence contains an{' '}
				<TextLink external href="#">
					external reference
				</TextLink>{' '}
				with a glyph.
			</p>
			<ConceptLabel>Nav</ConceptLabel>
			<nav className="conceptNav">
				<TextLink href="#" variant="nav">
					Overview
				</TextLink>
				<TextLink href="#" variant="nav">
					Models
				</TextLink>
				<TextLink href="#" variant="nav">
					Pricing
				</TextLink>
				<TextLink href="#" variant="nav">
					Docs
				</TextLink>
			</nav>
		</div>
	)
}

function TagConcept() {
	const [tags, setTags] = useState(['concrete', 'primitives', 'v0.3'])
	const [inputTags, setInputTags] = useState(['design', 'ai', 'systems'])
	function removeTag(tagToRemove: string) {
		setTags(currentTags => currentTags.filter(tag => tag !== tagToRemove))
	}

	function removeInputTag(tagToRemove: string) {
		setInputTags(currentTags => currentTags.filter(tag => tag !== tagToRemove))
	}

	return (
		<>
			<ConceptLabel>Default - plain and removable</ConceptLabel>
			<div className="conceptRow">
				<Tag>design-system</Tag>
				{tags.map(tag => (
					<Tag dismissible key={tag} onDismiss={() => removeTag(tag)}>
						{tag}
					</Tag>
				))}
			</div>
			<ConceptLabel>With leading icon - tag as type</ConceptLabel>
			<div className="conceptRow">
				<Tag dismissible leadingIcon="file-text">
					article
				</Tag>
				<Tag dismissible leadingIcon="user">
					ari
				</Tag>
				<Tag dismissible leadingIcon="folder">
					design-system
				</Tag>
				<Tag dismissible leadingIcon="activity">
					concrete-ost
				</Tag>
			</div>
			<ConceptLabel>Signal washes - priority / status</ConceptLabel>
			<div className="conceptRow">
				<Tag dismissible tone="terminal">
					Shipping
				</Tag>
				<Tag dismissible tone="sky">
					In review
				</Tag>
				<Tag dismissible tone="ultra">
					Featured
				</Tag>
				<Tag dismissible tone="error">
					Blocking
				</Tag>
			</div>
			<ConceptLabel>Variants</ConceptLabel>
			<div className="conceptRow">
				<Tag>Default</Tag>
				<Tag variant="outline">Outline</Tag>
				<Tag variant="active">Active</Tag>
				<Tag dismissible variant="selected">
					Selected
				</Tag>
			</div>
			<ConceptLabel>Sizes</ConceptLabel>
			<div className="conceptRow">
				<Tag size="small">small</Tag>
				<Tag>default</Tag>
				<Tag size="large">large</Tag>
			</div>
			<ConceptLabel>Tag input</ConceptLabel>
			<div className="tagInputMock">
				{inputTags.map(tag => (
					<Tag dismissible key={tag} onDismiss={() => removeInputTag(tag)}>
						{tag}
					</Tag>
				))}
				<input
					aria-label="Add tag"
					onKeyDown={event => {
						if (event.key !== 'Enter') {
							return
						}
						const value = event.currentTarget.value.trim()
						if (value.length === 0) {
							return
						}
						setInputTags(currentTags => [...currentTags, value])
						event.currentTarget.value = ''
					}}
					placeholder="Add tag..."
				/>
			</div>
		</>
	)
}

function SparklineConcept() {
	return (
		<>
			<div className="conceptEyebrowRow conceptSubheaderRow">
				<span className="conceptEyebrow">Line</span>
				<span className="conceptEyebrow conceptEyebrowSoft">
					1px stroke - 28px height - endpoint dot
				</span>
			</div>
			<div className="sparkGrid">
				<SparkCell title="Up">
					<Sparkline values={sparklineLineSeries.up} />
				</SparkCell>
				<SparkCell title="Down">
					<Sparkline tone="sky" values={sparklineLineSeries.down} />
				</SparkCell>
				<SparkCell title="Neutral">
					<Sparkline tone="neutral" values={sparklineLineSeries.neutral} />
				</SparkCell>
				<SparkCell title="Volatile">
					<Sparkline values={sparklineLineSeries.volatile} />
				</SparkCell>
				<SparkCell title="Step">
					<Sparkline values={sparklineLineSeries.step} />
				</SparkCell>
				<SparkCell title="Plateau">
					<Sparkline values={sparklineLineSeries.plateau} />
				</SparkCell>
			</div>
			<ConceptLabel>Area - soft fill - sky to transparent</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Up">
					<Sparkline area values={sparklineLineSeries.up} />
				</SparkCell>
				<SparkCell title="Down">
					<Sparkline area values={sparklineLineSeries.down} />
				</SparkCell>
				<SparkCell title="Neutral">
					<Sparkline area tone="neutral" values={sparklineLineSeries.neutral} />
				</SparkCell>
				<SparkCell title="Volatile">
					<Sparkline area values={sparklineLineSeries.volatile} />
				</SparkCell>
				<SparkCell title="Step">
					<Sparkline area values={sparklineLineSeries.step} />
				</SparkCell>
				<SparkCell title="Plateau">
					<Sparkline area values={sparklineLineSeries.plateau} />
				</SparkCell>
			</div>
			<ConceptLabel>Bar - density over variation</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Positive">
					<Sparkline values={[6, 9, 11, 14, 18, 22, 26, 29]} variant="bar" />
				</SparkCell>
				<SparkCell title="Negative">
					<Sparkline tone="neutral" values={[29, 26, 22, 18, 14, 11, 9, 6]} variant="bar" />
				</SparkCell>
				<SparkCell title="Mixed">
					<Sparkline values={[12, 16, 7, 14, 20, 8, 18, 10]} variant="bar" />
				</SparkCell>
				<SparkCell title="Grouped">
					<Sparkline values={[10, 16, 13, 21, 14, 25, 18, 28]} variant="bar" />
				</SparkCell>
				<SparkCell title="Stacked">
					<Sparkline tone="terminal" values={[12, 18, 16, 20, 18, 24, 22, 26]} variant="bar" />
				</SparkCell>
				<SparkCell title="Discrete">
					<Sparkline values={[8, 11, 14, 17, 20, 16, 24, 21, 27]} variant="bar" />
				</SparkCell>
			</div>
			<ConceptLabel>Dot - distribution - sparse</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Sparse">
					<Sparkline values={dotSeries.sparse} variant="dot" />
				</SparkCell>
				<SparkCell title="Normal">
					<Sparkline tone="neutral" values={dotSeries.normal} variant="dot" />
				</SparkCell>
				<SparkCell title="Dense">
					<Sparkline values={dotSeries.dense} variant="dot" />
				</SparkCell>
				<SparkCell title="Trend up">
					<Sparkline values={dotSeries.trendUp} variant="dot" />
				</SparkCell>
				<SparkCell title="Trend down">
					<Sparkline tone="neutral" values={dotSeries.trendDown} variant="dot" />
				</SparkCell>
				<SparkCell title="Outliers">
					<Sparkline tone="error" values={dotSeries.outliers} variant="dot" />
				</SparkCell>
			</div>
		</>
	)
}

function BadgeConcept() {
	return (
		<>
			<ConceptLabel>Signal - soft tint</ConceptLabel>
			<div className="conceptRow">
				<Badge signal="terminal">Healthy</Badge>
				<Badge signal="ultra">Featured</Badge>
				<Badge signal="error">Critical</Badge>
			</div>
			<ConceptLabel>Lifecycle - state over time</ConceptLabel>
			<div className="conceptRow">
				<Badge signal="ultra" variant="ghost">
					Draft
				</Badge>
				<Badge signal="ultra">In review</Badge>
				<Badge signal="terminal">Shipping</Badge>
				<Badge signal="error">Blocked</Badge>
			</div>
			<ConceptLabel>Ghost - solid - count</ConceptLabel>
			<div className="conceptRow">
				<Badge signal="ultra" variant="ghost">
					v2.4.1
				</Badge>
				<Badge signal="terminal" variant="solid">
					Live
				</Badge>
				<Badge signal="ultra" variant="solid">
					Pro
				</Badge>
				<Badge signal="error" variant="count">
					99+
				</Badge>
			</div>
		</>
	)
}

function ProgressConcept() {
	return (
		<>
			<ConceptLabel>Linear - 6px - ink default - signal for state</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Default" value={72}>
					<Progress value={72} />
				</MetricBar>
				<MetricBar label="Sky" value={48}>
					<Progress tone="sky" value={48} />
				</MetricBar>
				<MetricBar label="Shipping" value={92}>
					<Progress tone="terminal" value={92} />
				</MetricBar>
				<MetricBar label="Featured" value={60}>
					<Progress tone="ultra" value={60} />
				</MetricBar>
				<MetricBar label="Blocking" value={34}>
					<Progress tone="error" value={34} />
				</MetricBar>
			</div>
			<ConceptLabel>Density - thin - default - thick</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Inline" value={62}>
					<Progress size="thin" value={62} />
				</MetricBar>
				<MetricBar label="Default" value={62}>
					<Progress value={62} />
				</MetricBar>
				<MetricBar label="Section" value={62}>
					<Progress size="thick" value={62} />
				</MetricBar>
			</div>
			<ConceptLabel>Segmented - n of m</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Onboarding" value={5} valueSuffix="/ 8">
					<SegmentedProgress segments={8} value={5} />
				</MetricBar>
				<MetricBar label="Migration" value={2} valueSuffix="/ 12">
					<SegmentedProgress segments={12} value={2} />
				</MetricBar>
			</div>
			<ConceptLabel>Circular - 96px - 6px stroke - rounded caps</ConceptLabel>
			<div className="ringGrid">
				<RingCell caption="Completion">
					<ProgressRing tone="sky" value={68} />
				</RingCell>
				<RingCell caption="106 GB - of 250 GB">
					<ProgressRing tone="terminal" value={42} />
				</RingCell>
				<RingCell caption="812k - of 1.0M requests">
					<ProgressRing value={81} />
				</RingCell>
			</div>
			<ConceptLabel>Indeterminate - unknown duration</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Shuttle" value={0} valueSuffix="">
					<Progress indeterminate="shuttle" />
				</MetricBar>
				<MetricBar label="Sky shuttle" value={0} valueSuffix="">
					<Progress indeterminate="shuttle" tone="sky" />
				</MetricBar>
				<MetricBar label="Lined" value={0} valueSuffix="">
					<Progress indeterminate="lined" />
				</MetricBar>
				<MetricBar label="Lined sky" value={0} valueSuffix="">
					<Progress indeterminate="lined" tone="sky" />
				</MetricBar>
			</div>
		</>
	)
}

function DistributionConcept() {
	return (
		<>
			<ConceptLabel>Bar</ConceptLabel>
			<Distribution
				data={[
					{ label: 'Direct', value: 47 },
					{ label: 'Referral', tone: 'sky', value: 28 },
					{ label: 'Social', value: 15 },
					{ label: 'Organic', value: 10 }
				]}
			/>
			<ConceptLabel>Diverging proxy</ConceptLabel>
			<div className="conceptStack">
				<MetricBar label="Revenue" value={18}>
					<Progress tone="terminal" value={68} />
				</MetricBar>
				<MetricBar label="Conversion" value={-2}>
					<Progress tone="error" value={12} />
				</MetricBar>
			</div>
		</>
	)
}

function CardConcept() {
	return (
		<div className="conceptGridThree">
			<Card description="Border only. The canonical surface." title="Default" />
			<Card description="One step over canvas." title="Raised" variant="raised" />
			<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
			<Card
				className="conceptSpanAll"
				description="Hairline lifts on hover; border tightens."
				interactive
				title="Interactive"
			/>
		</div>
	)
}

function RowConcept() {
	return (
		<div className="rowsMock">
			<Row leadingIcon="file-text" meta="edited" interactive>
				Research memo
			</Row>
			<Row leadingIcon="activity" meta="live" interactive>
				Agent run
			</Row>
			<Row leadingIcon="folder" meta="12k" interactive>
				Memory shard
			</Row>
		</div>
	)
}

function ChoiceConcept({ kind }: { kind: 'checkbox' | 'radio' }) {
	const [checked, setChecked] = useState(true)
	const [radioValue, setRadioValue] = useState('selected')
	const Control = kind === 'checkbox' ? Checkbox : Radio

	if (kind === 'radio') {
		return (
			<>
				<ConceptLabel>States</ConceptLabel>
				<div className="conceptStack">
					<Radio
						checked={radioValue === 'selected'}
						label="Team - $12 / user / mo"
						name="primitive-radio"
						onChange={() => setRadioValue('selected')}
					/>
					<Radio
						checked={radioValue === 'default'}
						label="Starter - $0 / mo"
						name="primitive-radio"
						onChange={() => setRadioValue('default')}
					/>
					<Radio disabled label="Legacy plan (unavailable)" name="primitive-radio" />
				</div>
			</>
		)
	}

	return (
		<>
			<ConceptLabel>States</ConceptLabel>
			<div className="conceptStack">
				<Control
					checked={!checked}
					label="Subscribe to weekly digest"
					onChange={() => setChecked(!checked)}
				/>
				<Control
					checked={checked}
					label="Show resolved threads"
					onChange={() => setChecked(!checked)}
				/>
				<Control disabled label="Workspace setting locked" readOnly />
			</div>
		</>
	)
}

function SwitchConcept() {
	const [memoryEnabled, setMemoryEnabled] = useState(true)
	const [draftEnabled, setDraftEnabled] = useState(false)

	return (
		<div className="conceptStack">
			<Switch
				checked={memoryEnabled}
				label={
					<span className="choiceColumn">
						Public workspace<span>Anyone with the link can view</span>
					</span>
				}
				onChange={() => setMemoryEnabled(!memoryEnabled)}
			/>
			<Switch
				checked={draftEnabled}
				label={
					<span className="choiceColumn">
						Notifications<span>Send weekly digest to my inbox</span>
					</span>
				}
				onChange={() => setDraftEnabled(!draftEnabled)}
			/>
			<Switch
				checked
				disabled
				label={
					<span className="choiceColumn">
						SSO enforcement<span>Available on Enterprise</span>
					</span>
				}
				readOnly
			/>
		</div>
	)
}

function TextareaConcept() {
	return (
		<div className="conceptStack conceptStackWide">
			<Textarea label="Prompt" placeholder="Describe the experiment..." />
			<Textarea defaultValue="A denser writing surface for generated notes." label="Filled" />
			<Textarea error="Prompt is required." label="Error" />
		</div>
	)
}

function SelectConcept() {
	return (
		<div className="conceptStack conceptStackWide">
			<DemoSelect
				label="Workspace"
				options={[
					{ label: 'Rubric - Design', shortcut: ['cmd', '1'], value: 'design' },
					{ label: 'Rubric - Engineering', shortcut: ['cmd', '2'], value: 'engineering' },
					{ label: 'Rubric - Research', shortcut: ['cmd', '3'], value: 'research' }
				]}
			/>
			<DemoSelect
				label="Sort by"
				options={[
					{ label: 'Most recent', value: 'recent' },
					{ label: 'Oldest', value: 'oldest' },
					{ label: 'Alphabetical', value: 'alpha' }
				]}
			/>
		</div>
	)
}

function SliderConcept() {
	const [value, setValue] = useState(62)
	const [rangeStart, setRangeStart] = useState(24)
	const [rangeEnd, setRangeEnd] = useState(86)
	const rangeStyle: CSSProperties & { '--range-a': string; '--range-b': string } = {
		'--range-a': `${rangeStart}%`,
		'--range-b': `${rangeEnd}%`
	}

	return (
		<div className="conceptStack">
			<ConceptLabel>Default - 2px rail - 10px thumb</ConceptLabel>
			<SliderField label="Temperature" ticks={['0', '0.5', '1.0']} valueLabel="0.70">
				<Slider defaultValue={70} />
			</SliderField>
			<SliderField label="Max tokens" valueLabel="2,048">
				<Slider defaultValue={40} />
			</SliderField>
			<SliderField label="Opacity" valueLabel="60%">
				<Slider defaultValue={60} tone="sky" />
			</SliderField>
			<ConceptLabel>Inline - label - value</ConceptLabel>
			<div className="sliderInline">
				<span>Top P</span>
				<Slider defaultValue={85} />
				<code>0.85</code>
			</div>
			<div className="sliderInline">
				<span>Penalty</span>
				<Slider
					aria-label="Controlled slider"
					onChange={event => setValue(Number(event.currentTarget.value))}
					value={value}
				/>
				<code>{(value / 100).toFixed(2)}</code>
			</div>
			<div className="sliderInline">
				<span>Disabled</span>
				<Slider disabled value={50} />
				<code>0.50</code>
			</div>
			<ConceptLabel>Range - two thumbs</ConceptLabel>
			<SliderField
				label="Price range"
				ticks={['$0', '$50', '$100']}
				valueLabel={`$${rangeStart} - $${rangeEnd}`}
			>
				<div className="rangeSlider" style={rangeStyle}>
					<div className="rangeSliderTrack">
						<i />
					</div>
					<Slider
						aria-label="Minimum price"
						onChange={event => setRangeStart(Math.min(Number(event.currentTarget.value), rangeEnd - 1))}
						value={rangeStart}
					/>
					<Slider
						aria-label="Maximum price"
						onChange={event => setRangeEnd(Math.max(Number(event.currentTarget.value), rangeStart + 1))}
						value={rangeEnd}
					/>
				</div>
			</SliderField>
		</div>
	)
}

function PillConcept() {
	return (
		<>
			<ConceptLabel>Default - metadata / info</ConceptLabel>
			<div className="conceptRow">
				<Pill>Active</Pill>
				<Pill>2h ago</Pill>
				<Pill>v0.3</Pill>
				<Pill>Draft</Pill>
				<Pill>Internal</Pill>
			</div>
			<ConceptLabel>With icon</ConceptLabel>
			<div className="conceptRow">
				<Pill leadingIcon="clock">2h ago</Pill>
				<Pill leadingIcon="hash">List</Pill>
				<Pill leadingIcon="unlock">Public</Pill>
			</div>
			<ConceptLabel>Signal - status at a glance</ConceptLabel>
			<div className="conceptRow">
				<Pill tone="terminal">Shipping</Pill>
				<Pill tone="sky">In review</Pill>
				<Pill tone="ultra">Featured</Pill>
				<Pill tone="error">Blocking</Pill>
			</div>
		</>
	)
}

function ChipConcept() {
	const [selected, setSelected] = useState(true)

	return (
		<div className="conceptRow">
			<Chip>All</Chip>
			<Chip onClick={() => setSelected(!selected)} selected={selected}>
				Design
			</Chip>
			<Chip selected>Engineering</Chip>
			<Chip>Research</Chip>
			<Chip>Operations</Chip>
			<Chip tone="sky">Editorial</Chip>
		</div>
	)
}

function KbdConcept() {
	return (
		<>
			<ConceptLabel>Keys</ConceptLabel>
			<div className="conceptRow">
				<Kbd>⌘</Kbd>
				<Kbd>⇧</Kbd>
				<Kbd>⌥</Kbd>
				<Kbd>↵</Kbd>
				<Kbd>Esc</Kbd>
				<Kbd>Tab</Kbd>
				<Kbd>K</Kbd>
				<Kbd>?</Kbd>
			</div>
			<ConceptLabel>Combos in context</ConceptLabel>
			<div className="conceptStack">
				<span className="kbdHint">
					Open command menu <Kbd>⌘</Kbd>
					<span>+</span>
					<Kbd>K</Kbd>
				</span>
				<span className="kbdHint">
					Quick save <Kbd>⌘</Kbd>
					<span>+</span>
					<Kbd>S</Kbd>
				</span>
				<span className="kbdHint">
					Navigate <Kbd>↑</Kbd>
					<Kbd>↓</Kbd> then <Kbd>↵</Kbd>
				</span>
			</div>
			<ConceptLabel>Dark</ConceptLabel>
			<div className="conceptRow">
				<Kbd tone="dark">⌘</Kbd>
				<Kbd tone="dark">K</Kbd>
			</div>
		</>
	)
}

function AvatarConcept() {
	return (
		<div className="conceptRow">
			<Avatar initials="AK" size="small" />
			<Avatar initials="RL" />
			<Avatar initials="C" size="large" />
		</div>
	)
}

function BubbleConcept() {
	return (
		<div className="conceptStack">
			<Bubble>Can you summarize the last run?</Bubble>
			<Bubble direction="outbound">Summarizing the trace now.</Bubble>
		</div>
	)
}

function CodeConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Inline</ConceptLabel>
			<p>
				Install with <InlineCode>npm i @rubriclab/concrete</InlineCode>, then use{' '}
				<InlineCode>{'<ConcreteProvider>'}</InlineCode>. Tokens are exposed as{' '}
				<InlineCode>--concrete-ink-9</InlineCode>.
			</p>
			<ConceptLabel>Block - TypeScript</ConceptLabel>
			<CodeBlock
				code={`// Resolve a design token from the active theme
import { Tokens, fallback } from "./tokens"

export const DEFAULT_SCALE: number = 1.125

export function token<K extends keyof Tokens>(name: K): string {
  const root = document.documentElement
  const value = getComputedStyle(root).getPropertyValue(\`--\${name}\`)
  return value.trim() || fallback(name, 12)
}`}
			/>
			<ConceptLabel>Block - HTML</ConceptLabel>
			<CodeBlock
				code={`<button class="btn btn--primary" type="submit">
  <svg viewBox="0 0 24 24">...</svg>
  Continue
</button>`}
				language="HTML"
			/>
		</div>
	)
}

function DividerConcept() {
	return (
		<div className="conceptStack">
			<Divider />
			<Divider label="Section" />
		</div>
	)
}

function EmptyStateConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Mark - icon catalog</ConceptLabel>
			<div className="emptyCatalog">
				{emptyStateCatalog.map(([iconName, label, description]) => (
					<div className="emptyCatalogRow" key={iconName}>
						<span className="emptyCatalogMark">
							<ConcreteIcon name={iconName} />
						</span>
						<span>
							<b>{label}</b>
							<small>{description}</small>
						</span>
					</div>
				))}
			</div>
			<ConceptLabel>Sizes - 36 - 48 - 64 - sky</ConceptLabel>
			<div className="conceptRow emptySizeRow">
				<span className="emptyCatalogMark emptyCatalogMarkSmall">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark emptyCatalogMarkLarge">
					<ConcreteIcon name="search" />
				</span>
				<span className="emptyCatalogMark emptyCatalogMarkSky">
					<ConcreteIcon name="search" />
				</span>
			</div>
			<ConceptLabel>In context - copy - CTA</ConceptLabel>
			<div className="emptyContextGrid">
				<EmptyState
					action={
						<div className="emptyActionRow">
							<Button size="small" variant="secondary">
								Clear filters
							</Button>
							<Button size="small" variant="primary">
								New search
							</Button>
						</div>
					}
					body="Try a broader keyword, or clear the filters applied to this view."
					icon="search"
					size="large"
					title={
						<>
							No matches for <em>"concrete-ost"</em>
						</>
					}
				/>
				<EmptyState
					action={
						<div className="emptyActionRow">
							<Button size="small" variant="secondary">
								Import
							</Button>
							<Button size="small" variant="primary">
								New document <Kbd tone="dark">⌘N</Kbd>
							</Button>
						</div>
					}
					body="Drafts and shared docs will live here. Start one, or import from an existing source."
					icon="file-text"
					size="large"
					title={
						<>
							No <em>documents</em> yet
						</>
					}
					tone="sky"
				/>
				<EmptyState
					body="Nothing in the inbox."
					icon="inbox"
					size="large"
					title={
						<>
							All <em>caught up</em>
						</>
					}
				/>
			</div>
		</div>
	)
}

function TooltipConcept() {
	return (
		<>
			<ConceptLabel>Placements - hover the anchor</ConceptLabel>
			<div className="conceptRow tooltipDemoRow">
				<Tooltip content="Tooltip copy" placement="top">
					<Button variant="secondary">Top</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="right">
					<Button variant="secondary">Right</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="bottom">
					<Button variant="secondary">Bottom</Button>
				</Tooltip>
				<Tooltip content="Tooltip copy" placement="left">
					<Button variant="secondary">Left</Button>
				</Tooltip>
			</div>
			<ConceptLabel>Always-visible</ConceptLabel>
			<div className="conceptRow tooltipAlwaysRow">
				<Tooltip content="The quick brown fox" forceOpen placement="top">
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
				<Tooltip content="With shortcut" forceOpen placement="right" shortcut={['shift', 'S']}>
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
			</div>
		</>
	)
}

function StatConcept() {
	return (
		<>
			<ConceptLabel>Sans - sizes</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="xsmall" value="248" variant="numeric" />
				<Stat size="small" value="1,284" variant="numeric" />
				<Stat value="12,480" variant="numeric" />
				<Stat size="large" value="48,912" variant="numeric" />
				<Stat size="xlarge" value="128K" variant="numeric" />
			</div>
			<ConceptLabel>Sans - with unit</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="large" unit="%" value="3.41" variant="numeric" />
				<Stat size="large" unit="K" value="$12.4" variant="numeric" />
				<Stat size="large" tone="sky" unit="%" value="+87" variant="numeric" />
			</div>
			<ConceptLabel>Display - Fraunces</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="large" unit="%" value="87" variant="display" />
				<Stat size="large" tone="sky" unit="K" value="12.4" variant="display" />
				<Stat size="xlarge" value="$3.40" variant="display" />
			</div>
			<ConceptLabel>Dashboard lockups</ConceptLabel>
			<div className="statGrid">
				<Stat
					delta={<Delta basis="vs 30d" intent="positive" value="6.3%" />}
					label="Revenue"
					value="$18.4k"
				/>
				<Stat
					delta={<Delta basis="vs 30d" intent="negative" value="2.4%" />}
					label="Conversion rate"
					value="4.06%"
				/>
				<Stat
					delta={<Delta basis="vs 7d" intent="negative" value="8.7%" />}
					label="P95 latency"
					value="236 ms"
				/>
			</div>
		</>
	)
}

function DeltaConcept() {
	return (
		<>
			<ConceptLabel>Direction</ConceptLabel>
			<div className="conceptRow">
				<Delta intent="positive" value="18.6%" />
				<Delta intent="negative" value="8.7%" />
				<Delta value="0.0%" />
			</div>
			<ConceptLabel>Sizes</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Delta intent="positive" size="small" value="2.1%" />
				<Delta intent="positive" value="8.4%" />
				<Delta intent="positive" size="large" value="24.0%" />
				<Delta intent="positive" size="xlarge" value="124.3%" />
			</div>
			<ConceptLabel>Washed</ConceptLabel>
			<div className="conceptRow">
				<Delta intent="positive" value="18.6%" variant="wash" />
				<Delta intent="negative" value="8.7%" variant="wash" />
				<Delta value="0.0%" variant="wash" />
			</div>
			<ConceptLabel>With basis</ConceptLabel>
			<div className="conceptRow">
				<Delta basis="vs 30d" intent="positive" value="18.6%" />
				<Delta basis="vs prev run" intent="negative" value="8.7%" />
			</div>
		</>
	)
}

function SkeletonConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Atoms</ConceptLabel>
			<div className="skeletonAtoms">
				<SkeletonAtom label="Text line">
					<Skeleton className="skeletonText" width="92%" />
				</SkeletonAtom>
				<SkeletonAtom label="Text block">
					<Skeleton className="skeletonText" />
					<Skeleton className="skeletonText" width="78%" />
				</SkeletonAtom>
				<SkeletonAtom label="Avatar">
					<Skeleton className="skeletonCircle" height={32} width={32} />
				</SkeletonAtom>
				<SkeletonAtom label="Button">
					<Skeleton className="skeletonPill" height={28} width={84} />
				</SkeletonAtom>
				<SkeletonAtom label="Input">
					<Skeleton className="skeletonBlock" height={30} />
				</SkeletonAtom>
				<SkeletonAtom label="Badge">
					<Skeleton className="skeletonPill" height={20} width={56} />
				</SkeletonAtom>
				<SkeletonAtom label="Block">
					<Skeleton className="skeletonBlock" height={36} />
				</SkeletonAtom>
			</div>
			<ConceptLabel>Patterns</ConceptLabel>
			<div className="skeletonPatternGrid">
				<div className="skeletonPattern skeletonPatternFour">
					<span>List</span>
					{[62, 52, 70].map(width => (
						<div className="skeletonListRow" key={width}>
							<Skeleton className="skeletonCircle" height={28} width={28} />
							<div>
								<Skeleton className="skeletonText" width={`${width}%`} />
								<Skeleton className="skeletonText skeletonTextSmall" width={`${width - 24}%`} />
							</div>
							<Skeleton className="skeletonPill" height={20} width={44} />
						</div>
					))}
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Card</span>
					<div className="skeletonCardMock">
						<div>
							<Skeleton className="skeletonCircle" height={34} width={34} />
							<div>
								<Skeleton height={18} width="64%" />
								<Skeleton className="skeletonTextSmall" width="38%" />
							</div>
						</div>
						<Skeleton className="skeletonText" />
						<Skeleton className="skeletonText" width="94%" />
						<Skeleton className="skeletonText" width="66%" />
						<div>
							<Skeleton className="skeletonPill" height={22} width={72} />
							<Skeleton className="skeletonPill" height={22} width={44} />
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Form</span>
					<div className="skeletonFormMock">
						<Skeleton className="skeletonTextSmall" width="30%" />
						<Skeleton className="skeletonBlock" height={32} />
						<Skeleton className="skeletonTextSmall" width="38%" />
						<Skeleton className="skeletonBlock" height={32} />
						<Skeleton className="skeletonTextSmall" width="24%" />
						<Skeleton className="skeletonBlock" height={64} />
						<Skeleton className="skeletonPill" height={28} width={96} />
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternSix">
					<span>Line chart</span>
					<div className="skeletonChart">
						<div className="skeletonYAxis">
							<Skeleton height={8} width="60%" />
							<Skeleton height={8} width="75%" />
							<Skeleton height={8} width="50%" />
							<Skeleton height={8} width="65%" />
						</div>
						<div className="skeletonChartCanvas">
							<svg aria-hidden="true" viewBox="0 0 300 120" preserveAspectRatio="none">
								<path d="M0,90 C30,80 50,60 80,55 S140,40 180,30 S250,20 300,15" />
							</svg>
							<i />
						</div>
						<div className="skeletonXAxis">
							{Array.from({ length: 6 }, (_, index) => (
								<Skeleton height={8} key={index} width={22} />
							))}
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternSix">
					<span>Bar chart</span>
					<div className="skeletonBars">
						{[48, 62, 38, 78, 54, 90, 42, 66, 58, 82, 36, 70].map((height, index) => (
							<Skeleton height={`${height}%`} key={`${height}-${index}`} />
						))}
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Donut</span>
					<div className="skeletonDonutWrap">
						<div className="skeletonDonut" />
						<div>
							{[78, 64, 86, 52].map(width => (
								<div className="skeletonLegendRow" key={width}>
									<Skeleton height={10} width={10} />
									<Skeleton className="skeletonText" width={`${width}%`} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternEight">
					<span>Table</span>
					<div className="skeletonTable">
						{[0, 1, 2, 3, 4].map(index => (
							<div
								className={index === 0 ? 'skeletonTableRow skeletonTableHead' : 'skeletonTableRow'}
								key={index}
							>
								<Skeleton height={14} width={14} />
								<Skeleton className="skeletonText" width={`${index === 0 ? 50 : 70 - index * 4}%`} />
								<Skeleton className="skeletonPill" height={18} width={56} />
								<Skeleton className="skeletonText" width={`${60 + index * 4}%`} />
								<Skeleton className="skeletonText" width={`${80 - index * 5}%`} />
								<Skeleton height={4} width={16} />
							</div>
						))}
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternTwelve">
					<span>Dashboard</span>
					<div className="skeletonDashboard">
						{[55, 48, 62].map(width => (
							<div key={width}>
								<Skeleton className="skeletonTextSmall" width="40%" />
								<Skeleton height={22} width={`${width}%`} />
								<Skeleton height={30} />
							</div>
						))}
					</div>
				</div>
			</div>
			<ConceptLabel>Tokens</ConceptLabel>
			<div className="skeletonTokenRows">
				{['--sk-base', '--sk-hi', '--sk-radius', '--sk-dur'].map(token => (
					<div key={token}>
						<b>{token}</b>
						<span>
							{token === '--sk-dur' ? '1.6s linear' : token === '--sk-radius' ? '6px' : 'neutral'}
						</span>
						<Skeleton height={14} />
					</div>
				))}
			</div>
		</div>
	)
}

function SkeletonAtom({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="skeletonAtom">
			<span>{label}</span>
			<div>{children}</div>
		</div>
	)
}

function FrameConcept() {
	return (
		<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta">
			body
		</Frame>
	)
}

function TextureConcept() {
	return (
		<div className="conceptGridThree">
			<Texture className="textureSample" variant="lattice" />
			<Texture className="textureSample" variant="dots" />
			<Texture className="textureSample" variant="lines" />
		</div>
	)
}

function BrandConcept() {
	return (
		<div className="brandGrid">
			<div>
				<ConceptLabel>Mark - ink on surface</ConceptLabel>
				<div className="brandSquare">
					<BrandMark className="brandMarkLarge" />
				</div>
			</div>
			<div>
				<ConceptLabel>Mark - inverse</ConceptLabel>
				<div className="brandSquare brandSquareInverse">
					<BrandMark className="brandMarkLarge" inverse />
				</div>
			</div>
			<div>
				<ConceptLabel>Wordmark</ConceptLabel>
				<div className="brandSquare">
					<Wordmark />
				</div>
			</div>
			<div>
				<ConceptLabel>Wordmark - inverse</ConceptLabel>
				<div className="brandSquare brandSquareInverse">
					<Wordmark className="brandWordmarkInverse" />
				</div>
			</div>
		</div>
	)
}

function WordmarkConcept() {
	return (
		<div className="wordmarkOnly">
			<Wordmark />
		</div>
	)
}

function IconConcept() {
	return (
		<div className="iconMiniGrid">
			{miniIconNames.map(name => (
				<span key={name}>
					<ConcreteIcon name={name} />
				</span>
			))}
		</div>
	)
}

function FocusConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Tokens - 3px flush ring</ConceptLabel>
			<div className="focusTokenGrid">
				<FocusToken className="focusTokenDefault" label="Default - sky" token="--ring" />
				<FocusToken className="focusTokenInk" label="Neutral - on light" token="--ring-ink" />
				<FocusToken className="focusTokenTerminal" label="Terminal" token="--ring-terminal" />
				<FocusToken className="focusTokenUltra" label="Ultra" token="--ring-ultra" />
				<FocusToken className="focusTokenError" label="Error" token="--ring-error" />
				<FocusToken className="focusTokenInvert" label="On dark" token="--ring-invert" />
			</div>
			<ConceptLabel>Live - tab through</ConceptLabel>
			<div className="conceptRow focusLiveRow">
				<Button className="focusVisibleDemo" variant="secondary">
					Secondary
				</Button>
				<Button variant="primary">Primary</Button>
				<Button variant="sky">Ship</Button>
				<Button variant="ultra">Upgrade</Button>
				<Button variant="danger">Delete</Button>
				<Input className="focusDemoInput" placeholder="Search..." />
			</div>
		</div>
	)
}

function FocusToken({
	className,
	label,
	token
}: {
	className: string
	label: string
	token: string
}) {
	return (
		<div className={`focusToken ${className}`}>
			<div>Aa</div>
			<code>{token}</code>
			<span>{label}</span>
		</div>
	)
}

function IndicatorConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Dots - series keys</ConceptLabel>
			<div className="indicatorGrid">
				<Indicator>Ink</Indicator>
				<Indicator tone="sky">Sky</Indicator>
				<Indicator tone="terminal">Terminal</Indicator>
				<Indicator tone="ultra">Ultra</Indicator>
				<Indicator tone="error">Error</Indicator>
				<Indicator tone="muted">Idle</Indicator>
			</div>
			<ConceptLabel>Rings - secondary series</ConceptLabel>
			<div className="indicatorGrid">
				<LegendKey shape="ring">Target</LegendKey>
				<LegendKey shape="ring" tone="sky">
					Benchmark
				</LegendKey>
				<LegendKey shape="ring" tone="terminal">
					Forecast
				</LegendKey>
				<LegendKey shape="ring" tone="error">
					Threshold
				</LegendKey>
			</div>
			<ConceptLabel>Line legend - series</ConceptLabel>
			<div className="indicatorLegendStack">
				<LegendKey shape="line" meta="this week">
					Observed
				</LegendKey>
				<LegendKey shape="line" meta="last week" tone="sky">
					Benchmark
				</LegendKey>
				<LegendKey shape="dash" meta="target">
					Expected
				</LegendKey>
				<LegendKey shape="dot" meta="projected">
					Forecast
				</LegendKey>
			</div>
			<ConceptLabel>Swatches - stacked / area</ConceptLabel>
			<div className="indicatorLegendStack">
				<LegendKey shape="swatch" meta="44%">
					Direct
				</LegendKey>
				<LegendKey shape="swatch" meta="26%" tone="sky">
					Referral
				</LegendKey>
				<LegendKey shape="swatch" meta="15%" tone="muted">
					Social
				</LegendKey>
			</div>
			<ConceptLabel>Bucket scale - heatmap</ConceptLabel>
			<div className="indicatorBucketRow">
				<span>Low</span>
				<div>
					<i />
					<i />
					<i />
					<i />
					<i />
				</div>
				<span>High</span>
				<code>0-20</code>
				<code>20-40</code>
				<code>40-60</code>
				<code>60-80</code>
				<code>80-100</code>
			</div>
		</div>
	)
}

function LegendKey({
	children,
	meta,
	shape,
	tone = 'default'
}: {
	children: ReactNode
	meta?: string
	shape: 'dash' | 'dot' | 'line' | 'ring' | 'swatch'
	tone?: 'default' | 'error' | 'muted' | 'sky' | 'terminal'
}) {
	return (
		<span className="legendKey">
			<i data-shape={shape} data-tone={tone} />
			<span>{children}</span>
			{meta ? <small>{meta}</small> : null}
		</span>
	)
}

function CaretConcept() {
	const [open, setOpen] = useState(true)

	return (
		<>
			<ConceptLabel>Disclosure - click</ConceptLabel>
			<button className="caretDemoRow" onClick={() => setOpen(!open)} type="button">
				<Caret open={open} />
				<span>Advanced settings</span>
				<code>{open ? 'open' : 'closed'}</code>
			</button>
			<ConceptLabel>Direction - size</ConceptLabel>
			<div className="conceptRow">
				<Caret />
				<Caret open />
				<Caret direction="down" />
				<Caret direction="up" size="large" />
			</div>
		</>
	)
}

function SpinnerConcept() {
	return (
		<div className="conceptRow">
			<Spinner size={14} />
			<Spinner size={18} tone="sky" />
			<span className="spinnerInverseDemo">
				<Spinner size={14} tone="inverse" />
			</span>
		</div>
	)
}

function ConceptLabel({ children }: { children: ReactNode }) {
	return <div className="conceptSubhead">{children}</div>
}

function SparkCell({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="sparkCell">
			<span>{title}</span>
			{children}
		</div>
	)
}

function RingCell({ caption, children }: { caption: ReactNode; children: ReactNode }) {
	return (
		<div className="ringCell">
			{children}
			<span>{caption}</span>
		</div>
	)
}

function SliderField({
	children,
	label,
	ticks,
	valueLabel
}: {
	children: ReactNode
	label: string
	ticks?: readonly string[]
	valueLabel: string
}) {
	return (
		<div className="sliderField">
			<div className="sliderFieldHead">
				<span>{label}</span>
				<code>{valueLabel}</code>
			</div>
			{children}
			{ticks ? (
				<div className="sliderTicks">
					{ticks.map(tick => (
						<span key={tick}>{tick}</span>
					))}
				</div>
			) : null}
		</div>
	)
}

type DemoSelectOption = {
	label: string
	shortcut?: readonly string[]
	value: string
}

function DemoSelect({ label, options }: { label: string; options: readonly DemoSelectOption[] }) {
	const [open, setOpen] = useState(label === 'Workspace')
	const [value, setValue] = useState(options[0]?.value ?? '')
	const selectedOption = options.find(option => option.value === value) ?? options[0]

	return (
		<div className="demoSelect">
			<span className="demoSelectLabel">{label}</span>
			<div className={open ? 'demoSelectWrap demoSelectOpen' : 'demoSelectWrap'}>
				<button
					aria-expanded={open}
					className={open ? 'demoSelectTrigger demoSelectTriggerOpen' : 'demoSelectTrigger'}
					onClick={() => setOpen(!open)}
					type="button"
				>
					<span>{selectedOption?.label}</span>
					<ConcreteIcon name="chevron-down" />
				</button>
				<div className="demoSelectMenu" role="listbox">
					{options.map(option => (
						<button
							aria-selected={option.value === value}
							className="demoSelectItem"
							key={option.value}
							onClick={() => {
								setValue(option.value)
								setOpen(false)
							}}
							role="option"
							type="button"
						>
							<ConcreteIcon name="check" />
							<span>{option.label}</span>
							{option.shortcut ? (
								<span className="demoSelectShortcut">
									{option.shortcut.map(shortcutKey => (
										<Kbd key={shortcutKey}>{shortcutKey === 'cmd' ? '⌘' : shortcutKey}</Kbd>
									))}
								</span>
							) : null}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

function MetricBar({
	children,
	label,
	value,
	valueSuffix = '%'
}: {
	children: ReactNode
	label: string
	value: number
	valueSuffix?: string
}) {
	return (
		<div className="metricBar">
			<span>{label}</span>
			{children}
			<code>{valueSuffix.length > 0 ? `${value} ${valueSuffix}`.trim() : '-'}</code>
		</div>
	)
}
