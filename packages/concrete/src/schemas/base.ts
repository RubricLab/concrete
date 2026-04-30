import { z } from 'zod/v4'

export const concretePressureSchema = z.enum(['product', 'editorial', 'generative', 'educational'])
export const concreteSignalSchema = z.enum(['terminal', 'ultra', 'error'])
export const concreteViewportSchema = z.enum(['desktop', 'tablet', 'mobile'])
export const concreteRenderKindSchema = z.enum(['primitive', 'component'])

export type ConcretePressure = z.infer<typeof concretePressureSchema>
export type ConcreteRenderKind = z.infer<typeof concreteRenderKindSchema>
export type ConcreteSignal = z.infer<typeof concreteSignalSchema>
export type ConcreteViewport = z.infer<typeof concreteViewportSchema>
