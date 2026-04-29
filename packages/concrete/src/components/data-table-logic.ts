import type { CSSProperties } from 'react'
import type { DataTableRow, DataTableSort } from '../schemas'

export function getNextSort(activeSort: DataTableSort | null, key: string): DataTableSort | null {
	if (activeSort?.key !== key) {
		return { direction: 'ascending', key }
	}

	if (activeSort.direction === 'ascending') {
		return { direction: 'descending', key }
	}

	return null
}

export function getResolvedRowId<Row extends DataTableRow>(
	row: Row,
	rowIndex: number,
	getRowId: ((row: Row, rowIndex: number) => string) | undefined
): string {
	return getRowId?.(row, rowIndex) ?? String(row.id ?? rowIndex)
}

export function filterDataTableRows<Row extends DataTableRow>(
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

export function getDataTableCellText(value: DataTableRow[string] | undefined): string {
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

export function getTableScrollStyle(maxHeight: string | undefined): CSSProperties | undefined {
	if (!maxHeight) {
		return undefined
	}

	return { maxHeight }
}
