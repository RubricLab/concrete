import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ComposerRailMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const composerRailMeta = {
	category: 'control',
	description:
		'Compact composer token rail for mentions, slash commands, attachments, and inline tokens.',
	guidance:
		'Use ComposerRail inside rich composer shells to expose committed context. Inline contenteditable token serialization remains workflow-owned, but token chrome and rail chips belong here.',
	name: 'Composer Rail',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'ComposerValue', 'Composer value containing mentions, commands, and attachments.'),
		prop(
			'onTokenRemove',
			'(token: ComposerToken) => void',
			'Removes committed mention or command tokens.'
		),
		prop(
			'onAttachmentRemove',
			'(attachment: ComposerAttachment) => void',
			'Removes committed attachment tokens.'
		)
	]
} as const satisfies ComposerRailMeta
