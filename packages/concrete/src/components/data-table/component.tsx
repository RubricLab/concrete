'use client'

import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import {
	DataCardHeader,
	DataTableBody,
	DataTableCell,
	DataTableElement,
	DataTableEmpty,
	DataTableFilterControl,
	DataTableHead,
	DataTableHeaderCell,
	DataTablePager,
	DataTableScroll,
	DataTableSearch,
	DataTableSelectionCell,
	DataTableSelectionHeaderCell,
	DataTableSelectionInput,
	DataTableShell,
	DataTableSortButton,
	DataTableTableRow,
	DataTableToolbar
} from '../../primitives'
import {
	type DataTableRow as DataTableDataRow,
	type DataTableProps,
	type DataTableSort,
	dataTableSchema
} from '../../schemas'
import { sortDataTableRows } from '../../utilities/data-geometry'
import {
	filterDataTableRows,
	getNextSort,
	getResolvedRowId
} from '../../utilities/data-table-logic'
import { renderTableCell, renderTableToolbarAction } from '../../utilities/data-table-rendering'

type ComponentShellProps = {
	className?: string
}

export function DataTable<Row extends DataTableDataRow>({
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
		<DataTableShell className={className}>
			<DataCardHeader
				align="center"
				description={parsedProps.caption}
				end={
					<DataTableToolbar>
						{parsedProps.searchPlaceholder ? (
							<DataTableSearch
								inputProps={{
									onChange: (event: ChangeEvent<HTMLInputElement>) =>
										updateSearch(event.currentTarget.value),
									placeholder: parsedProps.searchPlaceholder,
									value: parsedProps.searchValue
								}}
							/>
						) : null}
						{parsedProps.filters.map(filter => (
							<DataTableFilterControl
								key={filter.id}
								label={filter.label}
								selectProps={{
									onChange: (event: ChangeEvent<HTMLSelectElement>) =>
										updateFilter(filter.id, event.currentTarget.value),
									value: filter.value ?? ''
								}}
							>
								<option value="">All</option>
								{filter.options.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
										{option.count === undefined ? '' : ` (${option.count})`}
									</option>
								))}
							</DataTableFilterControl>
						))}
						{parsedProps.toolbarActions.map(action =>
							renderTableToolbarAction(action, selectedRowIds, onToolbarAction)
						)}
					</DataTableToolbar>
				}
				title={parsedProps.title}
			/>
			<DataTableScroll maxHeight={parsedProps.maxHeight}>
				<DataTableElement>
					<DataTableHead>
						<DataTableTableRow>
							{parsedProps.selectable ? <DataTableSelectionHeaderCell /> : null}
							{parsedProps.columns.map(column => (
								<DataTableHeaderCell
									aria-sort={activeSort?.key === column.key ? activeSort.direction : undefined}
									align={column.align}
									frozen={column.frozen}
									key={column.key}
									width={column.width}
								>
									<DataTableSortButton
										onClick={() => updateSort(column)}
										sortable={column.sortable}
										sortDirection={activeSort?.key === column.key ? activeSort.direction : undefined}
									>
										{column.header}
									</DataTableSortButton>
								</DataTableHeaderCell>
							))}
						</DataTableTableRow>
					</DataTableHead>
					<DataTableBody>
						{visibleRows.length === 0 ? (
							<DataTableTableRow>
								<DataTableCell colSpan={parsedProps.columns.length + (parsedProps.selectable ? 1 : 0)}>
									<DataTableEmpty>{parsedProps.emptyLabel}</DataTableEmpty>
								</DataTableCell>
							</DataTableTableRow>
						) : (
							visibleRows.map(row => {
								const rowIndex = Math.max(rows.indexOf(row), 0)
								const rowId = getResolvedRowId(row, rowIndex, getRowId)
								const selected = selectedRowIds.includes(rowId)

								return (
									<DataTableTableRow key={rowId} selected={selected}>
										{parsedProps.selectable ? (
											<DataTableSelectionCell>
												<DataTableSelectionInput
													aria-label={`Select row ${rowId}`}
													checked={selected}
													onChange={() => toggleRow(row, rowIndex)}
												/>
											</DataTableSelectionCell>
										) : null}
										{parsedProps.columns.map(column => (
											<DataTableCell
												align={column.align}
												frozen={column.frozen}
												key={column.key}
												width={column.width}
											>
												{renderTableCell(row[column.key])}
											</DataTableCell>
										))}
									</DataTableTableRow>
								)
							})
						)}
					</DataTableBody>
				</DataTableElement>
			</DataTableScroll>
			{pagination ? (
				<DataTablePager
					nextDisabled={pagination.page >= pageCount}
					onNext={() => updatePage(pagination.page + 1, pagination.pageSize)}
					onPrevious={() => updatePage(pagination.page - 1, pagination.pageSize)}
					page={pagination.page}
					pageCount={pageCount}
					previousDisabled={pagination.page <= 1}
					selectedCount={selectedRowIds.length}
				/>
			) : null}
		</DataTableShell>
	)
}
