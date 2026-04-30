import type { ReactNode } from 'react'
import { getIconBodyAtoF } from './icon-body-a-f'
import { getIconBodyGtoP } from './icon-body-g-p'
import { getIconBodyRtoZ } from './icon-body-r-z'
import type { IconName } from './names'

export function getIconBody(iconName: IconName): ReactNode {
	return getIconBodyAtoF(iconName) ?? getIconBodyGtoP(iconName) ?? getIconBodyRtoZ(iconName)
}
