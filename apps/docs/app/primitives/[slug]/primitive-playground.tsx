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
	ConceptConnector,
	ConceptFrame,
	Delta,
	DiagramItem,
	DiagramNode,
	Divider,
	EmptyState,
	Frame,
	Indicator,
	InlineCode,
	Input,
	Kbd,
	Pill,
	type PrimitiveRegistryEntry,
	type PrimitiveSlug,
	Progress,
	Radio,
	Row,
	renderPrimitiveExample,
	Select,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	booleanControl,
	type ControlDefinition,
	getIconName,
	getQueryBoolean,
	getQueryNumber,
	getQueryValue,
	getQueryValues,
	iconOptions,
	numberControl,
	PropControl,
	selectControl,
	selectOptionsControl,
	textControl
} from '@/playground-controls'

type PrimitivePlaygroundProps = {
	entry: PrimitiveRegistryEntry
}

export function PrimitivePlayground({ entry }: PrimitivePlaygroundProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const controls = getPlaygroundControls(entry)
	const stateValue = getQueryValue(searchParams, 'state', 'default')

	function updateQueryParameter(name: string, value: string, defaultValue: string) {
		const nextSearchParams = new URLSearchParams(searchParams.toString())

		if (value === defaultValue || value.length === 0) {
			nextSearchParams.delete(name)
		} else {
			nextSearchParams.set(name, value)
		}

		const queryString = nextSearchParams.toString()
		router.replace(queryString.length > 0 ? `${pathname}?${queryString}` : pathname, {
			scroll: false
		})
	}

	return (
		<div className="playgroundShell">
			<div className="playgroundPreview">{renderPlaygroundPrimitive(entry.slug, searchParams)}</div>
			<form className="playgroundControls">
				<PropControl
					control={{
						defaultValue: 'default',
						label: 'State',
						name: 'state',
						options: entry.states.map(state => ({
							label: state.name,
							value: state.query
						})),
						type: 'select'
					}}
					onChange={updateQueryParameter}
					value={stateValue}
				/>
				{controls.map(control => (
					<PropControl
						control={control}
						key={control.name}
						onChange={updateQueryParameter}
						value={getQueryValue(searchParams, control.name, control.defaultValue)}
					/>
				))}
			</form>
		</div>
	)
}

