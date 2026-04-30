import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Progress, type ProgressTone } from '../progress/component'
import { cn } from '../utils'

export type DistributionDatum = {
	label: string
	tone?: ProgressTone | undefined
	value: number
}

export type DistributionProps = HTMLAttributes<HTMLDivElement> & {
	data: readonly DistributionDatum[]
}

export function Distribution({ className, data, ...props }: DistributionProps) {
	return (
		<div className={cn(concreteClassNames.distribution, className)} {...props}>
			{data.map(datum => (
				<div className={concreteClassNames.distributionRow} key={datum.label}>
					<span>{datum.label}</span>
					<Progress tone={datum.tone ?? 'default'} value={datum.value} />
					<span className={concreteClassNames.distributionValue}>{datum.value}%</span>
				</div>
			))}
		</div>
	)
}
