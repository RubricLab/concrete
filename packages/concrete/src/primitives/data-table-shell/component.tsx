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
import { Card, type CardProps } from '../card'
import { cn } from '../utils'

export type DataTableAlign = 'center' | 'left' | 'right'
export type DataTableSortDirection = 'ascending' | 'descending'

type DataTableCustomProperties = CSSProperties & {
	'--data-table-column-width'?: string
	'--data-table-max-height'?: string
}

type DataTableCellChromeProps = {
	align?: DataTableAlign | undefined
	frozen?: boolean | undefined
	width?: string | undefined
}

export type DataTableShellProps = Omit<CardProps, 'variant'>

export function DataTableShell({ className, ...props }: DataTableShellProps) {
	return (
		<Card className={cn(concreteClassNames.dataTableCard, className)} variant="raised" {...props} />
	)
}

export type DataTableScrollProps = HTMLAttributes<HTMLDivElement> & {
	maxHeight?: string | undefined
}

export function DataTableScroll({ className, maxHeight, style, ...props }: DataTableScrollProps) {
	return (
		<div
			className={cn(concreteClassNames.dataTableScroll, className)}
			style={withDataTableMaxHeight(style, maxHeight)}
			{...props}
		/>
	)
}

export type DataTableElementProps = TableHTMLAttributes<HTMLTableElement>

export function DataTableElement({ className, ...props }: DataTableElementProps) {
	return <table className={cn(concreteClassNames.dataTable, className)} {...props} />
}

export type DataTableHeadProps = HTMLAttributes<HTMLTableSectionElement>

export function DataTableHead(props: DataTableHeadProps) {
	return <thead {...props} />
}

export type DataTableBodyProps = HTMLAttributes<HTMLTableSectionElement>

export function DataTableBody(props: DataTableBodyProps) {
	return <tbody {...props} />
}

export type DataTableTableRowProps = HTMLAttributes<HTMLTableRowElement> & {
	selected?: boolean | undefined
}

export function DataTableTableRow({ selected = false, ...props }: DataTableTableRowProps) {
	return <tr data-selected={selected ? true : undefined} {...props} />
}

export type DataTableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> &
	DataTableCellChromeProps

export function DataTableHeaderCell({
	align = 'left',
	className,
	frozen = false,
	style,
	width,
	...props
}: DataTableHeaderCellProps) {
	return (
		<th
			className={cn(getDataTableCellClassName(align, frozen), className)}
			style={withDataTableColumnWidth(style, width)}
			{...props}
		/>
	)
}

export type DataTableCellProps = TdHTMLAttributes<HTMLTableCellElement> & DataTableCellChromeProps

export function DataTableCell({
	align = 'left',
	className,
	frozen = false,
	style,
	width,
	...props
}: DataTableCellProps) {
	return (
		<td
			className={cn(getDataTableCellClassName(align, frozen), className)}
			style={withDataTableColumnWidth(style, width)}
			{...props}
		/>
	)
}

export type DataTableSelectionHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>

export function DataTableSelectionHeaderCell({
	className,
	...props
}: DataTableSelectionHeaderCellProps) {
	return <th className={cn(concreteClassNames.dataTableSelectionCell, className)} {...props} />
}

export type DataTableSelectionCellProps = TdHTMLAttributes<HTMLTableCellElement>

export function DataTableSelectionCell({ className, ...props }: DataTableSelectionCellProps) {
	return <td className={cn(concreteClassNames.dataTableSelectionCell, className)} {...props} />
}

export type DataTableSelectionInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function DataTableSelectionInput(props: DataTableSelectionInputProps) {
	return <input type="checkbox" {...props} />
}

export type DataTableSortButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	sortable?: boolean | undefined
	sortDirection?: DataTableSortDirection | undefined
}

export function DataTableSortButton({
	children,
	className,
	sortable = false,
	sortDirection,
	...props
}: DataTableSortButtonProps) {
	return (
		<button
			className={cn(concreteClassNames.dataTableSort, className)}
			disabled={!sortable}
			type="button"
			{...props}
		>
			{children}
			{sortable ? <ConcreteIcon name={getDataTableSortIcon(sortDirection)} /> : null}
		</button>
	)
}

export type DataTableEmptyProps = HTMLAttributes<HTMLDivElement>

export function DataTableEmpty({ className, ...props }: DataTableEmptyProps) {
	return <div className={cn(concreteClassNames.dataTableEmpty, className)} {...props} />
}

export type DataTableEmptyCellProps = HTMLAttributes<HTMLSpanElement>

export function DataTableEmptyCell({ className, ...props }: DataTableEmptyCellProps) {
	return <span className={cn(concreteClassNames.dataTableEmptyCell, className)} {...props} />
}

function getDataTableCellClassName(align: DataTableAlign, frozen: boolean): string {
	return cn(
		align === 'right' && concreteClassNames.dataTableAlignRight,
		align === 'center' && concreteClassNames.dataTableAlignCenter,
		frozen && concreteClassNames.dataTableFrozen
	)
}

function getDataTableSortIcon(sortDirection: DataTableSortDirection | undefined) {
	switch (sortDirection) {
		case 'ascending':
			return 'chevron-up'
		case 'descending':
			return 'chevron-down'
		case undefined:
			return 'chevrons-up-down'
	}
}

function withDataTableMaxHeight(
	style: CSSProperties | undefined,
	maxHeight: string | undefined
): CSSProperties | undefined {
	if (!maxHeight) {
		return style
	}

	return {
		...style,
		'--data-table-max-height': maxHeight
	} as DataTableCustomProperties
}

function withDataTableColumnWidth(
	style: CSSProperties | undefined,
	width: string | undefined
): CSSProperties | undefined {
	if (!width) {
		return style
	}

	return {
		...style,
		'--data-table-column-width': width
	} as DataTableCustomProperties
}
