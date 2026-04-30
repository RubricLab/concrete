import type { z } from 'zod/v4'
import { barChartSchema } from '../../schemas'

export const barChartComponentSchema = barChartSchema.omit({ variant: true })

export type BarChartInput = z.input<typeof barChartComponentSchema>
export type BarChartValue = z.output<typeof barChartComponentSchema>
