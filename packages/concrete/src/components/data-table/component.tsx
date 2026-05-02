'use client'

import type { ChangeEvent, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
	Button,
	ControlGroup,
	DataSurface,
	Delta,
	Indicator,
	Pagination,
	Progress,
	SearchInput,
	Select,
	Sparkline,
	Table,
	TableBody,
	TableCell,
	TableEmpty,
	TableEmptyCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableSelectionCell,
	TableSelectionHeaderCell,
	TableSelectionInput,
	TableSortButton,
	TableViewport
} from '../../primitives'
import {
	type DataIntent,
	type DataTableCellValue,
	type DataTableRow as DataTableDataRow,
	type DataTableProps,
	type DataTableSort,
	type DataTableToolbarAction,
	dataTableSchema
} from '../../schemas'
import { normalizeRangeValue, sortDataTableRows } from '../../utilities/data-geometry'
import { toIndicatorIntent, toProgressIntent, toSparklineIntent } from '../../utilities/data-intent'

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
	const hasToolbar =
		Boolean(parsedProps.searchPlaceholder) ||
		parsedProps.filters.length > 0 ||
		parsedProps.toolbarActions.length > 0
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
		<DataSurface
			actions={
				hasToolbar ? (
					<ControlGroup density="compact" label="Table controls">
						{parsedProps.searchPlaceholder ? (
							<SearchInput
								inputProps={{
									onChange: (event: ChangeEvent<HTMLInputElement>) =>
										updateSearch(event.currentTarget.value),
									placeholder: parsedProps.searchPlaceholder,
									value: parsedProps.searchValue
								}}
							/>
						) : null}
						{parsedProps.filters.map(filter => (
							<Select
								key={filter.id}
								label={filter.label}
								onChange={(event: ChangeEvent<HTMLSelectElement>) =>
									updateFilter(filter.id, event.currentTarget.value)
								}
								options={[
									{ label: 'All', value: '' },
									...filter.options.map(option => ({
										label: option.count === undefined ? option.label : `${option.label} (${option.count})`,
										value: option.value
									}))
								]}
								value={filter.value ?? ''}
							/>
						))}
						{parsedProps.toolbarActions.map(action =>
							renderTableToolbarAction(action, selectedRowIds, onToolbarAction)
						)}
					</ControlGroup>
				) : undefined
			}
			className={className}
			compact={parsedProps.compact}
			description={parsedProps.caption}
			footer={
				pagination ? (
					<Pagination
						nextDisabled={pagination.page >= pageCount}
						onNext={() => updatePage(pagination.page + 1, pagination.pageSize)}
						onPrevious={() => updatePage(pagination.page - 1, pagination.pageSize)}
						page={pagination.page}
						pageCount={pageCount}
						previousDisabled={pagination.page <= 1}
						selectedCount={selectedRowIds.length}
					/>
				) : null
			}
			purpose="table"
			title={parsedProps.title}
		>
			<TableViewport maxBlockSize={parsedProps.maxHeight}>
				<Table>
					<TableHead>
						<TableRow>
							{parsedProps.selectable ? <TableSelectionHeaderCell /> : null}
							{parsedProps.columns.map(column => (
								<TableHeaderCell
									aria-sort={activeSort?.key === column.key ? activeSort.direction : undefined}
									align={column.align}
									frozen={column.frozen}
									key={column.key}
									width={column.width}
								>
									<TableSortButton
										onClick={() => updateSort(column)}
										sortable={column.sortable}
										sortDirection={activeSort?.key === column.key ? activeSort.direction : undefined}
									>
										{column.header}
									</TableSortButton>
								</TableHeaderCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows.length === 0 ? (
							<TableRow>
								<TableCell colSpan={parsedProps.columns.length + (parsedProps.selectable ? 1 : 0)}>
									<TableEmpty>{parsedProps.emptyLabel}</TableEmpty>
								</TableCell>
							</TableRow>
						) : (
							visibleRows.map(row => {
								const rowIndex = Math.max(rows.indexOf(row), 0)
								const rowId = getResolvedRowId(row, rowIndex, getRowId)
								const selected = selectedRowIds.includes(rowId)

								return (
									<TableRow key={rowId} selected={selected}>
										{parsedProps.selectable ? (
											<TableSelectionCell>
												<TableSelectionInput
													aria-label={`Select row ${rowId}`}
													checked={selected}
													onChange={() => toggleRow(row, rowIndex)}
												/>
											</TableSelectionCell>
										) : null}
										{parsedProps.columns.map(column => (
											<TableCell
												align={column.align}
												frozen={column.frozen}
												key={column.key}
												width={column.width}
											>
												{renderTableCell(row[column.key])}
											</TableCell>
										))}
									</TableRow>
								)
							})
						)}
					</TableBody>
				</Table>
			</TableViewport>
		</DataSurface>
	)
}

