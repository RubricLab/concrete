import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type BrandMarkProps = HTMLAttributes<HTMLSpanElement> & {
	inverse?: boolean
}

export function BrandMark({ className, inverse = false, ...props }: BrandMarkProps) {
	return (
		<span
			className={cn(concreteClassNames.brandMark, className)}
			style={inverse ? { background: 'transparent', color: '#fff' } : undefined}
			{...props}
		>
			<svg aria-hidden viewBox="0 0 900 900">
				<title>Concrete mark</title>
				<path d="M300 600V300H400V400H500V300H600V400H500V500H400V600H300Z" />
			</svg>
		</span>
	)
}
