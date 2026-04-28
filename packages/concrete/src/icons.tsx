import type { SVGProps } from 'react'

export const iconPathData = {
	activity: ['M4 13h4l3-8 4 14 3-6h2'],
	alert: [
		'M12 9v4',
		'M12 17h.01',
		'M10.3 4.6 2.9 17.4a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0Z'
	],
	arrowDown: ['M12 5v14', 'M19 12l-7 7-7-7'],
	arrowUp: ['M12 19V5', 'M5 12l7-7 7 7'],
	avatar: ['M20 21a8 8 0 1 0-16 0', 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'],
	branch: ['M6 4v10a4 4 0 0 0 4 4h8', 'M18 14l4 4-4 4', 'M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'],
	caretDown: ['M6 9l6 6 6-6'],
	check: ['M20 6 9 17l-5-5'],
	code: ['M8 8 4 12l4 4', 'M16 8l4 4-4 4', 'M14 4l-4 16'],
	database: [
		'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z',
		'M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
		'M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6'
	],
	filter: ['M4 5h16', 'M7 12h10', 'M10 19h4'],
	grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
	home: ['M3 11 12 3l9 8', 'M5 10v10h14V10'],
	info: ['M12 11v6', 'M12 7h.01', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'],
	layers: ['M12 3 3 8l9 5 9-5-9-5Z', 'M3 13l9 5 9-5', 'M3 18l9 5 9-5'],
	link: [
		'M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1',
		'M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1'
	],
	message: ['M21 12a8 8 0 0 1-8 8H5l-2 2v-8a8 8 0 1 1 18-2Z'],
	minus: ['M5 12h14'],
	moon: ['M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z'],
	plus: ['M12 5v14', 'M5 12h14'],
	search: ['M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z', 'M16 16l5 5'],
	settings: [
		'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
		'M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2 3.4-.2-.1a1.8 1.8 0 0 0-2 .2 7.8 7.8 0 0 1-1.4.8 1.8 1.8 0 0 0-1.1 1.6V23H9v-.2a1.8 1.8 0 0 0-1.1-1.6 7.8 7.8 0 0 1-1.4-.8 1.8 1.8 0 0 0-2-.2l-.2.1-2-3.4.1-.1a1.8 1.8 0 0 0 .4-2 7.7 7.7 0 0 1 0-1.6 1.8 1.8 0 0 0-.4-2l-.1-.1 2-3.4.2.1a1.8 1.8 0 0 0 2-.2 7.8 7.8 0 0 1 1.4-.8A1.8 1.8 0 0 0 9 5.2V5h4.4v.2a1.8 1.8 0 0 0 1.1 1.6 7.8 7.8 0 0 1 1.4.8 1.8 1.8 0 0 0 2 .2l.2-.1 2 3.4-.1.1a1.8 1.8 0 0 0-.4 2 7.7 7.7 0 0 1 0 1.8Z'
	],
	sparkles: [
		'M12 2l1.5 5L18 9l-4.5 2L12 16l-1.5-5L6 9l4.5-2L12 2Z',
		'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z'
	],
	table: ['M3 5h18v14H3z', 'M3 10h18', 'M9 5v14', 'M15 5v14'],
	x: ['M6 6l12 12', 'M18 6 6 18']
} as const

export type IconName = keyof typeof iconPathData

export interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName
	size?: number
	title?: string
}

export function Icon({ name, size = 16, title, className, ...props }: IconProps) {
	const paths = iconPathData[name]

	return (
		<svg
			aria-hidden={title ? undefined : true}
			aria-label={title}
			className={['concrete-icon', className].filter(Boolean).join(' ')}
			fill="none"
			height={size}
			role={title ? 'img' : undefined}
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			{title ? <title>{title}</title> : null}
			{paths.map(path => (
				<path d={path} key={path} />
			))}
		</svg>
	)
}