function getPlaygroundControls(entry: PrimitiveRegistryEntry): readonly ControlDefinition[] {
	switch (entry.slug) {
		case 'avatar':
			return [
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
				textControl('initials', 'Initials', 'AK')
			]
		case 'badge':
			return [
				selectControl('signal', 'Signal', 'terminal', ['terminal', 'ultra', 'error']),
				selectControl('variant', 'Variant', 'soft', ['soft', 'solid', 'ghost', 'count']),
				textControl('label', 'Label', 'Live')
			]
		case 'bubble':
			return [
				selectControl('direction', 'Direction', 'inbound', ['inbound', 'outbound']),
				textControl('text', 'Text', 'Concrete keeps conversational UI crisp.')
			]
		case 'button':
			return [
				selectControl('variant', 'Variant', 'secondary', [
					'primary',
					'secondary',
					'soft',
					'ghost',
					'sky',
					'sky-soft',
					'ultra',
					'danger'
				]),
				selectControl('size', 'Size', 'medium', ['tiny', 'small', 'medium', 'large']),
				selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
				selectOptionsControl('trailingIcon', 'Trailing icon', '', iconOptions),
				textControl('label', 'Label', 'Continue'),
				booleanControl('pressed', 'Pressed', 'false'),
				booleanControl('loading', 'Loading', 'false'),
				booleanControl('disabled', 'Disabled', 'false')
			]
		case 'card':
			return [
				selectControl('variant', 'Variant', 'default', ['default', 'raised', 'sunken']),
				booleanControl('interactive', 'Interactive', 'false'),
				textControl('title', 'Title', 'Default'),
				textControl('description', 'Description', 'Border only. The canonical surface.')
			]
		case 'caret':
			return [
				selectControl('direction', 'Direction', 'right', ['right', 'down', 'up']),
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
				booleanControl('open', 'Open', 'false')
			]
		case 'checkbox':
		case 'radio':
		case 'switch':
			return [
				booleanControl('checked', 'Checked', 'true'),
				booleanControl('disabled', 'Disabled', 'false'),
				textControl('label', 'Label', 'Selected')
			]
		case 'chip':
			return [
				booleanControl('selected', 'Selected', 'false'),
				selectControl('tone', 'Tone', 'default', ['default', 'ink', 'sky', 'sunken']),
				selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
				textControl('label', 'Label', 'Filter')
			]
		case 'code':
			return [
				textControl('code', 'Code', 'const signal = concreteSignalSchema.parse("terminal")'),
				selectControl('language', 'Language', 'TypeScript', ['TypeScript', 'HTML']),
				booleanControl('showLineNumbers', 'Line numbers', 'true')
			]
		case 'concept-frame':
			return [
				selectControl('kind', 'Kind', 'browser-window', [
					'browser-window',
					'model-card',
					'database-panel',
					'code-editor',
					'chart-frame',
					'assistant-response',
					'workflow-canvas',
					'mobile-screen'
				]),
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
				booleanControl('selected', 'Selected', 'false'),
				booleanControl('muted', 'Muted', 'false')
			]
		case 'concept-connector':
			return [
				selectControl('kind', 'Kind', 'straight', [
					'straight',
					'elbow',
					'curved',
					'dashed-relation',
					'bidirectional',
					'branch',
					'feedback-loop',
					'annotation-leader'
				]),
				selectControl('tone', 'Tone', 'muted', ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error']),
				booleanControl('selected', 'Selected', 'false'),
				booleanControl('muted', 'Muted', 'false')
			]
		case 'diagram-node':
			return [
				textControl('title', 'Title', 'Router'),
				textControl('meta', 'Meta', 'intent'),
				selectControl('role', 'Role', 'process', [
					'process',
					'compute',
					'data',
					'external',
					'decision',
					'boundary',
					'error'
				]),
				booleanControl('selected', 'Selected', 'false'),
				booleanControl('muted', 'Muted', 'false')
			]
		case 'diagram-item':
			return [
				textControl('title', 'Title', 'Trace'),
				textControl('value', 'Value', '184ms'),
				textControl('meta', 'Meta', 'p95'),
				selectControl('kind', 'Kind', 'metric', [
					'metric',
					'code',
					'status',
					'note',
					'chart',
					'table',
					'document',
					'card'
				]),
				selectControl('tone', 'Tone', 'ink', ['ink', 'muted', 'sky', 'terminal', 'ultra', 'error']),
				booleanControl('selected', 'Selected', 'false')
			]
		case 'delta':
			return [
				selectControl('intent', 'Intent', 'neutral', ['positive', 'negative', 'neutral']),
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large', 'xlarge']),
				selectControl('variant', 'Variant', 'bare', ['bare', 'wash']),
				textControl('value', 'Value', '18.6%'),
				textControl('basis', 'Basis', '')
			]
		case 'empty-state':
			return [
				textControl('title', 'Title', 'No matches'),
				textControl('body', 'Body', 'Try a broader keyword.'),
				selectOptionsControl('leadingIcon', 'Icon', 'search', iconOptions),
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
				selectControl('tone', 'Tone', 'default', ['default', 'sky'])
			]
		case 'frame':
			return [
				textControl('header', 'Header', 'Eyebrow'),
				textControl('headerMeta', 'Header meta', 'meta'),
				textControl('body', 'Body', 'body'),
				textControl('footer', 'Footer', 'Footer'),
				textControl('footerMeta', 'Footer meta', 'meta'),
				selectControl('texture', 'Texture', '', ['', 'lattice', 'dots', 'lines'])
			]
		case 'texture':
			return [selectControl('texture', 'Texture', 'lattice', ['lattice', 'dots', 'lines'])]
		case 'indicator':
			return [
				selectControl('tone', 'Tone', 'default', [
					'default',
					'muted',
					'sky',
					'terminal',
					'ultra',
					'error'
				]),
				textControl('label', 'Label', 'Running')
			]
		case 'input':
			return [
				textControl('label', 'Label', 'Email'),
				textControl('placeholder', 'Placeholder', 'you@rubric.bot'),
				textControl('value', 'Value', ''),
				selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
				textControl('error', 'Error', ''),
				booleanControl('disabled', 'Disabled', 'false')
			]
		case 'kbd':
			return [
				selectControl('tone', 'Tone', 'default', ['default', 'dark']),
				textControl('label', 'Key', '⌘')
			]
		case 'link':
			return [
				selectControl('tone', 'Tone', 'default', ['default', 'sky', 'muted']),
				selectControl('variant', 'Variant', 'inline', ['inline', 'nav']),
				booleanControl('external', 'External', 'false'),
				textControl('label', 'Label', 'Open research note')
			]
		case 'pill':
			return [
				selectControl('tone', 'Tone', 'default', [
					'default',
					'ink',
					'sky',
					'sunken',
					'terminal',
					'ultra',
					'error'
				]),
				selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
				textControl('label', 'Label', 'queued')
			]
		case 'progress':
			return [
				numberControl('value', 'Value', '62'),
				selectControl('tone', 'Tone', 'default', ['default', 'sky', 'terminal', 'ultra', 'error']),
				selectControl('size', 'Size', 'medium', ['thin', 'medium', 'thick']),
				selectControl('indeterminate', 'Indeterminate', '', ['', 'shuttle', 'lined'])
			]
		case 'row':
			return [
				selectOptionsControl('leadingIcon', 'Leading icon', 'file-text', iconOptions),
				textControl('label', 'Label', 'Research memo'),
				textControl('meta', 'Meta', 'edited'),
				booleanControl('interactive', 'Interactive', 'true')
			]
		case 'select':
			return [
				textControl('label', 'Label', 'Workspace'),
				selectControl('value', 'Value', 'rubric', ['rubric', 'concrete', 'research']),
				textControl('help', 'Help', '')
			]
		case 'skeleton':
			return [textControl('width', 'Width', '70%'), textControl('height', 'Height', '14')]
		case 'slider':
			return [
				numberControl('value', 'Value', '62'),
				numberControl('min', 'Min', '0'),
				numberControl('max', 'Max', '100'),
				selectControl('tone', 'Tone', 'default', ['default', 'sky'])
			]
		case 'sparkline':
			return [
				textControl('values', 'Values', '12,18,16,24,22,31,28,36'),
				selectControl('variant', 'Variant', 'line', ['line', 'bar', 'dot']),
				selectControl('tone', 'Tone', 'sky', ['sky', 'neutral', 'terminal', 'error']),
				booleanControl('area', 'Area', 'false'),
				booleanControl('showEndpoint', 'Endpoint', 'true')
			]
		case 'spinner':
			return [
				numberControl('size', 'Size', '18'),
				selectControl('tone', 'Tone', 'default', ['default', 'sky', 'inverse'])
			]
		case 'stat':
			return [
				textControl('label', 'Label', 'Runs'),
				textControl('value', 'Value', '14.8k'),
				textControl('unit', 'Unit', ''),
				selectControl('variant', 'Variant', 'lockup', ['lockup', 'numeric', 'display']),
				selectControl('size', 'Size', 'medium', ['xsmall', 'small', 'medium', 'large', 'xlarge']),
				selectControl('tone', 'Tone', 'default', ['default', 'muted', 'sky']),
				textControl('meta', 'Meta', 'last 7d')
			]
		case 'tag':
			return [
				selectControl('tone', 'Tone', 'default', [
					'default',
					'ink',
					'sky',
					'sunken',
					'terminal',
					'ultra',
					'error'
				]),
				selectControl('variant', 'Variant', 'default', ['default', 'outline', 'active', 'selected']),
				selectControl('size', 'Size', 'medium', ['small', 'medium', 'large']),
				selectOptionsControl('leadingIcon', 'Leading icon', '', iconOptions),
				booleanControl('dismissible', 'Dismissible', 'true'),
				textControl('label', 'Label', 'concrete')
			]
		case 'textarea':
			return [
				textControl('label', 'Label', 'Prompt'),
				textControl('placeholder', 'Placeholder', 'Describe the experiment...'),
				textControl('value', 'Value', ''),
				textControl('error', 'Error', '')
			]
		case 'tooltip':
			return [
				selectControl('placement', 'Placement', 'top', ['top', 'right', 'bottom', 'left']),
				booleanControl('forceOpen', 'Force open', 'true'),
				textControl('content', 'Content', 'Use one short sentence.')
			]
		default:
			return []
	}
}

function renderPlaygroundPrimitive(slug: PrimitiveSlug, searchParams: URLSearchParams) {
	const state = getQueryValue(searchParams, 'state', 'default')
	const leadingIcon = getIconName(searchParams, 'leadingIcon')
	const trailingIcon = getIconName(searchParams, 'trailingIcon')

	switch (slug) {
		case 'avatar':
			return (
				<Avatar
					initials={getQueryValue(searchParams, 'initials', 'AK')}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small'}
				/>
			)
		case 'badge':
			return (
				<Badge
					signal={getQueryValue(searchParams, 'signal', 'terminal') as 'error' | 'terminal' | 'ultra'}
					variant={
						getQueryValue(searchParams, 'variant', 'soft') as 'count' | 'ghost' | 'soft' | 'solid'
					}
				>
					{getQueryValue(searchParams, 'label', 'Live')}
				</Badge>
			)
		case 'bubble':
			return (
				<Bubble
					direction={getQueryValue(searchParams, 'direction', 'inbound') as 'inbound' | 'outbound'}
				>
					{getQueryValue(searchParams, 'text', 'Concrete keeps conversational UI crisp.')}
				</Bubble>
			)
		case 'button':
			return (
				<Button
					disabled={getQueryBoolean(searchParams, 'disabled', false)}
					loading={getQueryBoolean(searchParams, 'loading', false)}
					pressed={getQueryBoolean(searchParams, 'pressed', false)}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small' | 'tiny'}
					variant={
						getQueryValue(searchParams, 'variant', 'secondary') as
							| 'danger'
							| 'ghost'
							| 'primary'
							| 'secondary'
							| 'sky'
							| 'sky-soft'
							| 'soft'
							| 'ultra'
					}
					{...(leadingIcon ? { leadingIcon } : {})}
					{...(trailingIcon ? { trailingIcon } : {})}
				>
					{getQueryValue(searchParams, 'label', 'Continue')}
				</Button>
			)
		case 'card':
			return (
				<Card
					description={getQueryValue(searchParams, 'description', 'Border only. The canonical surface.')}
					interactive={getQueryBoolean(searchParams, 'interactive', false)}
					title={getQueryValue(searchParams, 'title', 'Default')}
					variant={getQueryValue(searchParams, 'variant', 'default') as 'default' | 'raised' | 'sunken'}
				/>
			)
		case 'caret':
			return (
				<Caret
					direction={getQueryValue(searchParams, 'direction', 'right') as 'down' | 'right' | 'up'}
					open={getQueryBoolean(searchParams, 'open', false)}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small'}
				/>
			)
		case 'checkbox':
			return (
				<Checkbox
					checked={getQueryBoolean(searchParams, 'checked', true)}
					disabled={getQueryBoolean(searchParams, 'disabled', false)}
					label={getQueryValue(searchParams, 'label', 'Selected')}
					readOnly
				/>
			)
		case 'chip':
			return (
				<Chip
					selected={getQueryBoolean(searchParams, 'selected', false)}
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'ink' | 'sky' | 'sunken'}
					{...(leadingIcon ? { leadingIcon } : {})}
				>
					{getQueryValue(searchParams, 'label', 'Filter')}
				</Chip>
			)
		case 'code':
			return (
				<Frame>
					<InlineCode>Concrete</InlineCode>
					<CodeBlock
						code={getQueryValue(
							searchParams,
							'code',
							'const signal = concreteSignalSchema.parse("terminal")'
						)}
						language={getQueryValue(searchParams, 'language', 'TypeScript')}
						showLineNumbers={getQueryBoolean(searchParams, 'showLineNumbers', true)}
					/>
				</Frame>
			)
		case 'concept-frame':
			return (
				<Frame>
					<ConceptFrame
						kind={
							getQueryValue(searchParams, 'kind', 'browser-window') as
								| 'ai-website'
								| 'api-card'
								| 'assistant-response'
								| 'browser-window'
								| 'chart-frame'
								| 'chat-interface'
								| 'code-editor'
								| 'dashboard-frame'
								| 'data-table'
								| 'database-panel'
								| 'document-page'
								| 'mobile-screen'
								| 'model-card'
								| 'stacked-windows'
								| 'terminal-window'
								| 'workflow-canvas'
						}
						muted={getQueryBoolean(searchParams, 'muted', false)}
						selected={getQueryBoolean(searchParams, 'selected', false)}
						size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small'}
					/>
				</Frame>
			)
		case 'concept-connector':
			return (
				<Frame>
					<ConceptConnector
						kind={
							getQueryValue(searchParams, 'kind', 'straight') as
								| 'annotation-leader'
								| 'bidirectional'
								| 'branch'
								| 'curved'
								| 'dashed-relation'
								| 'elbow'
								| 'feedback-loop'
								| 'straight'
						}
						muted={getQueryBoolean(searchParams, 'muted', false)}
						selected={getQueryBoolean(searchParams, 'selected', false)}
						tone={
							getQueryValue(searchParams, 'tone', 'muted') as
								| 'error'
								| 'ink'
								| 'muted'
								| 'sky'
								| 'terminal'
								| 'ultra'
						}
					/>
				</Frame>
			)
		case 'diagram-node':
			return (
				<Frame>
					<div style={{ width: 220 }}>
						<DiagramNode
							meta={getQueryValue(searchParams, 'meta', 'intent')}
							muted={getQueryBoolean(searchParams, 'muted', false)}
							role={
								getQueryValue(searchParams, 'role', 'process') as
									| 'boundary'
									| 'compute'
									| 'data'
									| 'decision'
									| 'error'
									| 'external'
									| 'process'
							}
							selected={getQueryBoolean(searchParams, 'selected', false)}
							title={getQueryValue(searchParams, 'title', 'Router')}
						/>
					</div>
				</Frame>
			)
		case 'diagram-item':
			return (
				<Frame>
					<div style={{ width: 170 }}>
						<DiagramItem
							kind={
								getQueryValue(searchParams, 'kind', 'metric') as
									| 'card'
									| 'chart'
									| 'code'
									| 'document'
									| 'metric'
									| 'note'
									| 'status'
									| 'table'
							}
							meta={getQueryValue(searchParams, 'meta', 'p95')}
							selected={getQueryBoolean(searchParams, 'selected', false)}
							title={getQueryValue(searchParams, 'title', 'Trace')}
							tone={
								getQueryValue(searchParams, 'tone', 'ink') as
									| 'error'
									| 'ink'
									| 'muted'
									| 'sky'
									| 'terminal'
									| 'ultra'
							}
							value={getQueryValue(searchParams, 'value', '184ms') || undefined}
						/>
					</div>
				</Frame>
			)
		case 'delta':
			return (
				<Delta
					basis={getQueryValue(searchParams, 'basis', '') || undefined}
					intent={
						getQueryValue(searchParams, 'intent', 'neutral') as 'negative' | 'neutral' | 'positive'
					}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small' | 'xlarge'}
					value={getQueryValue(searchParams, 'value', '18.6%')}
					variant={getQueryValue(searchParams, 'variant', 'bare') as 'bare' | 'wash'}
				/>
			)
		case 'distribution':
			return renderPrimitiveExample(slug, state)
		case 'divider':
			return <Divider label={getQueryValue(searchParams, 'label', 'Section')} />
		case 'empty-state':
			return (
				<EmptyState
					body={getQueryValue(searchParams, 'body', 'Try a broader keyword.')}
					icon={leadingIcon ?? 'search'}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small'}
					title={getQueryValue(searchParams, 'title', 'No matches')}
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'sky'}
				/>
			)
		case 'focus-ring':
			return (
				<Button autoFocus variant="secondary">
					Focused
				</Button>
			)
		case 'frame': {
			const texture = getQueryValue(searchParams, 'texture', '')
			return (
				<Frame
					footer={getQueryValue(searchParams, 'footer', 'Footer') || undefined}
					footerMeta={getQueryValue(searchParams, 'footerMeta', 'meta') || undefined}
					header={getQueryValue(searchParams, 'header', 'Eyebrow') || undefined}
					headerMeta={getQueryValue(searchParams, 'headerMeta', 'meta') || undefined}
					{...(texture ? { texture: texture as 'dots' | 'lattice' | 'lines' } : {})}
				>
					{getQueryValue(searchParams, 'body', 'body')}
				</Frame>
			)
		}
		case 'icon':
			return <Button iconOnly leadingIcon={leadingIcon ?? 'search'} />
		case 'indicator':
			return (
				<Indicator
					tone={
						getQueryValue(searchParams, 'tone', 'default') as
							| 'default'
							| 'error'
							| 'muted'
							| 'sky'
							| 'terminal'
							| 'ultra'
					}
				>
					{getQueryValue(searchParams, 'label', 'Running')}
				</Indicator>
			)
		case 'input':
			return (
				<Input
					defaultValue={getQueryValue(searchParams, 'value', '')}
					disabled={getQueryBoolean(searchParams, 'disabled', false)}
					error={getQueryValue(searchParams, 'error', '') || undefined}
					label={getQueryValue(searchParams, 'label', 'Email')}
					placeholder={getQueryValue(searchParams, 'placeholder', 'you@rubric.bot')}
					{...(leadingIcon ? { leadingIcon } : {})}
				/>
			)
		case 'kbd':
			return (
				<Kbd tone={getQueryValue(searchParams, 'tone', 'default') as 'dark' | 'default'}>
					{getQueryValue(searchParams, 'label', '⌘')}
				</Kbd>
			)
		case 'link':
			return (
				<TextLink
					external={getQueryBoolean(searchParams, 'external', false)}
					href="#"
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'muted' | 'sky'}
					variant={getQueryValue(searchParams, 'variant', 'inline') as 'inline' | 'nav'}
				>
					{getQueryValue(searchParams, 'label', 'Open research note')}
				</TextLink>
			)
		case 'pill':
			return (
				<Pill
					tone={
						getQueryValue(searchParams, 'tone', 'default') as
							| 'default'
							| 'error'
							| 'ink'
							| 'sky'
							| 'sunken'
							| 'terminal'
							| 'ultra'
					}
					{...(leadingIcon ? { leadingIcon } : {})}
				>
					{getQueryValue(searchParams, 'label', 'queued')}
				</Pill>
			)
		case 'progress': {
			const indeterminate = getQueryValue(searchParams, 'indeterminate', '')
			return (
				<Progress
					size={getQueryValue(searchParams, 'size', 'medium') as 'medium' | 'thick' | 'thin'}
					tone={
						getQueryValue(searchParams, 'tone', 'default') as
							| 'default'
							| 'error'
							| 'sky'
							| 'terminal'
							| 'ultra'
					}
					value={getQueryNumber(searchParams, 'value', 62)}
					{...(indeterminate === '' ? {} : { indeterminate: indeterminate as 'lined' | 'shuttle' })}
				/>
			)
		}
		case 'radio':
			return (
				<Radio
					checked={getQueryBoolean(searchParams, 'checked', true)}
					disabled={getQueryBoolean(searchParams, 'disabled', false)}
					label={getQueryValue(searchParams, 'label', 'Selected')}
					readOnly
				/>
			)
		case 'row':
			return (
				<Row
					interactive={getQueryBoolean(searchParams, 'interactive', true)}
					leadingIcon={leadingIcon ?? 'file-text'}
					meta={getQueryValue(searchParams, 'meta', 'edited')}
				>
					{getQueryValue(searchParams, 'label', 'Research memo')}
				</Row>
			)
		case 'select':
			return (
				<Select
					help={getQueryValue(searchParams, 'help', '') || undefined}
					label={getQueryValue(searchParams, 'label', 'Workspace')}
					options={[
						{ label: 'Rubric Labs', value: 'rubric' },
						{ label: 'Concrete', value: 'concrete' },
						{ label: 'Research', value: 'research' }
					]}
					value={getQueryValue(searchParams, 'value', 'rubric')}
				/>
			)
		case 'skeleton':
			return (
				<Skeleton
					height={getQueryValue(searchParams, 'height', '14')}
					width={getQueryValue(searchParams, 'width', '70%')}
				/>
			)
		case 'slider':
			return (
				<Slider
					max={getQueryNumber(searchParams, 'max', 100)}
					min={getQueryNumber(searchParams, 'min', 0)}
					readOnly
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'sky'}
					value={getQueryNumber(searchParams, 'value', 62)}
				/>
			)
		case 'sparkline':
			return (
				<Sparkline
					area={getQueryBoolean(searchParams, 'area', false)}
					showEndpoint={getQueryBoolean(searchParams, 'showEndpoint', true)}
					tone={getQueryValue(searchParams, 'tone', 'sky') as 'error' | 'neutral' | 'sky' | 'terminal'}
					values={getQueryValues(searchParams, 'values', [12, 18, 16, 24, 22, 31, 28, 36])}
					variant={getQueryValue(searchParams, 'variant', 'line') as 'bar' | 'dot' | 'line'}
				/>
			)
		case 'spinner':
			return (
				<Spinner
					size={getQueryNumber(searchParams, 'size', 18)}
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'inverse' | 'sky'}
				/>
			)
		case 'stat':
			return (
				<Stat
					label={getQueryValue(searchParams, 'label', 'Runs')}
					meta={getQueryValue(searchParams, 'meta', 'last 7d')}
					size={
						getQueryValue(searchParams, 'size', 'medium') as
							| 'large'
							| 'medium'
							| 'small'
							| 'xlarge'
							| 'xsmall'
					}
					tone={getQueryValue(searchParams, 'tone', 'default') as 'default' | 'muted' | 'sky'}
					unit={getQueryValue(searchParams, 'unit', '') || undefined}
					value={getQueryValue(searchParams, 'value', '14.8k')}
					variant={getQueryValue(searchParams, 'variant', 'lockup') as 'display' | 'lockup' | 'numeric'}
				/>
			)
		case 'switch':
			return (
				<Switch
					checked={getQueryBoolean(searchParams, 'checked', true)}
					disabled={getQueryBoolean(searchParams, 'disabled', false)}
					label={getQueryValue(searchParams, 'label', 'Selected')}
					readOnly
				/>
			)
		case 'tag':
			return (
				<Tag
					dismissible={getQueryBoolean(searchParams, 'dismissible', true)}
					size={getQueryValue(searchParams, 'size', 'medium') as 'large' | 'medium' | 'small'}
					tone={
						getQueryValue(searchParams, 'tone', 'default') as
							| 'default'
							| 'error'
							| 'ink'
							| 'sky'
							| 'sunken'
							| 'terminal'
							| 'ultra'
					}
					variant={
						getQueryValue(searchParams, 'variant', 'default') as
							| 'active'
							| 'default'
							| 'outline'
							| 'selected'
					}
					{...(leadingIcon ? { leadingIcon } : {})}
				>
					{getQueryValue(searchParams, 'label', 'concrete')}
				</Tag>
			)
		case 'textarea':
			return (
				<Textarea
					defaultValue={getQueryValue(searchParams, 'value', '')}
					error={getQueryValue(searchParams, 'error', '') || undefined}
					label={getQueryValue(searchParams, 'label', 'Prompt')}
					placeholder={getQueryValue(searchParams, 'placeholder', 'Describe the experiment...')}
				/>
			)
		case 'texture':
			return (
				<Texture
					style={{ height: 120, width: '100%' }}
					variant={getQueryValue(searchParams, 'texture', 'lattice') as 'dots' | 'lattice' | 'lines'}
				/>
			)
		case 'tooltip':
			return (
				<Tooltip
					content={getQueryValue(searchParams, 'content', 'Use one short sentence.')}
					forceOpen={getQueryBoolean(searchParams, 'forceOpen', true)}
					placement={
						getQueryValue(searchParams, 'placement', 'top') as 'bottom' | 'left' | 'right' | 'top'
					}
				>
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
			)
		case 'wordmark':
			return <Wordmark />
		case 'brand-mark':
			return <BrandMark inverse={getQueryBoolean(searchParams, 'inverse', false)} />
		default:
			return renderPrimitiveExample(slug, state)
	}
}
