import { prop } from '../../registry/props'

export const messageMeta = {
	category: 'surface',
	description:
		'Role-aware message wrapper with avatars, plain or bubble surfaces, metadata, and subtle action toolbars.',
	guidance:
		'Message keeps transcript structure portable: role, author, avatar, status, meta, surface, actions, and body. It does not own transport or persistence.',
	name: 'Message',
	pressure: ['generative', 'product'],
	props: [
		prop(
			'messageRole',
			"'assistant' | 'system' | 'tool' | 'user'",
			'Transcript role controlling alignment and tone.',
			'assistant'
		),
		prop(
			'surface',
			"'bubble' | 'plain'",
			'Bubble chat surface or stronger plain answer surface.',
			'bubble'
		),
		prop(
			'status',
			"'complete' | 'error' | 'pending' | 'streaming'",
			'Optional status badge for live or failed messages.',
			'complete'
		),
		prop('author', 'ReactNode', 'Author label shown above the bubble.'),
		prop('avatar', 'ReactNode', 'Custom avatar slot for multiplayer or multi-agent transcripts.'),
		prop('avatarInitials', 'string', 'Convenience initials for the built-in Avatar primitive.'),
		prop('avatarSrc', 'string', 'Convenience image source for the built-in Avatar primitive.'),
		prop('showAvatar', 'boolean', 'Forces built-in avatar rendering.', 'false'),
		prop('showStatus', 'boolean', 'Shows non-complete status badges.', 'true'),
		prop(
			'grouped',
			'boolean',
			'Tucks consecutive messages into a tighter transcript rhythm.',
			'false'
		),
		prop('meta', 'ReactNode', 'Timestamp or secondary metadata.'),
		prop('actions', 'ReactNode', 'Subtle toolbar-like action slot below the message body.'),
		prop('children', 'ReactNode', 'Message content.')
	]
} as const
