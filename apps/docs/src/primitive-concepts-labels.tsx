'use client'

import { Badge, Chip, Kbd, Pill } from '@rubriclab/concrete'
import { useState } from 'react'
import { ConceptLabel } from './primitive-concept-parts'

export function BadgeConcept() {
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

export function PillConcept() {
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

export function ChipConcept() {
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

export function KbdConcept() {
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
