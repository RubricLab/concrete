import type { ReactNode } from 'react'
import type { IconName } from './names'

export function getIconBodyRtoZ(iconName: IconName): ReactNode | undefined {
	switch (iconName) {
		case 'refresh-ccw':
			return (
				<>
					<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
					<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
					<path d="M16 16h5v5" />
				</>
			)
		case 'search':
			return (
				<>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</>
			)
		case 'send-horizontal':
			return (
				<>
					<path d="m3 3 3 9-3 9 19-9Z" />
					<path d="M6 12h16" />
				</>
			)
		case 'settings':
			return (
				<>
					<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
					<circle cx="12" cy="12" r="3" />
				</>
			)
		case 'share-2':
			return (
				<>
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
					<line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
				</>
			)
		case 'slash':
			return <path d="M22 2 2 22" />
		case 'sliders-horizontal':
			return (
				<>
					<line x1="21" x2="14" y1="4" y2="4" />
					<line x1="10" x2="3" y1="4" y2="4" />
					<line x1="21" x2="12" y1="12" y2="12" />
					<line x1="8" x2="3" y1="12" y2="12" />
					<line x1="21" x2="16" y1="20" y2="20" />
					<line x1="12" x2="3" y1="20" y2="20" />
					<line x1="14" x2="14" y1="2" y2="6" />
					<line x1="8" x2="8" y1="10" y2="14" />
					<line x1="16" x2="16" y1="18" y2="22" />
				</>
			)
		case 'smile':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<path d="M8 14s1.5 2 4 2 4-2 4-2" />
					<line x1="9" x2="9.01" y1="9" y2="9" />
					<line x1="15" x2="15.01" y1="9" y2="9" />
				</>
			)
		case 'sparkles':
			return (
				<>
					<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
					<path d="M20 3v4" />
					<path d="M22 5h-4" />
					<path d="M4 17v2" />
					<path d="M5 18H3" />
				</>
			)
		case 'square':
			return <rect width="18" height="18" x="3" y="3" rx="2" />
		case 'star':
			return (
				<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
			)
		case 'sun':
			return (
				<>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</>
			)
		case 'tag':
			return (
				<>
					<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
					<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
				</>
			)
		case 'terminal':
			return (
				<>
					<polyline points="4 17 10 11 4 5" />
					<line x1="12" x2="20" y1="19" y2="19" />
				</>
			)
		case 'thumbs-down':
			return (
				<>
					<path d="M17 14V2" />
					<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
				</>
			)
		case 'thumbs-up':
			return (
				<>
					<path d="M7 10v12" />
					<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
				</>
			)
		case 'trash-2':
			return (
				<>
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" x2="10" y1="11" y2="17" />
					<line x1="14" x2="14" y1="11" y2="17" />
				</>
			)
		case 'triangle-alert':
			return (
				<>
					<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
				</>
			)
		case 'unlock':
			return (
				<>
					<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 9.9-1" />
				</>
			)
		case 'upload':
			return (
				<>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="17 8 12 3 7 8" />
					<line x1="12" x2="12" y1="3" y2="15" />
				</>
			)
		case 'user':
			return (
				<>
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</>
			)
		case 'users':
			return (
				<>
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</>
			)
		case 'x':
			return (
				<>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</>
			)
		case 'zap':
			return (
				<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
			)
	}

	return undefined
}
