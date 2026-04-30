import type { SVGProps } from 'react'
import { getIconBody } from './icon-body'
import type { IconName } from './names'

export type IconProps = SVGProps<SVGSVGElement> & {
	name: IconName
	title?: string
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
