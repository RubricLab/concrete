import type { ReactNode } from 'react'
import {
	DataTableAction,
	DataTableEmptyCell,
	Delta,
	Indicator,
	Progress,
	Sparkline
} from '../primitives'
import type { DataTableToolbarAction, DataTone } from '../schemas'
import { normalizeRangeValue } from './data-geometry'
import { toIndicatorTone, toProgressTone, toSparklineTone } from './data-tone'

// DX-TODO(data-table): These JSX render helpers are shared only to preserve current
// visuals during the structural refactor. Collapse them into the table component or
// promote true reusable cells to primitives when the data display polish pass starts.
export function renderTableCell(value: unknown): ReactNode {
	if (value === null || value === undefined) {
		return <DataTableEmptyCell>-</DataTableEmptyCell>
	}

	if (typeof value === 'number') {
		return new Intl.NumberFormat('en-US').format(value)
	}

	if (typeof value === 'string' || typeof value === 'boolean') {
		return String(value)
	}

	if (typeof value !== 'object') {
		return null
	}

	const cell = value as { kind?: string }

	switch (cell.kind) {
		case 'delta': {
			const deltaCell = value as {
				delta: { basis?: string; intent: 'negative' | 'neutral' | 'positive'; value: string }
			}
			return (
				<Delta
					basis={deltaCell.delta.basis}
					intent={deltaCell.delta.intent}
					value={deltaCell.delta.value}
				/>
			)
		}
		case 'meter': {
			const meterCell = value as { tone: DataTone; value: { max: number; min: number; value: number } }
			const percent =
				normalizeRangeValue(meterCell.value.value, meterCell.value.min, meterCell.value.max) * 100

			return <Progress size="thin" tone={toProgressTone(meterCell.tone)} value={percent} />
		}
		case 'sparkline': {
			const sparklineCell = value as { tone: DataTone; values?: readonly number[] | undefined }

			return (
				<Sparkline
					showEndpoint={false}
					tone={toSparklineTone(sparklineCell.tone)}
					values={sparklineCell.values ?? []}
				/>
			)
		}
		case 'status': {
			const statusCell = value as { label: string; tone: DataTone }

			return <Indicator tone={toIndicatorTone(statusCell.tone)}>{statusCell.label}</Indicator>
		}
		default:
			return null
	}
}

export function renderTableToolbarAction(
	action: DataTableToolbarAction,
	selectedRowIds: readonly string[],
	onToolbarAction: ((actionId: string, selectedRowIds: readonly string[]) => void) | undefined
): ReactNode {
	return (
		<DataTableAction
			disabled={action.disabled}
			icon={action.icon}
			key={action.id}
			onClick={() => onToolbarAction?.(action.id, selectedRowIds)}
			tone={action.tone}
		>
			{action.label}
		</DataTableAction>
	)
}
