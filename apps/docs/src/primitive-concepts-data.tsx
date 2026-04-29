'use client'

import {
	Delta,
	Distribution,
	Indicator,
	Progress,
	ProgressRing,
	SegmentedProgress,
	Skeleton,
	Sparkline,
	Stat
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { ConceptLabel, MetricBar, RingCell, SparkCell } from './primitive-concept-parts'

const sparklineLineSeries = {
	down: [28, 25, 26, 22, 20, 15, 10, 6],
	neutral: [14, 15, 13, 14, 15, 13, 14],
	plateau: [6, 10, 18, 22, 22, 22, 23, 22, 23],
	step: [8, 8, 13, 13, 18, 18, 24, 24, 28],
	up: [6, 10, 13, 12, 18, 16, 24, 23, 29],
	volatile: [14, 28, 9, 24, 8, 25, 10, 27, 15, 30]
} as const

const dotSeries = {
	dense: [10, 12, 11, 14, 13, 17, 16, 20, 19, 22, 21, 24, 25, 27, 26, 28],
	normal: [12, 14, 16, 18, 19, 18, 16, 14, 12, 10],
	outliers: [12, 12, 13, 12, 28, 13, 12, 11, 12],
	sparse: [14, 18, 12, 22, 15, 20],
	trendDown: [28, 24, 21, 19, 16, 14, 10],
	trendUp: [8, 12, 17, 15, 20, 24, 28]
} as const

export function SparklineConcept() {
	return (
		<>
			<div className="conceptEyebrowRow conceptSubheaderRow">
				<span className="conceptEyebrow">Line</span>
				<span className="conceptEyebrow conceptEyebrowSoft">
					1px stroke - 28px height - endpoint dot
				</span>
			</div>
			<div className="sparkGrid">
				<SparkCell title="Up">
					<Sparkline values={sparklineLineSeries.up} />
				</SparkCell>
				<SparkCell title="Down">
					<Sparkline tone="sky" values={sparklineLineSeries.down} />
				</SparkCell>
				<SparkCell title="Neutral">
					<Sparkline tone="neutral" values={sparklineLineSeries.neutral} />
				</SparkCell>
				<SparkCell title="Volatile">
					<Sparkline values={sparklineLineSeries.volatile} />
				</SparkCell>
				<SparkCell title="Step">
					<Sparkline values={sparklineLineSeries.step} />
				</SparkCell>
				<SparkCell title="Plateau">
					<Sparkline values={sparklineLineSeries.plateau} />
				</SparkCell>
			</div>
			<ConceptLabel>Area - soft fill - sky to transparent</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Up">
					<Sparkline area values={sparklineLineSeries.up} />
				</SparkCell>
				<SparkCell title="Down">
					<Sparkline area values={sparklineLineSeries.down} />
				</SparkCell>
				<SparkCell title="Neutral">
					<Sparkline area tone="neutral" values={sparklineLineSeries.neutral} />
				</SparkCell>
				<SparkCell title="Volatile">
					<Sparkline area values={sparklineLineSeries.volatile} />
				</SparkCell>
				<SparkCell title="Step">
					<Sparkline area values={sparklineLineSeries.step} />
				</SparkCell>
				<SparkCell title="Plateau">
					<Sparkline area values={sparklineLineSeries.plateau} />
				</SparkCell>
			</div>
			<ConceptLabel>Bar - density over variation</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Positive">
					<Sparkline values={[6, 9, 11, 14, 18, 22, 26, 29]} variant="bar" />
				</SparkCell>
				<SparkCell title="Negative">
					<Sparkline tone="neutral" values={[29, 26, 22, 18, 14, 11, 9, 6]} variant="bar" />
				</SparkCell>
				<SparkCell title="Mixed">
					<Sparkline values={[12, 16, 7, 14, 20, 8, 18, 10]} variant="bar" />
				</SparkCell>
				<SparkCell title="Grouped">
					<Sparkline values={[10, 16, 13, 21, 14, 25, 18, 28]} variant="bar" />
				</SparkCell>
				<SparkCell title="Stacked">
					<Sparkline tone="terminal" values={[12, 18, 16, 20, 18, 24, 22, 26]} variant="bar" />
				</SparkCell>
				<SparkCell title="Discrete">
					<Sparkline values={[8, 11, 14, 17, 20, 16, 24, 21, 27]} variant="bar" />
				</SparkCell>
			</div>
			<ConceptLabel>Dot - distribution - sparse</ConceptLabel>
			<div className="sparkGrid">
				<SparkCell title="Sparse">
					<Sparkline values={dotSeries.sparse} variant="dot" />
				</SparkCell>
				<SparkCell title="Normal">
					<Sparkline tone="neutral" values={dotSeries.normal} variant="dot" />
				</SparkCell>
				<SparkCell title="Dense">
					<Sparkline values={dotSeries.dense} variant="dot" />
				</SparkCell>
				<SparkCell title="Trend up">
					<Sparkline values={dotSeries.trendUp} variant="dot" />
				</SparkCell>
				<SparkCell title="Trend down">
					<Sparkline tone="neutral" values={dotSeries.trendDown} variant="dot" />
				</SparkCell>
				<SparkCell title="Outliers">
					<Sparkline tone="error" values={dotSeries.outliers} variant="dot" />
				</SparkCell>
			</div>
		</>
	)
}

export function ProgressConcept() {
	return (
		<>
			<ConceptLabel>Linear - 6px - ink default - signal for state</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Default" value={72}>
					<Progress value={72} />
				</MetricBar>
				<MetricBar label="Sky" value={48}>
					<Progress tone="sky" value={48} />
				</MetricBar>
				<MetricBar label="Shipping" value={92}>
					<Progress tone="terminal" value={92} />
				</MetricBar>
				<MetricBar label="Featured" value={60}>
					<Progress tone="ultra" value={60} />
				</MetricBar>
				<MetricBar label="Blocking" value={34}>
					<Progress tone="error" value={34} />
				</MetricBar>
			</div>
			<ConceptLabel>Density - thin - default - thick</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Inline" value={62}>
					<Progress size="thin" value={62} />
				</MetricBar>
				<MetricBar label="Default" value={62}>
					<Progress value={62} />
				</MetricBar>
				<MetricBar label="Section" value={62}>
					<Progress size="thick" value={62} />
				</MetricBar>
			</div>
			<ConceptLabel>Segmented - n of m</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Onboarding" value={5} valueSuffix="/ 8">
					<SegmentedProgress segments={8} value={5} />
				</MetricBar>
				<MetricBar label="Migration" value={2} valueSuffix="/ 12">
					<SegmentedProgress segments={12} value={2} />
				</MetricBar>
			</div>
			<ConceptLabel>Circular - 96px - 6px stroke - rounded caps</ConceptLabel>
			<div className="ringGrid">
				<RingCell caption="Completion">
					<ProgressRing tone="sky" value={68} />
				</RingCell>
				<RingCell caption="106 GB - of 250 GB">
					<ProgressRing tone="terminal" value={42} />
				</RingCell>
				<RingCell caption="812k - of 1.0M requests">
					<ProgressRing value={81} />
				</RingCell>
			</div>
			<ConceptLabel>Indeterminate - unknown duration</ConceptLabel>
			<div className="progressList">
				<MetricBar label="Shuttle" value={0} valueSuffix="">
					<Progress indeterminate="shuttle" />
				</MetricBar>
				<MetricBar label="Sky shuttle" value={0} valueSuffix="">
					<Progress indeterminate="shuttle" tone="sky" />
				</MetricBar>
				<MetricBar label="Lined" value={0} valueSuffix="">
					<Progress indeterminate="lined" />
				</MetricBar>
				<MetricBar label="Lined sky" value={0} valueSuffix="">
					<Progress indeterminate="lined" tone="sky" />
				</MetricBar>
			</div>
		</>
	)
}

export function DistributionConcept() {
	return (
		<>
			<ConceptLabel>Bar</ConceptLabel>
			<Distribution
				data={[
					{ label: 'Direct', value: 47 },
					{ label: 'Referral', tone: 'sky', value: 28 },
					{ label: 'Social', value: 15 },
					{ label: 'Organic', value: 10 }
				]}
			/>
			<ConceptLabel>Diverging proxy</ConceptLabel>
			<div className="conceptStack">
				<MetricBar label="Revenue" value={18}>
					<Progress tone="terminal" value={68} />
				</MetricBar>
				<MetricBar label="Conversion" value={-2}>
					<Progress tone="error" value={12} />
				</MetricBar>
			</div>
		</>
	)
}

export function StatConcept() {
	return (
		<>
			<ConceptLabel>Sans - sizes</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="xsmall" value="248" variant="numeric" />
				<Stat size="small" value="1,284" variant="numeric" />
				<Stat value="12,480" variant="numeric" />
				<Stat size="large" value="48,912" variant="numeric" />
				<Stat size="xlarge" value="128K" variant="numeric" />
			</div>
			<ConceptLabel>Sans - with unit</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="large" unit="%" value="3.41" variant="numeric" />
				<Stat size="large" unit="K" value="$12.4" variant="numeric" />
				<Stat size="large" tone="sky" unit="%" value="+87" variant="numeric" />
			</div>
			<ConceptLabel>Display - Fraunces</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Stat size="large" unit="%" value="87" variant="display" />
				<Stat size="large" tone="sky" unit="K" value="12.4" variant="display" />
				<Stat size="xlarge" value="$3.40" variant="display" />
			</div>
			<ConceptLabel>Dashboard lockups</ConceptLabel>
			<div className="statGrid">
				<Stat
					delta={<Delta basis="vs 30d" intent="positive" value="6.3%" />}
					label="Revenue"
					value="$18.4k"
				/>
				<Stat
					delta={<Delta basis="vs 30d" intent="negative" value="2.4%" />}
					label="Conversion rate"
					value="4.06%"
				/>
				<Stat
					delta={<Delta basis="vs 7d" intent="negative" value="8.7%" />}
					label="P95 latency"
					value="236 ms"
				/>
			</div>
		</>
	)
}

export function DeltaConcept() {
	return (
		<>
			<ConceptLabel>Direction</ConceptLabel>
			<div className="conceptRow">
				<Delta intent="positive" value="18.6%" />
				<Delta intent="negative" value="8.7%" />
				<Delta value="0.0%" />
			</div>
			<ConceptLabel>Sizes</ConceptLabel>
			<div className="conceptRow statBaseline">
				<Delta intent="positive" size="small" value="2.1%" />
				<Delta intent="positive" value="8.4%" />
				<Delta intent="positive" size="large" value="24.0%" />
				<Delta intent="positive" size="xlarge" value="124.3%" />
			</div>
			<ConceptLabel>Washed</ConceptLabel>
			<div className="conceptRow">
				<Delta intent="positive" value="18.6%" variant="wash" />
				<Delta intent="negative" value="8.7%" variant="wash" />
				<Delta value="0.0%" variant="wash" />
			</div>
			<ConceptLabel>With basis</ConceptLabel>
			<div className="conceptRow">
				<Delta basis="vs 30d" intent="positive" value="18.6%" />
				<Delta basis="vs prev run" intent="negative" value="8.7%" />
			</div>
		</>
	)
}

export function SkeletonConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Atoms</ConceptLabel>
			<div className="skeletonAtoms">
				<SkeletonAtom label="Text line">
					<Skeleton className="skeletonText" width="92%" />
				</SkeletonAtom>
				<SkeletonAtom label="Text block">
					<Skeleton className="skeletonText" />
					<Skeleton className="skeletonText" width="78%" />
				</SkeletonAtom>
				<SkeletonAtom label="Avatar">
					<Skeleton className="skeletonCircle" height={32} width={32} />
				</SkeletonAtom>
				<SkeletonAtom label="Button">
					<Skeleton className="skeletonPill" height={28} width={84} />
				</SkeletonAtom>
				<SkeletonAtom label="Input">
					<Skeleton className="skeletonBlock" height={30} />
				</SkeletonAtom>
				<SkeletonAtom label="Badge">
					<Skeleton className="skeletonPill" height={20} width={56} />
				</SkeletonAtom>
				<SkeletonAtom label="Block">
					<Skeleton className="skeletonBlock" height={36} />
				</SkeletonAtom>
			</div>
			<ConceptLabel>Patterns</ConceptLabel>
			<div className="skeletonPatternGrid">
				<div className="skeletonPattern skeletonPatternFour">
					<span>List</span>
					{[62, 52, 70].map(width => (
						<div className="skeletonListRow" key={width}>
							<Skeleton className="skeletonCircle" height={28} width={28} />
							<div>
								<Skeleton className="skeletonText" width={`${width}%`} />
								<Skeleton className="skeletonText skeletonTextSmall" width={`${width - 24}%`} />
							</div>
							<Skeleton className="skeletonPill" height={20} width={44} />
						</div>
					))}
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Card</span>
					<div className="skeletonCardMock">
						<div>
							<Skeleton className="skeletonCircle" height={34} width={34} />
							<div>
								<Skeleton height={18} width="64%" />
								<Skeleton className="skeletonTextSmall" width="38%" />
							</div>
						</div>
						<Skeleton className="skeletonText" />
						<Skeleton className="skeletonText" width="94%" />
						<Skeleton className="skeletonText" width="66%" />
						<div>
							<Skeleton className="skeletonPill" height={22} width={72} />
							<Skeleton className="skeletonPill" height={22} width={44} />
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Form</span>
					<div className="skeletonFormMock">
						<Skeleton className="skeletonTextSmall" width="30%" />
						<Skeleton className="skeletonBlock" height={32} />
						<Skeleton className="skeletonTextSmall" width="38%" />
						<Skeleton className="skeletonBlock" height={32} />
						<Skeleton className="skeletonTextSmall" width="24%" />
						<Skeleton className="skeletonBlock" height={64} />
						<Skeleton className="skeletonPill" height={28} width={96} />
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternSix">
					<span>Line chart</span>
					<div className="skeletonChart">
						<div className="skeletonYAxis">
							<Skeleton height={8} width="60%" />
							<Skeleton height={8} width="75%" />
							<Skeleton height={8} width="50%" />
							<Skeleton height={8} width="65%" />
						</div>
						<div className="skeletonChartCanvas">
							<svg aria-hidden="true" viewBox="0 0 300 120" preserveAspectRatio="none">
								<path d="M0,90 C30,80 50,60 80,55 S140,40 180,30 S250,20 300,15" />
							</svg>
							<i />
						</div>
						<div className="skeletonXAxis">
							{Array.from({ length: 6 }, (_, index) => (
								<Skeleton height={8} key={index} width={22} />
							))}
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternSix">
					<span>Bar chart</span>
					<div className="skeletonBars">
						{[48, 62, 38, 78, 54, 90, 42, 66, 58, 82, 36, 70].map((height, index) => (
							<Skeleton height={`${height}%`} key={`${height}-${index}`} />
						))}
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternFour">
					<span>Donut</span>
					<div className="skeletonDonutWrap">
						<div className="skeletonDonut" />
						<div>
							{[78, 64, 86, 52].map(width => (
								<div className="skeletonLegendRow" key={width}>
									<Skeleton height={10} width={10} />
									<Skeleton className="skeletonText" width={`${width}%`} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternEight">
					<span>Table</span>
					<div className="skeletonTable">
						{[0, 1, 2, 3, 4].map(index => (
							<div
								className={index === 0 ? 'skeletonTableRow skeletonTableHead' : 'skeletonTableRow'}
								key={index}
							>
								<Skeleton height={14} width={14} />
								<Skeleton className="skeletonText" width={`${index === 0 ? 50 : 70 - index * 4}%`} />
								<Skeleton className="skeletonPill" height={18} width={56} />
								<Skeleton className="skeletonText" width={`${60 + index * 4}%`} />
								<Skeleton className="skeletonText" width={`${80 - index * 5}%`} />
								<Skeleton height={4} width={16} />
							</div>
						))}
					</div>
				</div>
				<div className="skeletonPattern skeletonPatternTwelve">
					<span>Dashboard</span>
					<div className="skeletonDashboard">
						{[55, 48, 62].map(width => (
							<div key={width}>
								<Skeleton className="skeletonTextSmall" width="40%" />
								<Skeleton height={22} width={`${width}%`} />
								<Skeleton height={30} />
							</div>
						))}
					</div>
				</div>
			</div>
			<ConceptLabel>Tokens</ConceptLabel>
			<div className="skeletonTokenRows">
				{['--sk-base', '--sk-hi', '--sk-radius', '--sk-dur'].map(token => (
					<div key={token}>
						<b>{token}</b>
						<span>
							{token === '--sk-dur' ? '1.6s linear' : token === '--sk-radius' ? '6px' : 'neutral'}
						</span>
						<Skeleton height={14} />
					</div>
				))}
			</div>
		</div>
	)
}

function SkeletonAtom({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="skeletonAtom">
			<span>{label}</span>
			<div>{children}</div>
		</div>
	)
}

export function IndicatorConcept() {
	return (
		<div className="conceptStack">
			<ConceptLabel>Dots - series keys</ConceptLabel>
			<div className="indicatorGrid">
				<Indicator>Ink</Indicator>
				<Indicator tone="sky">Sky</Indicator>
				<Indicator tone="terminal">Terminal</Indicator>
				<Indicator tone="ultra">Ultra</Indicator>
				<Indicator tone="error">Error</Indicator>
				<Indicator tone="muted">Idle</Indicator>
			</div>
			<ConceptLabel>Rings - secondary series</ConceptLabel>
			<div className="indicatorGrid">
				<LegendKey shape="ring">Target</LegendKey>
				<LegendKey shape="ring" tone="sky">
					Benchmark
				</LegendKey>
				<LegendKey shape="ring" tone="terminal">
					Forecast
				</LegendKey>
				<LegendKey shape="ring" tone="error">
					Threshold
				</LegendKey>
			</div>
			<ConceptLabel>Line legend - series</ConceptLabel>
			<div className="indicatorLegendStack">
				<LegendKey shape="line" meta="this week">
					Observed
				</LegendKey>
				<LegendKey shape="line" meta="last week" tone="sky">
					Benchmark
				</LegendKey>
				<LegendKey shape="dash" meta="target">
					Expected
				</LegendKey>
				<LegendKey shape="dot" meta="projected">
					Forecast
				</LegendKey>
			</div>
			<ConceptLabel>Swatches - stacked / area</ConceptLabel>
			<div className="indicatorLegendStack">
				<LegendKey shape="swatch" meta="44%">
					Direct
				</LegendKey>
				<LegendKey shape="swatch" meta="26%" tone="sky">
					Referral
				</LegendKey>
				<LegendKey shape="swatch" meta="15%" tone="muted">
					Social
				</LegendKey>
			</div>
			<ConceptLabel>Bucket scale - heatmap</ConceptLabel>
			<div className="indicatorBucketRow">
				<span>Low</span>
				<div>
					<i />
					<i />
					<i />
					<i />
					<i />
				</div>
				<span>High</span>
				<code>0-20</code>
				<code>20-40</code>
				<code>40-60</code>
				<code>60-80</code>
				<code>80-100</code>
			</div>
		</div>
	)
}

function LegendKey({
	children,
	meta,
	shape,
	tone = 'default'
}: {
	children: ReactNode
	meta?: string
	shape: 'dash' | 'dot' | 'line' | 'ring' | 'swatch'
	tone?: 'default' | 'error' | 'muted' | 'sky' | 'terminal'
}) {
	return (
		<span className="legendKey">
			<i data-shape={shape} data-tone={tone} />
			<span>{children}</span>
			{meta ? <small>{meta}</small> : null}
		</span>
	)
}
