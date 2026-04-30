import { defineExamples } from '../../factories/createExamples'
import { DataCardHeader } from '../data-card-header'
import { Indicator } from '../indicator'
import {
	ChartAxis,
	ChartBar,
	ChartBarTrack,
	ChartEndpoint,
	ChartGrid,
	ChartLine,
	ChartMessage,
	ChartShell,
	ChartSurface,
	ChartSvg,
	ChartTarget,
	ChartTickLabel,
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

export const chartSurfaceExamples = defineExamples({
	bars: {
		description: 'Bar plot marks with target and comparison tracks.',
		render: () => (
			<ChartSurface variant="bar">
				<ChartSvg title="Bar chart" viewBox="0 0 160 96">
					<ChartBarTrack height="10" rx="5" width="128" x="20" y="16" />
					<ChartBar height="10" rx="5" width="96" x="20" y="16" />
					<ChartBarTrack height="10" rx="5" width="128" x="20" y="42" />
					<ChartBar height="10" rx="5" width="74" x="20" y="42" />
					<ChartBarTrack height="10" rx="5" width="128" x="20" y="68" />
					<ChartBar height="10" rx="5" width="38" x="20" y="68" />
					<ChartTarget>
						<ChartAxis x1="112" x2="112" y1="10" y2="84" />
					</ChartTarget>
				</ChartSvg>
			</ChartSurface>
		)
	},
	default: {
		description: 'Chart shell with surface and SVG plot area.',
		render: () => (
			<ChartShell>
				<DataCardHeader
					description="Accepted runs across production workspaces."
					end={<Indicator tone="terminal">ready</Indicator>}
					title="Agent runs"
				/>
				<ChartSurface>
					<ChartSvg title="Sample chart" viewBox="0 0 160 80">
						<ChartGrid>
							<ChartAxis x1="12" x2="148" y1="64" y2="64" />
							<ChartAxis x1="12" x2="148" y1="40" y2="40" />
						</ChartGrid>
						<ChartLine d="M12 58 C42 18 72 46 100 24 S138 34 148 16" />
						<ChartEndpoint cx="148" cy="16" r="3" />
						<ChartTickLabel x="12" y="75">
							Mon
						</ChartTickLabel>
						<ChartTickLabel x="128" y="75">
							Fri
						</ChartTickLabel>
					</ChartSvg>
				</ChartSurface>
			</ChartShell>
		)
	},
	donut: {
		description: 'Donut plot anatomy with center label.',
		render: () => (
			<ChartSurface variant="donut">
				<DonutPlot>
					<svg aria-hidden viewBox="0 0 120 120">
						<title>Donut chart</title>
						<DonutTrack cx="60" cy="60" r="42" />
						<DonutSegment cx="60" cy="60" pathLength="100" r="42" strokeDasharray="72 28" />
					</svg>
					<DonutCenter label="accepted" value="72%" />
				</DonutPlot>
			</ChartSurface>
		)
	},
	heatmap: {
		description: 'Heatmap grid anatomy with column and row labels.',
		render: () => (
			<ChartSurface variant="heatmap">
				<HeatmapGrid columnCount={3}>
					<HeatmapCorner />
					<HeatmapColumnLabel>Mon</HeatmapColumnLabel>
					<HeatmapColumnLabel>Tue</HeatmapColumnLabel>
					<HeatmapColumnLabel>Wed</HeatmapColumnLabel>
					<HeatmapRowLabel>API</HeatmapRowLabel>
					<HeatmapCell intensity={0.34}>12</HeatmapCell>
					<HeatmapCell intensity={0.48}>18</HeatmapCell>
					<HeatmapCell intensity={0.22}>8</HeatmapCell>
				</HeatmapGrid>
			</ChartSurface>
		)
	},
	message: {
		description: 'State message inside a chart surface.',
		render: () => (
			<ChartSurface surface="sunken">
				<ChartMessage>Loading data</ChartMessage>
			</ChartSurface>
		)
	}
})
