import type { ReactNode } from 'react'
import type { IconName } from './names'

export function getIconBodyAtoF(iconName: IconName): ReactNode | undefined {
	switch (iconName) {
		case 'activity':
			return (
				<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
			)
		case 'arrow-down':
			return (
				<>
					<path d="M12 5v14" />
					<path d="m19 12-7 7-7-7" />
				</>
			)
		case 'arrow-left':
			return (
				<>
					<path d="m12 19-7-7 7-7" />
					<path d="M19 12H5" />
				</>
			)
		case 'arrow-right':
			return (
				<>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</>
			)
		case 'arrow-up':
			return (
				<>
					<path d="m5 12 7-7 7 7" />
					<path d="M12 19V5" />
				</>
			)
		case 'at-sign':
			return (
				<>
					<circle cx="12" cy="12" r="4" />
					<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
				</>
			)
		case 'bar-chart-3':
			return (
				<>
					<path d="M3 3v16a2 2 0 0 0 2 2h16" />
					<path d="M7 16h8" />
					<path d="M7 11h12" />
					<path d="M7 6h3" />
				</>
			)
		case 'bell':
			return (
				<>
					<path d="M10.268 21a2 2 0 0 0 3.464 0" />
					<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
				</>
			)
		case 'book-open':
			return (
				<>
					<path d="M12 7v14" />
					<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
				</>
			)
		case 'bookmark':
			return <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
		case 'calendar':
			return (
				<>
					<path d="M8 2v4" />
					<path d="M16 2v4" />
					<rect width="18" height="18" x="3" y="4" rx="2" />
					<path d="M3 10h18" />
				</>
			)
		case 'check':
			return <path d="M20 6 9 17l-5-5" />
		case 'chevron-down':
			return <path d="m6 9 6 6 6-6" />
		case 'chevron-left':
			return <path d="m15 18-6-6 6-6" />
		case 'chevron-right':
			return <path d="m9 18 6-6-6-6" />
		case 'chevron-up':
			return <path d="m18 15-6-6-6 6" />
		case 'chevrons-up-down':
			return (
				<>
					<path d="m7 15 5 5 5-5" />
					<path d="m7 9 5-5 5 5" />
				</>
			)
		case 'circle-alert':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" x2="12" y1="8" y2="12" />
					<line x1="12" x2="12.01" y1="16" y2="16" />
				</>
			)
		case 'circle-check':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<path d="m9 12 2 2 4-4" />
				</>
			)
		case 'circle-help':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
					<path d="M12 17h.01" />
				</>
			)
		case 'circle':
			return <circle cx="12" cy="12" r="10" />
		case 'clock':
			return (
				<>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</>
			)
		case 'code':
			return (
				<>
					<polyline points="16 18 22 12 16 6" />
					<polyline points="8 6 2 12 8 18" />
				</>
			)
		case 'command':
			return <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
		case 'copy':
			return (
				<>
					<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
					<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
				</>
			)
		case 'corner-down-left':
			return (
				<>
					<polyline points="9 10 4 15 9 20" />
					<path d="M20 4v7a4 4 0 0 1-4 4H4" />
				</>
			)
		case 'download':
			return (
				<>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" x2="12" y1="15" y2="3" />
				</>
			)
		case 'external-link':
			return (
				<>
					<path d="M15 3h6v6" />
					<path d="M10 14 21 3" />
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
				</>
			)
		case 'eye-off':
			return (
				<>
					<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
					<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
					<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
					<path d="m2 2 20 20" />
				</>
			)
		case 'eye':
			return (
				<>
					<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
					<circle cx="12" cy="12" r="3" />
				</>
			)
		case 'file-text':
			return (
				<>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<path d="M10 9H8" />
					<path d="M16 13H8" />
					<path d="M16 17H8" />
				</>
			)
		case 'file':
			return (
				<>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
				</>
			)
		case 'filter':
			return <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
		case 'folder-plus':
			return (
				<>
					<path d="M12 10v6" />
					<path d="M9 13h6" />
					<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
				</>
			)
		case 'folder':
			return (
				<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
			)
	}

	return undefined
}
