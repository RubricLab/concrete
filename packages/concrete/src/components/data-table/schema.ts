import type { z } from 'zod/v4'
import { dataTableSchema } from '../../schemas'

export const dataTableComponentSchema = dataTableSchema

export type DataTableInput = z.input<typeof dataTableComponentSchema>
export type DataTableValue = z.output<typeof dataTableComponentSchema>
