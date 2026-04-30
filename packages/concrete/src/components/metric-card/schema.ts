import type { z } from 'zod/v4'
import { metricCardSchema } from '../../schemas'

export type { MetricCardProps } from '../../schemas'
export { metricCardSchema }
export type MetricCardInput = z.input<typeof metricCardSchema>
export type MetricCardValue = z.output<typeof metricCardSchema>
