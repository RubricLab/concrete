import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	ChartMessage,
	ChartSurface,
	DonutCenter,
	DonutPlot,
	DonutSegment,
	DonutTrack,
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from './component'
import { chartSurfaceExamples } from './examples'
import { chartSurfaceMeta } from './meta'
import { type ChartSurfaceValue, chartSurfaceSchema } from './schema'

export type {
	ChartMessageProps,
	ChartShellProps,
	ChartSurfaceKind,
	ChartSurfaceProps,
	ChartSurfaceVariant,
	ChartSvgProps,
	DonutCenterProps,
	DonutPlotProps,
	DonutThickness,
	HeatmapCellProps,
	HeatmapColumnLabelProps,
	HeatmapCornerProps,
	HeatmapGridProps,
	HeatmapRowLabelProps
} from './component'
export {
	ChartArea,
	ChartAxis,
	ChartAxisLabel,
	ChartBar,
	ChartBarComparison,
	ChartBarTrack,
	ChartBaseline,
	ChartEndLabel,
	ChartEndpoint,
	ChartGrid,
	ChartLine,
	ChartMessage,
	ChartPlotBackground,
	ChartPoint,
	ChartRowLabel,
	ChartShell,
	ChartStackSegment,
	ChartSurface,
	ChartSvg,
	ChartTarget,
	ChartTickLabel,
	ChartValueLabel,
	DonutCenter,
	DonutPlot,
	DonutSegment,
	DonutTrack,
	HeatmapCell,
	HeatmapColumnLabel,
	HeatmapCorner,
	HeatmapGrid,
	HeatmapRowLabel
} from './component'
export type { ChartSurfaceInput, ChartSurfaceValue } from './schema'
export {
	chartSurfaceKindValues,
	chartSurfacePropsSchema,
	chartSurfaceSchema,
	chartSurfaceStateValues,
	chartSurfaceVariantValues
} from './schema'

export const chartSurfacePrimitiveDefinition = createPrimitive({
	...chartSurfaceMeta,
	component: ChartSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(chartSurfaceExamples, state),
	renderInput: input => renderChartSurfaceInput(chartSurfaceSchema.parse(input)),
	schema: chartSurfaceSchema,
	slug: 'chart-surface',
	states: exampleStates(chartSurfaceExamples, ['default', 'bars', 'message', 'donut', 'heatmap'])
})

function renderChartSurfaceInput({ message, state, surface, variant }: ChartSurfaceValue) {
	switch (state) {
		case 'donut':
			return (
				<ChartSurface surface={surface} variant="donut">
					<DonutPlot>
						<svg aria-hidden viewBox="0 0 120 120">
							<title>Donut chart</title>
							<DonutTrack cx="60" cy="60" r="42" />
							<DonutSegment cx="60" cy="60" pathLength="100" r="42" strokeDasharray="64 36" />
						</svg>
						<DonutCenter label="accepted" value="64%" />
					</DonutPlot>
				</ChartSurface>
			)
		case 'heatmap':
			return (
				<ChartSurface surface={surface} variant="heatmap">
					<HeatmapGrid columnCount={2}>
						<HeatmapCorner />
						<HeatmapColumnLabel>Mon</HeatmapColumnLabel>
						<HeatmapColumnLabel>Tue</HeatmapColumnLabel>
						<HeatmapRowLabel>Runs</HeatmapRowLabel>
						<HeatmapCell intensity={0.36}>12</HeatmapCell>
						<HeatmapCell intensity={0.52}>18</HeatmapCell>
					</HeatmapGrid>
				</ChartSurface>
			)
		case 'message':
			return (
				<ChartSurface surface={surface} variant={variant}>
					<ChartMessage>{message}</ChartMessage>
				</ChartSurface>
			)
		case 'surface':
			return (
				<ChartSurface surface={surface} variant={variant}>
					<ChartMessage>Chart output</ChartMessage>
				</ChartSurface>
			)
	}
}
