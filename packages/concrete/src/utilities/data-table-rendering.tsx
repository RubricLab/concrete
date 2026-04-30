import type { ReactNode } from 'react'
import { ConcreteIcon } from '../icons'
import { Delta, Indicator, Progress, Sparkline } from '../primitives'
import { cn } from '../primitives/utils'
import type { DataTableSort, DataTableToolbarAction, DataTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { normalizeRangeValue } from './data-geometry'
import { getDataToneClass, toIndicatorTone, toProgressTone, toSparklineTone } from './data-tone'

// DX-TODO(data-table): These JSX render helpers are shared only to preserve current
// visuals during the structural refactor. Collapse them into the table component or
// promote true reusable cells to primitives when the data display polish pass starts.
export function renderTableCell(value: unknown): ReactNode {
	if (value === null || value === undefined) {
		return <span className={concreteClassNames.dataTableEmptyCell}>-</span>
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
		<button
			className={cn(concreteClassNames.dataTableAction, getDataToneClass(action.tone))}
			disabled={action.disabled}
			key={action.id}
			onClick={() => onToolbarAction?.(action.id, selectedRowIds)}
			type="button"
		>
			{action.icon ? <TableActionIcon icon={action.icon} /> : null}
			{action.label}
		</button>
	)
}

export function TableActionIcon({ icon }: { icon: NonNullable<DataTableToolbarAction['icon']> }) {
	switch (icon) {
		case 'download':
			return <ConcreteIcon name="download" />
		case 'inspect':
			return <ConcreteIcon name="search" />
		case 'more':
			return <ConcreteIcon name="more-horizontal" />
	}
}

export function SortGlyph({
	activeSort,
	columnKey
}: {
	activeSort: DataTableSort | null
	columnKey: string
}) {
	if (activeSort?.key !== columnKey) {
		return <ConcreteIcon name="chevrons-up-down" />
	}

	return <ConcreteIcon name={activeSort.direction === 'ascending' ? 'chevron-up' : 'chevron-down'} />
}
