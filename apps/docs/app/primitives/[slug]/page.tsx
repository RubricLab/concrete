import type { PrimitiveSlug } from '@rubriclab/concrete'
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
	Delta,
	Distribution,
	Divider,
	EmptyState,
	Frame,
	Icon,
	Indicator,
	Input,
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
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

const primitiveSlugs = new Set<PrimitiveSlug>(primitiveRegistry.map(primitive => primitive.slug))

export function generateStaticParams() {
	return primitiveRegistry.map(primitive => ({ slug: primitive.slug }))
}

export default async function PrimitivePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	if (!primitiveSlugs.has(slug as PrimitiveSlug)) {
		notFound()
	}

	const primitive = primitiveRegistry.find(record => record.slug === slug)

	if (!primitive) {
		notFound()
	}

	return (
		<main>
			<section className="docs-section">
				<header className="docs-chapter-header">
					<div>
						<span>PR</span>
						<strong>{primitive.role}</strong>
					</div>
					<em>package export</em>
					<h2>{primitive.name}</h2>
				</header>
				<div className="docs-primitive-detail">
					<Card padding="lg">
						<p className="docs-lead">{primitive.description}</p>
						<a className="docs-back-link" href="/#primitives">
							Back to primitives
						</a>
					</Card>
					<Frame title="Live primitive">
						<div className="docs-primitive-detail__stage">{renderPrimitiveExample(primitive.slug)}</div>
					</Frame>
				</div>
			</section>
		</main>
	)
}

function renderPrimitiveExample(slug: PrimitiveSlug): ReactNode {
	switch (slug) {
		case 'button':
			return (
				<Button leadingIcon="sparkles" tone="sky">
					Run analysis
				</Button>
			)
		case 'input':
			return <Input aria-label="Search datasets" placeholder="Search datasets" />
		case 'textarea':
			return <Textarea aria-label="Prompt" placeholder="Summarize the run..." rows={3} />
		case 'select':
			return (
				<Select aria-label="Environment" defaultValue="production">
					<option value="production">Production</option>
					<option value="preview">Preview</option>
				</Select>
			)
		case 'checkbox':
			return <Checkbox checked label="Include archived" readOnly />
		case 'radio':
			return <Radio checked label="Production" readOnly />
		case 'switch':
			return <Switch checked label="Enabled" readOnly />
		case 'slider':
			return <Slider aria-label="Density" defaultValue={64} />
		case 'chip':
			return (
				<Chip leadingIcon="check" selected tone="sky">
					Healthy
				</Chip>
			)
		case 'pill':
			return <Pill tone="sky">Beta</Pill>
		case 'tag':
			return <Tag>owner: labs</Tag>
		case 'badge':
			return <Badge tone="terminal">Running</Badge>
		case 'indicator':
			return <Indicator label="Live" />
		case 'delta':
			return <Delta value="18.6%" />
		case 'card':
			return (
				<Card className="docs-mini-card" padding="sm" variant="raised">
					<strong>Run 42</strong>
					<span>Complete</span>
				</Card>
			)
		case 'frame':
			return (
				<Frame eyebrow="FIG" footer="source: package" title="Frame">
					<Sparkline />
				</Frame>
			)
		case 'row':
			return (
				<Row
					description="prod-us-east"
					label="Web app"
					leading={<Icon name="database" />}
					trailing={<Badge tone="terminal">Healthy</Badge>}
				/>
			)
		case 'divider':
			return <Divider />
		case 'bubble':
			return <Bubble>Conversion increased 18% in Q2.</Bubble>
		case 'stat':
			return <Stat helper="+4.2%" label="Conversion" value="18%" />
		case 'sparkline':
			return <Sparkline />
		case 'avatar':
			return <Avatar initials="RL" size="lg" />
		case 'progress':
			return <Progress value={72} />
		case 'spinner':
			return <Spinner />
		case 'distribution':
			return <Distribution />
		case 'skeleton':
			return (
				<div className="docs-skeleton-stack">
					<Skeleton width="84%" />
					<Skeleton width="62%" />
					<Skeleton width="72%" />
				</div>
			)
		case 'tooltip':
			return (
				<Tooltip content="Inspect source">
					<Button size="sm" variant="outline">
						Hover
					</Button>
				</Tooltip>
			)
		case 'link':
			return <Link href="/#api">Open API</Link>
		case 'code':
			return <Code>bun run build</Code>
		case 'kbd':
			return <Kbd>Cmd K</Kbd>
		case 'icon':
			return <Icon name="activity" size={24} />
		case 'caret':
			return <Caret />
		case 'scrollbar':
			return <Scrollbar items={['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']} />
		case 'empty-state':
			return <EmptyState description="Start with a source or generated run." title="No runs yet" />
	}
}
