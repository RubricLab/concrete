import type { z } from 'zod/v4'
import { meterSchema } from '../../schemas'

export type { MeterProps } from '../../schemas'
export { meterSchema }
export type MeterInput = z.input<typeof meterSchema>
export type MeterValue = z.output<typeof meterSchema>
