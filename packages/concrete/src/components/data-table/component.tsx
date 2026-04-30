'use client'

import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { ConcreteIcon } from '../../icons'
import { Card } from '../../primitives'
import { cn } from '../../primitives/utils'
import {
	type DataTableProps,
	type DataTableRow,
	type DataTableSort,
	dataTableSchema
} from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { sortDataTableRows } from '../../utilities/data-geometry'
import {
	filterDataTableRows,
	getNextSort,
	getResolvedRowId,
	getTableScrollStyle
} from '../../utilities/data-table-logic'
import {
	renderTableCell,
	renderTableToolbarAction,
	SortGlyph
} from '../../utilities/data-table-rendering'

type ComponentShellProps = {
	className?: string
}

export function DataTable<Row extends DataTableRow>({
	className,
	getRowId,
	onFilterChange,
	onPageChange,
	onRowSelectionChange,
	onSearchChange,
	onSortChange,
	onToolbarAction,
	...props
}: DataTableProps<Row> & ComponentShellProps) {
	const [internalSearchValue, setInternalSearchValue] = useState(props.searchValue ?? '')
	const [internalSelectedRowIds, setInternalSelectedRowIds] = useState<readonly string[]>(
		props.selectedRowIds ?? []
	)
	const [internalFilterValues, setInternalFilterValues] = useState<Record<string, string>>(() =>
		Object.fromEntries(
			(props.filters ?? []).flatMap(filter => (filter.value ? [[filter.id, filter.value]] : []))
		)
	)
	const [internalPage, setInternalPage] = useState(props.pagination?.page ?? 1)
	const activeFilters = (props.filters ?? []).map(filter => ({
		...filter,
		value: filter.value ?? internalFilterValues[filter.id]
	}))
	const parsedProps = dataTableSchema.parse({
		...props,
		columns: [...props.columns],
		filters: activeFilters,
		pagination: props.pagination
			? { ...props.pagination, page: props.pagination.page ?? internalPage }
			: undefined,
		rows: [...props.rows],
		searchValue: props.searchValue ?? internalSearchValue,
		selectedRowIds: props.selectedRowIds ?? [...internalSelectedRowIds]
	})
	const [internalSort, setInternalSort] = useState<DataTableSort | null>(parsedProps.sort ?? null)
	const activeSort = parsedProps.sort ?? internalSort
	const rows = useMemo(() => {
		const filteredRows = filterDataTableRows(props.rows, parsedProps.searchValue, parsedProps.filters)

		if (!activeSort) {
			return filteredRows
		}

		return sortDataTableRows(filteredRows, activeSort.key, activeSort.direction)
	}, [activeSort, parsedProps.filters, parsedProps.searchValue, props.rows])
	const selectedRowIds = parsedProps.selectedRowIds
	const pagination = parsedProps.pagination
	const totalRows = pagination?.totalRows ?? rows.length
	const pageCount = pagination ? Math.max(Math.ceil(totalRows / pagination.pageSize), 1) : 1
	const visibleRows = pagination
		? rows.slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)
		: rows

	function updateSort(column: (typeof parsedProps.columns)[number]) {
		if (!column.sortable) {
			return
		}

		const nextSort = getNextSort(activeSort, column.key)
		setInternalSort(nextSort)
		onSortChange?.(nextSort)
	}

	function toggleRow(row: Row, rowIndex: number) {
		const rowId = getResolvedRowId(row, rowIndex, getRowId)
		const nextSelection = selectedRowIds.includes(rowId)
			? selectedRowIds.filter(id => id !== rowId)
			: [...selectedRowIds, rowId]

		if (props.selectedRowIds === undefined) {
			setInternalSelectedRowIds(nextSelection)
		}

		onRowSelectionChange?.(nextSelection)
	}

	function updateSearch(value: string) {
		if (props.searchValue === undefined) {
			setInternalSearchValue(value)
		}

		if (props.pagination?.page === undefined) {
			setInternalPage(1)
		}

		onSearchChange?.(value)
	}

	function updateFilter(filterId: string, value: string) {
		setInternalFilterValues(currentValues => ({
			...currentValues,
			[filterId]: value
		}))
		if (props.pagination?.page === undefined) {
			setInternalPage(1)
		}
		onFilterChange?.(filterId, value)
	}

	function updatePage(page: number, pageSize: number) {
		if (props.pagination?.page === undefined) {
			setInternalPage(page)
		}

		onPageChange?.(page, pageSize)
	}

	return (
		<Card className={cn(concreteClassNames.dataTableCard, className)} variant="raised">
			<header className={concreteClassNames.dataTableHeader}>
				<div>
					{parsedProps.title ? <h3>{parsedProps.title}</h3> : null}
					{parsedProps.caption ? <p>{parsedProps.caption}</p> : null}
				</div>
				<div className={concreteClassNames.dataTableToolbar}>
					{parsedProps.searchPlaceholder ? (
						<label className={concreteClassNames.dataTableSearch}>
							<ConcreteIcon name="search" />
							<input
								onChange={(event: ChangeEvent<HTMLInputElement>) => updateSearch(event.currentTarget.value)}
								placeholder={parsedProps.searchPlaceholder}
								value={parsedProps.searchValue}
							/>
						</label>
					) : null}
					{parsedProps.filters.map(filter => (
						<label className={concreteClassNames.dataTableFilter} key={filter.id}>
							<span>{filter.label}</span>
							<select
								onChange={(event: ChangeEvent<HTMLSelectElement>) =>
									updateFilter(filter.id, event.currentTarget.value)
								}
								value={filter.value ?? ''}
							>
								<option value="">All</option>
								{filter.options.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
										{option.count === undefined ? '' : ` (${option.count})`}
									</option>
								))}
							</select>
						</label>
					))}
					{parsedProps.toolbarActions.map(action =>
						renderTableToolbarAction(action, selectedRowIds, onToolbarAction)
					)}
				</div>
			</header>
			<div
				className={concreteClassNames.dataTableScroll}
				style={getTableScrollStyle(parsedProps.maxHeight)}
			>
				<table className={concreteClassNames.dataTable}>
					<thead>
						<tr>
							{parsedProps.selectable ? (
								<th className={concreteClassNames.dataTableSelectionCell} />
							) : null}
							{parsedProps.columns.map(column => (
								<th
									aria-sort={activeSort?.key === column.key ? activeSort.direction : undefined}
									className={cn(
										column.align === 'right' && concreteClassNames.dataTableAlignRight,
										column.align === 'center' && concreteClassNames.dataTableAlignCenter,
										column.frozen && concreteClassNames.dataTableFrozen
									)}
									key={column.key}
									style={{ width: column.width }}
								>
									<button
										className={concreteClassNames.dataTableSort}
										disabled={!column.sortable}
										onClick={() => updateSort(column)}
										type="button"
									>
										{column.header}
										{column.sortable ? <SortGlyph activeSort={activeSort} columnKey={column.key} /> : null}
									</button>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{visibleRows.length === 0 ? (
							<tr>
								<td colSpan={parsedProps.columns.length + (parsedProps.selectable ? 1 : 0)}>
									<div className={concreteClassNames.dataTableEmpty}>{parsedProps.emptyLabel}</div>
								</td>
							</tr>
						) : (
							visibleRows.map(row => {
								const rowIndex = Math.max(rows.indexOf(row), 0)
								const rowId = getResolvedRowId(row, rowIndex, getRowId)
								const selected = selectedRowIds.includes(rowId)

								return (
									<tr data-selected={selected ? true : undefined} key={rowId}>
										{parsedProps.selectable ? (
											<td className={concreteClassNames.dataTableSelectionCell}>
												<input
													aria-label={`Select row ${rowId}`}
													checked={selected}
													onChange={() => toggleRow(row, rowIndex)}
													type="checkbox"
												/>
											</td>
										) : null}
										{parsedProps.columns.map(column => (
											<td
												className={cn(
													column.align === 'right' && concreteClassNames.dataTableAlignRight,
													column.align === 'center' && concreteClassNames.dataTableAlignCenter,
													column.frozen && concreteClassNames.dataTableFrozen
												)}
												key={column.key}
												style={{ width: column.width }}
											>
												{renderTableCell(row[column.key])}
											</td>
										))}
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>
			{pagination ? (
				<footer className={concreteClassNames.dataTablePagination}>
					<button
						disabled={pagination.page <= 1}
						onClick={() => updatePage(pagination.page - 1, pagination.pageSize)}
						type="button"
					>
						<ConcreteIcon name="chevron-left" />
					</button>
					<span>
						Page {pagination.page} / {pageCount}
					</span>
					<span>{selectedRowIds.length} selected</span>
					<button
						disabled={pagination.page >= pageCount}
						onClick={() => updatePage(pagination.page + 1, pagination.pageSize)}
						type="button"
					>
						<ConcreteIcon name="chevron-right" />
					</button>
				</footer>
			) : null}
		</Card>
	)
}
