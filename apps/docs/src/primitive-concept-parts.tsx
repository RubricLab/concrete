'use client'

import { ConcreteIcon, Kbd } from '@rubriclab/concrete'
import { type ReactNode, useState } from 'react'

export function ConceptLabel({ children }: { children: ReactNode }) {
	return <div className="conceptSubhead">{children}</div>
}

export function SparkCell({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="sparkCell">
			<span>{title}</span>
			{children}
		</div>
	)
}

export function RingCell({ caption, children }: { caption: ReactNode; children: ReactNode }) {
	return (
		<div className="ringCell">
			{children}
			<span>{caption}</span>
		</div>
	)
}

export function SliderField({
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

export function DemoSelect({
	label,
	options
}: {
	label: string
	options: readonly DemoSelectOption[]
}) {
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

export function MetricBar({
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
