import { z } from 'zod/v4'
import { dataComponentStateSchema, dataPointSchema, dataSeriesSchema } from './data-core'
import { finiteNumberSchema } from './numbers'

const chartBaseSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		height: z.number().int().positive().default(220),
		legend: z.boolean().default(true),
		message: z.string().min(1).optional(),
		showHeader: z.boolean().default(true),
		state: dataComponentStateSchema.default('ready'),
		surface: z.enum(['raised', 'sunken', 'transparent']).default('raised'),
		title: z.string().min(1)
	})
	.strict()

export const lineChartSchema = chartBaseSchema
	.extend({
		kind: z.literal('line'),
		series: z.array(dataSeriesSchema).default([]),
		showDots: z.boolean().default(false),
		showEndLabels: z.boolean().default(true),
		showGrid: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		target: finiteNumberSchema.optional()
	})
	.strict()

export const areaChartSchema = chartBaseSchema
	.extend({
		kind: z.literal('area'),
		series: z.array(dataSeriesSchema).default([]),
		showDots: z.boolean().default(false),
		showEndLabels: z.boolean().default(true),
		showGrid: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		stacked: z.boolean().default(false),
		target: finiteNumberSchema.optional()
	})
	.strict()

export const barChartSchema = chartBaseSchema
	.extend({
		baseline: finiteNumberSchema.default(0),
		comparisonPoints: z.array(dataPointSchema).default([]),
		kind: z.literal('bar'),
		orientation: z.enum(['horizontal', 'vertical']).default('vertical'),
		points: z.array(dataPointSchema).default([]),
		showGrid: z.boolean().default(true),
		showValues: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true)
	})
	.strict()

export const stackedBarGroupSchema = z
	.object({
		label: z.string().min(1),
		segments: z.array(dataPointSchema).default([])
	})
	.strict()

export const stackedBarChartSchema = chartBaseSchema
	.extend({
		groups: z.array(stackedBarGroupSchema).default([]),
		kind: z.literal('stacked-bar'),
		normalized: z.boolean().default(false),
		orientation: z.enum(['horizontal', 'vertical']).default('vertical'),
		showGrid: z.boolean().default(true),
		showValues: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true)
	})
	.strict()

export const donutChartSchema = chartBaseSchema
	.extend({
		centerLabel: z.string().min(1).optional(),
		kind: z.literal('donut'),
		segments: z.array(dataPointSchema).default([]),
		showCenterLabel: z.boolean().default(true),
		thickness: z.enum(['thin', 'medium', 'thick']).default('medium')
	})
	.strict()

export const heatmapCellSchema = z
	.object({
		label: z.string().min(1).optional(),
		value: finiteNumberSchema,
		x: z.string().min(1),
		y: z.string().min(1)
	})
	.strict()

export const heatmapChartSchema = chartBaseSchema
	.extend({
		cells: z.array(heatmapCellSchema).default([]),
		kind: z.literal('heatmap'),
		showValues: z.boolean().default(true)
	})
	.strict()

export const chartSchema = z.discriminatedUnion('kind', [
	lineChartSchema,
	areaChartSchema,
	barChartSchema,
	stackedBarChartSchema,
	donutChartSchema,
	heatmapChartSchema
])

export type AreaChartProps = Omit<z.input<typeof areaChartSchema>, 'kind'>
export type BarChartProps = Omit<z.input<typeof barChartSchema>, 'kind'>
export type ChartProps = z.input<typeof chartSchema>
export type DonutChartProps = Omit<z.input<typeof donutChartSchema>, 'kind'>
export type HeatmapProps = Omit<z.input<typeof heatmapChartSchema>, 'kind'>
export type LineChartProps = Omit<z.input<typeof lineChartSchema>, 'kind'>
export type StackedBarChartProps = Omit<z.input<typeof stackedBarChartSchema>, 'kind'>
