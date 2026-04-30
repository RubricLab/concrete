import { z } from 'zod/v4'

export const wordmarkSchema = z.object({}).strict()

export { wordmarkSchema as wordmarkPropsSchema }
export type WordmarkInput = z.input<typeof wordmarkSchema>
export type WordmarkValue = z.output<typeof wordmarkSchema>
