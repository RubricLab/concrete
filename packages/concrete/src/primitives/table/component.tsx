import type {
	ButtonHTMLAttributes,
	CSSProperties,
	HTMLAttributes,
	InputHTMLAttributes,
	TableHTMLAttributes,
	TdHTMLAttributes,
	ThHTMLAttributes
} from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TableAlign = 'center' | 'left' | 'right'
export type TableSortDirection = 'ascending' | 'descending'

type TableCustomProperties = CSSProperties & {
	'--concrete-table-column-width'?: string
	'--concrete-table-max-block-size'?: string
}

type TableCellChromeProps = {
	align?: TableAlign | undefined
	frozen?: boolean | undefined
	width?: string | undefined
}

export type TableViewportProps = HTMLAttributes<HTMLDivElement> & {
	maxBlockSize?: string | undefined
}

export function TableViewport({ className, maxBlockSize, style, ...props }: TableViewportProps) {
	return (
		<div
			className={cn(concreteClassNames.tableViewport, className)}
			style={withTableMaxBlockSize(style, maxBlockSize)}
			{...props}
		/>
	)
}

export type TableProps = TableHTMLAttributes<HTMLTableElement>

export function Table({ className, ...props }: TableProps) {
	return <table className={cn(concreteClassNames.table, className)} {...props} />
}

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>

export function TableHead(props: TableHeadProps) {
	return <thead {...props} />
}

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export function TableBody(props: TableBodyProps) {
	return <tbody {...props} />
}

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
	selected?: boolean | undefined
}

export function TableRow({ selected = false, ...props }: TableRowProps) {
	return <tr data-selected={selected ? true : undefined} {...props} />
}

export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> & TableCellChromeProps

export function TableHeaderCell({
	align = 'left',
	className,
	frozen = false,
	style,
	width,
	...props
}: TableHeaderCellProps) {
	return (
		<th
			className={cn(getTableCellClassName(align, frozen), className)}
			style={withTableColumnWidth(style, width)}
			{...props}
		/>
	)
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & TableCellChromeProps

export function TableCell({
	align = 'left',
	className,
	frozen = false,
	style,
	width,
	...props
}: TableCellProps) {
	return (
		<td
			className={cn(getTableCellClassName(align, frozen), className)}
			style={withTableColumnWidth(style, width)}
			{...props}
		/>
	)
}

export type TableSelectionHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>

export function TableSelectionHeaderCell({ className, ...props }: TableSelectionHeaderCellProps) {
	return <th className={cn(concreteClassNames.tableSelectionCell, className)} {...props} />
}

export type TableSelectionCellProps = TdHTMLAttributes<HTMLTableCellElement>

export function TableSelectionCell({ className, ...props }: TableSelectionCellProps) {
	return <td className={cn(concreteClassNames.tableSelectionCell, className)} {...props} />
}

export type TableSelectionInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function TableSelectionInput(props: TableSelectionInputProps) {
	return <input type="checkbox" {...props} />
}

export type TableSortButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	sortable?: boolean | undefined
	sortDirection?: TableSortDirection | undefined
}

export function TableSortButton({
	children,
	className,
	sortable = false,
	sortDirection,
	...props
}: TableSortButtonProps) {
	return (
		<button
			className={cn(concreteClassNames.tableSort, className)}
			disabled={!sortable}
			type="button"
			{...props}
		>
			{children}
			{sortable ? <ConcreteIcon name={getTableSortIcon(sortDirection)} /> : null}
		</button>
	)
}

export type TableEmptyProps = HTMLAttributes<HTMLDivElement>

export function TableEmpty({ className, ...props }: TableEmptyProps) {
	return <div className={cn(concreteClassNames.tableEmpty, className)} {...props} />
}

export type TableEmptyCellProps = HTMLAttributes<HTMLSpanElement>

export function TableEmptyCell({ className, ...props }: TableEmptyCellProps) {
	return <span className={cn(concreteClassNames.tableEmptyCell, className)} {...props} />
}

function getTableCellClassName(align: TableAlign, frozen: boolean): string {
	return cn(
		align === 'right' && concreteClassNames.tableAlignRight,
		align === 'center' && concreteClassNames.tableAlignCenter,
		frozen && concreteClassNames.tableFrozen
	)
}

function getTableSortIcon(sortDirection: TableSortDirection | undefined) {
	switch (sortDirection) {
		case 'ascending':
			return 'chevron-up'
		case 'descending':
			return 'chevron-down'
		case undefined:
			return 'chevrons-up-down'
	}
}

function withTableMaxBlockSize(
	style: CSSProperties | undefined,
	maxBlockSize: string | undefined
): CSSProperties | undefined {
	if (!maxBlockSize) {
		return style
	}

	return {
		...style,
		'--concrete-table-max-block-size': maxBlockSize
	} as TableCustomProperties
}

function withTableColumnWidth(
	style: CSSProperties | undefined,
	width: string | undefined
): CSSProperties | undefined {
	if (!width) {
		return style
	}

	return {
		...style,
		'--concrete-table-column-width': width
	} as TableCustomProperties
}
