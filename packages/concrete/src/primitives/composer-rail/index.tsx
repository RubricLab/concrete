import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import type { ComposerValue } from '../../schemas'
import { ComposerRail } from './component'
import { composerRailExamples } from './examples'
import { composerRailMeta } from './meta'
import { type ComposerRailValue, composerRailSchema } from './schema'

export type { ComposerRailChipKind, ComposerRailChipProps, ComposerRailProps } from './component'
export { ComposerRail, ComposerRailChip } from './component'
export type { ComposerRailInput, ComposerRailValue } from './schema'
export { composerRailPropsSchema, composerRailSchema } from './schema'

export const composerRailPrimitiveDefinition = createPrimitive({
	...composerRailMeta,
	component: ComposerRail,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(composerRailExamples, state),
	renderInput: input => renderComposerRailInput(composerRailSchema.parse(input)),
	schema: composerRailSchema,
	slug: 'composer-rail',
	states: exampleStates(composerRailExamples, ['default', 'tokens', 'attachments'])
})

function renderComposerRailInput(input: ComposerRailValue) {
	const value: ComposerValue = {
		attachments: input.attachments
			? [{ id: 'brief', meta: 'PDF', name: input.attachmentLabel, type: 'application/pdf' }]
			: [],
		commands: input.command ? [{ id: 'command', kind: 'command', label: input.commandLabel }] : [],
		html: '',
		mentions: input.mention ? [{ id: 'mention', kind: 'mention', label: input.mentionLabel }] : [],
		text: ''
	}

	return <ComposerRail value={value} />
}
