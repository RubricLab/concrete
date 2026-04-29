export * from './colors'
export * from './elevation'
export * from './motion'
export * from './radii'
export * from './spacing'
export * from './textures'
export * from './typography'

import { colorsFoundationDefinition } from './colors'
import { elevationFoundationDefinition } from './elevation'
import { motionFoundationDefinition } from './motion'
import { radiiFoundationDefinition } from './radii'
import { spacingFoundationDefinition } from './spacing'
import { texturesFoundationDefinition } from './textures'
import { typographyFoundationDefinition } from './typography'

export const foundationDefinitions = [
	colorsFoundationDefinition,
	typographyFoundationDefinition,
	spacingFoundationDefinition,
	radiiFoundationDefinition,
	elevationFoundationDefinition,
	motionFoundationDefinition,
	texturesFoundationDefinition
] as const
