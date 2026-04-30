export * from './accessibility'
export * from './colors'
export * from './elevation'
export * from './iconography'
export * from './layout'
export * from './motion'
export * from './radii'
export * from './sizing'
export * from './spacing'
export * from './state'
export * from './textures'
export * from './typography'

import { accessibilityFoundationDefinition } from './accessibility'
import { colorsFoundationDefinition } from './colors'
import { elevationFoundationDefinition } from './elevation'
import { iconographyFoundationDefinition } from './iconography'
import { layoutFoundationDefinition } from './layout'
import { motionFoundationDefinition } from './motion'
import { radiiFoundationDefinition } from './radii'
import { sizingFoundationDefinition } from './sizing'
import { spacingFoundationDefinition } from './spacing'
import { stateFoundationDefinition } from './state'
import { texturesFoundationDefinition } from './textures'
import { typographyFoundationDefinition } from './typography'

export const foundationDefinitions = [
	colorsFoundationDefinition,
	typographyFoundationDefinition,
	spacingFoundationDefinition,
	sizingFoundationDefinition,
	layoutFoundationDefinition,
	radiiFoundationDefinition,
	elevationFoundationDefinition,
	motionFoundationDefinition,
	texturesFoundationDefinition,
	iconographyFoundationDefinition,
	stateFoundationDefinition,
	accessibilityFoundationDefinition
] as const
