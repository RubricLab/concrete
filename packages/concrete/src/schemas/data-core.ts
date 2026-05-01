import { z } from 'zod/v4'
import {
	dataComponentStateSchema,
	dataDeltaIntentSchema,
	dataToneSchema
} from '../foundations/state/schema'
import { finiteNumberSchema } from './numbers'

export { dataComponentStateSchema, dataDeltaIntentSchema, dataToneSchema }

export const dataDeltaSchema = z
	.object({
		basis: z.string().min(1).optional(),
		intent: dataDeltaIntentSchema.default('neutral'),
		value: z.string().min(1)
	})
	.strict()

export const dataPointSchema = z
	.object({
		id: z.string().min(1).optional(),
		intent: dataToneSchema.default('ink'),
		label: z.string().min(1),
		value: finiteNumberSchema
	})
	.strict()

export const dataSeriesSchema = z
	.object({
		id: z.string().min(1),
		intent: dataToneSchema.default('sky'),
		label: z.string().min(1),
		points: z.array(dataPointSchema).default([])
	})
	.strict()

export const dataProgressValueSchema = z
	.object({
		max: finiteNumberSchema.default(100),
		min: finiteNumberSchema.default(0),
		value: finiteNumberSchema
	})
	.strict()
	.refine(value => value.max > value.min, 'Progress max must be greater than min.')

export const dataLegendItemSchema = z
	.object({
		intent: dataToneSchema.default('ink'),
		label: z.string().min(1),
		value: z.string().min(1).optional()
	})
	.strict()

export const metricCardSchema = z
	.object({
		compact: z.boolean().default(false),
		delta: dataDeltaSchema.optional(),
		description: z.string().min(1).optional(),
		label: z.string().min(1),
		status: dataLegendItemSchema.optional(),
		trend: z.array(finiteNumberSchema).default([]),
		trendIntent: dataToneSchema.optional(),
		unit: z.string().min(1).optional(),
		value: z.string().min(1)
	})
	.strict()

export const meterSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		display: z.enum(['bar', 'ring']).default('bar'),
		intent: dataToneSchema.default('sky'),
		label: z.string().min(1),
		target: finiteNumberSchema.optional(),
		unit: z.string().min(1).default('%'),
		value: dataProgressValueSchema
	})
	.strict()

export type DataComponentState = z.infer<typeof dataComponentStateSchema>
export type DataDelta = z.output<typeof dataDeltaSchema>
export type DataDeltaIntent = z.infer<typeof dataDeltaIntentSchema>
export type DataLegendItem = z.output<typeof dataLegendItemSchema>
export type DataPoint = z.output<typeof dataPointSchema>
export type DataProgressValue = z.output<typeof dataProgressValueSchema>
export type DataSeries = z.output<typeof dataSeriesSchema>
export type DataIntent = z.infer<typeof dataToneSchema>
export type DataTone = z.infer<typeof dataToneSchema>
export type MeterProps = z.input<typeof meterSchema>
export type MetricCardProps = z.input<typeof metricCardSchema>
