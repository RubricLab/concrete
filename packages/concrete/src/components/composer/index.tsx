import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import type { ComposerValue } from '../../schemas'
import { Composer } from './component'
import { composerExamples } from './examples'
import { composerMeta } from './meta'
import { type ComposerComponentValue, composerComponentSchema } from './schema'

export type {
	ComposerAttachment,
	ComposerFormat,
	ComposerSuggestion,
	ComposerSuggestionKind,
	ComposerToken,
	ComposerValue
} from '../../schemas'
export type { ComposerProps } from './component'
export { Composer } from './component'
export type { ComposerComponentValue, ComposerInput } from './schema'
export { composerComponentSchema } from './schema'

const composerSeedValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const composerComponentDefinition = createComponent({
	...composerMeta,
	component: Composer,
	kind: 'component',
	renderExample: (state?: string) => renderExample(composerExamples, state),
	renderInput: input => renderComposerInput(composerComponentSchema.parse(input)),
	schema: composerComponentSchema,
	seed: composerComponentSchema.parse({ defaultValue: composerSeedValue }),
	slug: 'composer',
	states: exampleStates(composerExamples, [
		'default',
		'empty',
		'mention',
		'command',
		'formatting',
		'disabled'
	])
})

function renderComposerInput(input: ComposerComponentValue) {
	const { commandOptions, defaultMenuKind, defaultValue, mentionOptions, value, ...props } = input
	const composerValue = defaultValue ?? value

	return (
		<Composer
			{...props}
			{...(commandOptions.length > 0 ? { commandOptions } : {})}
			{...(defaultMenuKind ? { defaultMenuKind } : {})}
			{...(composerValue ? { defaultValue: composerValue } : {})}
			{...(mentionOptions.length > 0 ? { mentionOptions } : {})}
		/>
	)
}
