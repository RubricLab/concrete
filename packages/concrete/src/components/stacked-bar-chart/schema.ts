import type { z } from 'zod/v4'
import { stackedBarChartSchema } from '../../schemas'

export const stackedBarChartComponentSchema = stackedBarChartSchema.omit({ variant: true })

export type StackedBarChartInput = z.input<typeof stackedBarChartComponentSchema>
export type StackedBarChartValue = z.output<typeof stackedBarChartComponentSchema>
