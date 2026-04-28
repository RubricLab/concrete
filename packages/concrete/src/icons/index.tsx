import type { ReactNode, SVGProps } from 'react'

export const iconNames = [
	'activity',
	'arrow-down',
	'arrow-left',
	'arrow-right',
	'arrow-up',
	'at-sign',
	'bar-chart-3',
	'bell',
	'book-open',
	'bookmark',
	'calendar',
	'check',
	'chevron-down',
	'chevron-left',
	'chevron-right',
	'chevron-up',
	'chevrons-up-down',
	'circle-alert',
	'circle-check',
	'circle-help',
	'circle',
	'clock',
	'code',
	'command',
	'copy',
	'corner-down-left',
	'download',
	'external-link',
	'eye-off',
	'eye',
	'file-text',
	'file',
	'filter',
	'folder-plus',
	'folder',
	'git-branch',
	'git-pull-request',
	'hash',
	'heart',
	'home',
	'image',
	'inbox',
	'info',
	'link',
	'lock',
	'message-circle',
	'message-square',
	'minus',
	'moon',
	'more-horizontal',
	'more-vertical',
	'panel-left',
	'panel-right',
	'paperclip',
	'pause',
	'pencil',
	'pie-chart',
	'play',
	'plus',
	'refresh-ccw',
	'search',
	'send-horizontal',
	'settings',
	'share-2',
	'slash',
	'sliders-horizontal',
	'smile',
	'sparkles',
	'square',
	'star',
	'sun',
	'tag',
	'terminal',
	'thumbs-down',
	'thumbs-up',
	'trash-2',
	'triangle-alert',
	'unlock',
	'upload',
	'user',
	'users',
	'x',
	'zap'
] as const

export const brandAssetNames = [
	'logo-black',
	'logo-mark',
	'logo-white',
	'wordmark',
	'wordmark-black'
] as const

export type BrandAssetName = (typeof brandAssetNames)[number]
export type IconName = (typeof iconNames)[number]

export type IconProps = SVGProps<SVGSVGElement> & {
	name: IconName
	title?: string
}

export function getIconAssetPath(iconName: IconName): string {
	return `assets/icons/${iconName}.svg`
}

export function getBrandAssetPath(assetName: BrandAssetName): string {
	return `assets/brand/${assetName}.svg`
}

export function ConcreteIcon({ name, title, ...props }: IconProps) {
	return (
		<svg
			aria-hidden={title ? undefined : true}
			fill="none"
			role={title ? 'img' : undefined}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.75}
			viewBox="0 0 24 24"
			width={24}
			height={24}
			{...props}
		>
			<title>{title ?? name}</title>
			{getIconBody(name)}
		</svg>
	)
}

function getIconBody(iconName: IconName): ReactNode {
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
}