function renderTableCell(value: DataTableCellValue | undefined): ReactNode {
	if (value === null || value === undefined) {
		return <TableEmptyCell>-</TableEmptyCell>
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

	switch (value.kind) {
		case 'delta':
			return (
				<Delta
					{...(value.delta.basis ? { basis: value.delta.basis } : {})}
					{...(value.delta.intent ? { intent: value.delta.intent } : {})}
					value={value.delta.value}
				/>
			)
		case 'meter': {
			const percent =
				normalizeRangeValue(value.value.value, value.value.min ?? 0, value.value.max ?? 100) * 100

			return (
				<Progress density="compact" intent={toProgressIntent(value.intent ?? 'sky')} value={percent} />
			)
		}
		case 'sparkline':
			return (
				<Sparkline
					showEndpoint={false}
					intent={toSparklineIntent(value.intent ?? 'muted')}
					values={value.values ?? []}
				/>
			)
		case 'status':
			return <Indicator intent={toIndicatorIntent(value.intent ?? 'muted')}>{value.label}</Indicator>
		default:
			return null
	}
}

function getNextSort(activeSort: DataTableSort | null, key: string): DataTableSort | null {
	if (activeSort?.key !== key) {
		return { direction: 'ascending', key }
	}

	if (activeSort.direction === 'ascending') {
		return { direction: 'descending', key }
	}

	return null
}

function getResolvedRowId<Row extends DataTableDataRow>(
	row: Row,
	rowIndex: number,
	getRowId: ((row: Row, rowIndex: number) => string) | undefined
): string {
	return getRowId?.(row, rowIndex) ?? String(row.id ?? rowIndex)
}

function filterDataTableRows<Row extends DataTableDataRow>(
	rows: readonly Row[],
	searchValue: string,
	filters: readonly { id: string; value?: string | undefined }[]
): readonly Row[] {
	const normalizedSearch = searchValue.trim().toLowerCase()

	return rows.filter(row => {
		const matchesSearch =
			normalizedSearch.length === 0 ||
			Object.values(row).some(value => getDataTableCellText(value).includes(normalizedSearch))
		const matchesFilters = filters.every(filter => {
			if (!filter.value) {
				return true
			}

			return getDataTableCellText(row[filter.id]) === filter.value.toLowerCase()
		})

		return matchesSearch && matchesFilters
	})
}

function getDataTableCellText(value: DataTableDataRow[string] | undefined): string {
	if (value === null || value === undefined) {
		return ''
	}

	if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
		return String(value).toLowerCase()
	}

	switch (value.kind) {
		case 'delta':
			return `${value.delta.value} ${value.delta.basis ?? ''}`.toLowerCase()
		case 'meter':
			return String(value.value.value).toLowerCase()
		case 'sparkline':
			return (value.values ?? []).join(' ').toLowerCase()
		case 'status':
			return value.label.toLowerCase()
	}
}

function renderTableToolbarAction(
	action: DataTableToolbarAction,
	selectedRowIds: readonly string[],
	onToolbarAction: ((actionId: string, selectedRowIds: readonly string[]) => void) | undefined
): ReactNode {
	const icon = getTableActionIcon(action.icon)
	const hierarchy = getTableActionHierarchy(action.intent)
	const intent = getTableActionIntent(action.intent)

	return (
		<Button
			density="small"
			disabled={action.disabled}
			hierarchy={hierarchy}
			intent={intent}
			key={action.id}
			onClick={() => onToolbarAction?.(action.id, selectedRowIds)}
			{...(icon ? { leadingIcon: icon } : {})}
		>
			{action.label}
		</Button>
	)
}

function getTableActionIcon(
	icon: DataTableToolbarAction['icon']
): 'download' | 'more-horizontal' | 'search' | undefined {
	switch (icon) {
		case 'download':
			return 'download'
		case 'inspect':
			return 'search'
		case 'more':
			return 'more-horizontal'
		case undefined:
			return undefined
	}
}

function getTableActionHierarchy(intent: DataIntent | undefined) {
	switch (intent) {
		case 'error':
			return 'primary'
		case 'sky':
			return 'soft'
		case 'terminal':
		case 'ultra':
			return 'soft'
		case 'ink':
		case 'muted':
		case undefined:
			return 'secondary'
	}
}

function getTableActionIntent(intent: DataIntent | undefined) {
	switch (intent) {
		case 'error':
			return 'danger'
		case 'sky':
			return 'sky'
		case 'ink':
		case 'muted':
		case 'terminal':
		case 'ultra':
		case undefined:
			return 'neutral'
	}
}
