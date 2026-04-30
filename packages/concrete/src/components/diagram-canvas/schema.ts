import type { z } from 'zod/v4'
import { diagramCanvasPropsSchema } from '../../schemas'

export const diagramCanvasComponentSchema = diagramCanvasPropsSchema

export type DiagramCanvasInput = z.input<typeof diagramCanvasComponentSchema>
export type DiagramCanvasValue = z.output<typeof diagramCanvasComponentSchema>
