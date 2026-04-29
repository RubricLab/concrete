'use client'

import { type PrimitiveSlug, renderPrimitiveExample } from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import {
	ButtonConcept,
	CaretConcept,
	CheckboxConcept,
	InputConcept,
	LinkConcept,
	RadioConcept,
	SelectConcept,
	SliderConcept,
	SpinnerConcept,
	SwitchConcept,
	TagConcept,
	TextareaConcept
} from './primitive-concepts-controls'
import {
	DeltaConcept,
	DistributionConcept,
	IndicatorConcept,
	ProgressConcept,
	SkeletonConcept,
	SparklineConcept,
	StatConcept
} from './primitive-concepts-data'
import { BadgeConcept, ChipConcept, KbdConcept, PillConcept } from './primitive-concepts-labels'
import {
	AvatarConcept,
	BrandConcept,
	BubbleConcept,
	CardConcept,
	CodeConcept,
	DividerConcept,
	EmptyStateConcept,
	FocusConcept,
	FrameConcept,
	IconConcept,
	RowConcept,
	TextureConcept,
	TooltipConcept,
	WordmarkConcept
} from './primitive-concepts-surfaces'

const primitiveConceptRenderers: Partial<Record<PrimitiveSlug, () => ReactNode>> = {
	avatar: AvatarConcept,
	badge: BadgeConcept,
	'brand-mark': BrandConcept,
	bubble: BubbleConcept,
	button: ButtonConcept,
	card: CardConcept,
	caret: CaretConcept,
	checkbox: CheckboxConcept,
	chip: ChipConcept,
	code: CodeConcept,
	delta: DeltaConcept,
	distribution: DistributionConcept,
	divider: DividerConcept,
	'empty-state': EmptyStateConcept,
	'focus-ring': FocusConcept,
	frame: FrameConcept,
	icon: IconConcept,
	indicator: IndicatorConcept,
	input: InputConcept,
	kbd: KbdConcept,
	link: LinkConcept,
	pill: PillConcept,
	progress: ProgressConcept,
	radio: RadioConcept,
	row: RowConcept,
	select: SelectConcept,
	skeleton: SkeletonConcept,
	slider: SliderConcept,
	sparkline: SparklineConcept,
	spinner: SpinnerConcept,
	stat: StatConcept,
	switch: SwitchConcept,
	tag: TagConcept,
	textarea: TextareaConcept,
	texture: TextureConcept,
	tooltip: TooltipConcept,
	wordmark: WordmarkConcept
}

export function renderPrimitiveConcept(slug: PrimitiveSlug): ReactNode {
	const Concept = primitiveConceptRenderers[slug]

	if (Concept) {
		return <Concept />
	}

	return <div className="conceptStage">{renderPrimitiveExample(slug)}</div>
}
