import type { z } from 'zod/v4'
import { chartSchema } from '../../schemas'

export const chartComponentSchema = chartSchema

export type ChartInput = z.input<typeof chartComponentSchema>
export type ChartValue = z.output<typeof chartComponentSchema>
