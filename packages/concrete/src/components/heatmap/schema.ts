import type { z } from 'zod/v4'
import { heatmapChartSchema } from '../../schemas'

export const heatmapComponentSchema = heatmapChartSchema.omit({ variant: true })

export type HeatmapInput = z.input<typeof heatmapComponentSchema>
export type HeatmapValue = z.output<typeof heatmapComponentSchema>
