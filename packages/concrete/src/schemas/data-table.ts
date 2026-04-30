import { z } from 'zod/v4'
import { dataDeltaSchema, dataProgressValueSchema, dataToneSchema } from './data-core'
import { finiteNumberSchema } from './numbers'

export const dataTableStatusCellSchema = z
	.object({
		kind: z.literal('status'),
		label: z.string().min(1),
		tone: dataToneSchema.default('muted')
	})
	.strict()

export const dataTableDeltaCellSchema = z
	.object({
		delta: dataDeltaSchema,
		kind: z.literal('delta')
	})
	.strict()

export const dataTableSparklineCellSchema = z
	.object({
		kind: z.literal('sparkline'),
		tone: dataToneSchema.default('muted'),
		values: z.array(finiteNumberSchema).default([])
	})
	.strict()

export const dataTableMeterCellSchema = z
	.object({
		kind: z.literal('meter'),
		tone: dataToneSchema.default('sky'),
		value: dataProgressValueSchema
	})
	.strict()

export const dataTableCellValueSchema = z.union([
	z.string(),
	finiteNumberSchema,
	z.boolean(),
	z.null(),
	dataTableStatusCellSchema,
	dataTableDeltaCellSchema,
	dataTableSparklineCellSchema,
	dataTableMeterCellSchema
])

export const dataTableColumnSchema = z
	.object({
		align: z.enum(['center', 'left', 'right']).default('left'),
		frozen: z.boolean().default(false),
		header: z.string().min(1),
		key: z.string().min(1),
		sortable: z.boolean().default(false),
		width: z.string().min(1).optional()
	})
	.strict()

export const dataTableSortSchema = z
	.object({
		direction: z.enum(['ascending', 'descending']),
		key: z.string().min(1)
	})
	.strict()

export const dataTableFilterOptionSchema = z
	.object({
		count: z.number().int().nonnegative().optional(),
		label: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const dataTableFilterSchema = z
	.object({
		id: z.string().min(1),
		label: z.string().min(1),
		options: z.array(dataTableFilterOptionSchema).default([]),
		value: z.string().min(1).optional()
	})
	.strict()

export const dataTablePaginationSchema = z
	.object({
		page: z.number().int().positive().default(1),
		pageSize: z.number().int().positive().default(25),
		totalRows: z.number().int().nonnegative().optional()
	})
	.strict()

export const dataTableToolbarActionSchema = z
	.object({
		disabled: z.boolean().default(false),
		icon: z.enum(['download', 'inspect', 'more']).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		tone: dataToneSchema.default('muted')
	})
	.strict()

export const dataTableSchema = z
	.object({
		caption: z.string().min(1).optional(),
		columns: z.array(dataTableColumnSchema).default([]),
		compact: z.boolean().default(true),
		emptyLabel: z.string().min(1).default('No rows'),
		filters: z.array(dataTableFilterSchema).default([]),
		maxHeight: z.string().min(1).optional(),
		pagination: dataTablePaginationSchema.optional(),
		rows: z.array(z.record(z.string(), dataTableCellValueSchema)).default([]),
		searchPlaceholder: z.string().min(1).default('Search rows'),
		searchValue: z.string().default(''),
		selectable: z.boolean().default(false),
		selectedRowIds: z.array(z.string().min(1)).default([]),
		sort: dataTableSortSchema.optional(),
		title: z.string().min(1).optional(),
		toolbarActions: z.array(dataTableToolbarActionSchema).default([])
	})
	.strict()

export type DataTableCellValue = z.input<typeof dataTableCellValueSchema>
export type DataTableColumn<Row extends DataTableRow = DataTableRow> = Omit<
	z.input<typeof dataTableColumnSchema>,
	'key'
> & {
	key: Extract<keyof Row, string>
}
export type DataTableFilter = z.output<typeof dataTableFilterSchema>
export type DataTablePagination = z.output<typeof dataTablePaginationSchema>
export type DataTableProps<Row extends DataTableRow = DataTableRow> = Omit<
	z.input<typeof dataTableSchema>,
	'columns' | 'rows'
> & {
	columns: readonly DataTableColumn<Row>[]
	getRowId?: (row: Row, rowIndex: number) => string
	onFilterChange?: (filterId: string, value: string) => void
	onPageChange?: (page: number, pageSize: number) => void
	onRowSelectionChange?: (selectedRowIds: readonly string[]) => void
	onSearchChange?: (value: string) => void
	onSortChange?: (sort: DataTableSort | null) => void
	onToolbarAction?: (actionId: string, selectedRowIds: readonly string[]) => void
	rows: readonly Row[]
}
export type DataTableRow = Record<string, DataTableCellValue>
export type DataTableSort = z.output<typeof dataTableSortSchema>
export type DataTableToolbarAction = z.output<typeof dataTableToolbarActionSchema>
