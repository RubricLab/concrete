import { ConcreteIcon, type IconProps } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export function IconPrimitive({ className, ...props }: IconProps) {
	return <ConcreteIcon className={cn(concreteClassNames.icon, className)} {...props} />
}
