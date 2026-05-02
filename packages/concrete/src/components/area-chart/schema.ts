import type { z } from 'zod/v4'
import { areaChartSchema } from '../../schemas'

export const areaChartComponentSchema = areaChartSchema.omit({ kind: true })

export type AreaChartInput = z.input<typeof areaChartComponentSchema>
export type AreaChartValue = z.output<typeof areaChartComponentSchema>
