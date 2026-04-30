import type { z } from 'zod/v4'
import { flowDiagramPropsSchema } from '../../schemas'

export const flowDiagramComponentSchema = flowDiagramPropsSchema

export type FlowDiagramInput = z.input<typeof flowDiagramComponentSchema>
export type FlowDiagramValue = z.output<typeof flowDiagramComponentSchema>
