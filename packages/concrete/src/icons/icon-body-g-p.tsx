import type { ReactNode } from 'react'
import type { IconName } from './names'

export function getIconBodyGtoP(iconName: IconName): ReactNode | undefined {
	switch (iconName) {
		case 'git-branch':
			return (
				<>
					<line x1="6" x2="6" y1="3" y2="15" />
					<circle cx="18" cy="6" r="3" />
					<circle cx="6" cy="18" r="3" />
					<path d="M18 9a9 9 0 0 1-9 9" />
				</>
			)
		case 'git-pull-request':
			return (
				<>
					<circle cx="18" cy="18" r="3" />
					<circle cx="6" cy="6" r="3" />
					<path d="M13 6h3a2 2 0 0 1 2 2v7" />
					<line x1="6" x2="6" y1="9" y2="21" />
				</>
			)
		case 'hash':
			return (
				<>
					<line x1="4" x2="20" y1="9" y2="9" />
					<line x1="4" x2="20" y1="15" y2="15" />
					<line x1="10" x2="8" y1="3" y2="21" />
					<line x1="16" x2="14" y1="3" y2="21" />
				</>
			)
		case 'heart':
			return (
				<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
			)
		case 'home':
			return (
				<>
					<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
					<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
				</>
			)
		case 'image':
			return (
				<>
					<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
					<circle cx="9" cy="9" r="2" />
					<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
				</>
			)
		case 'inbox':
			return (
				<>
					<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
					<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
				</>
			)
		case 'info':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 16v-4" />
					<path d="M12 8h.01" />
				</>
			)
		case 'link':
			return (
				<>
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</>
			)
		case 'lock':
			return (
				<>
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</>
			)
		case 'message-circle':
			return <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		case 'message-square':
			return <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		case 'minus':
			return <path d="M5 12h14" />
		case 'moon':
			return <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		case 'more-horizontal':
			return (
				<>
					<circle cx="12" cy="12" r="1" />
					<circle cx="19" cy="12" r="1" />
					<circle cx="5" cy="12" r="1" />
				</>
			)
		case 'more-vertical':
			return (
				<>
					<circle cx="12" cy="12" r="1" />
					<circle cx="12" cy="5" r="1" />
					<circle cx="12" cy="19" r="1" />
				</>
			)
		case 'panel-left':
			return (
				<>
					<rect width="18" height="18" x="3" y="3" rx="2" />
					<path d="M9 3v18" />
				</>
			)
		case 'panel-right':
			return (
				<>
					<rect width="18" height="18" x="3" y="3" rx="2" />
					<path d="M15 3v18" />
				</>
			)
		case 'paperclip':
			return (
				<>
					<path d="M13.234 20.252 21 12.3" />
					<path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
				</>
			)
		case 'pause':
			return (
				<>
					<rect x="14" y="4" width="4" height="16" rx="1" />
					<rect x="6" y="4" width="4" height="16" rx="1" />
				</>
			)
		case 'pencil':
			return (
				<>
					<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
					<path d="m15 5 4 4" />
				</>
			)
		case 'pie-chart':
			return (
				<>
					<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
					<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
				</>
			)
		case 'play':
			return <polygon points="6 3 20 12 6 21 6 3" />
		case 'plus':
			return (
				<>
					<path d="M5 12h14" />
					<path d="M12 5v14" />
				</>
			)
	}

	return undefined
}
