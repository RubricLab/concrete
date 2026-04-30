import type { z } from 'zod/v4'
import { lineChartSchema } from '../../schemas'

export const lineChartComponentSchema = lineChartSchema.omit({ variant: true })

export type LineChartInput = z.input<typeof lineChartComponentSchema>
export type LineChartValue = z.output<typeof lineChartComponentSchema>
