import type { DataTableColumn, DataTableRow } from '../schemas'

export function createDataTableColumns<Row extends DataTableRow>() {
	return function defineDataTableColumns<const Columns extends readonly DataTableColumn<Row>[]>(
		columns: Columns
	): Columns {
		return columns
	}
}
