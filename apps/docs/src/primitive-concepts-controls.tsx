'use client'

import {
	Button,
	Caret,
	Checkbox,
	Input,
	Radio,
	Slider,
	Spinner,
	Switch,
	Tag,
	Textarea,
	TextLink
} from '@rubriclab/concrete'
import { type CSSProperties, useState } from 'react'
import { ConceptLabel, DemoSelect, SliderField } from './primitive-concept-parts'

export function ButtonConcept() {
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

export function InputConcept() {
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

export function LinkConcept() {
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

export function TagConcept() {
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

export function CheckboxConcept() {
	return <ChoiceConcept kind="checkbox" />
}

export function RadioConcept() {
	return <ChoiceConcept kind="radio" />
}

export function SwitchConcept() {
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

export function TextareaConcept() {
	return (
		<div className="conceptStack conceptStackWide">
			<Textarea label="Prompt" placeholder="Describe the experiment..." />
			<Textarea defaultValue="A denser writing surface for generated notes." label="Filled" />
			<Textarea error="Prompt is required." label="Error" />
		</div>
	)
}

export function SelectConcept() {
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

export function SliderConcept() {
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

export function CaretConcept() {
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

export function SpinnerConcept() {
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
