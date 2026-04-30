import type { z } from 'zod/v4'
import { donutChartSchema } from '../../schemas'

export const donutChartComponentSchema = donutChartSchema.omit({ variant: true })

export type DonutChartInput = z.input<typeof donutChartComponentSchema>
export type DonutChartValue = z.output<typeof donutChartComponentSchema>
