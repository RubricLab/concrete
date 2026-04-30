import type {
	ComponentRegistryEntry,
	FoundationRegistryEntry,
	PrimitiveRegistryEntry
} from '@rubriclab/concrete'
import {
	InlineCode,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableViewport
} from '@rubriclab/concrete'

type CatalogPropsTableProps = {
	entry: ComponentRegistryEntry | FoundationRegistryEntry | PrimitiveRegistryEntry
}

export function CatalogPropsTable({ entry }: CatalogPropsTableProps) {
	return (
		<TableViewport>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Type</TableHeaderCell>
						<TableHeaderCell>Default</TableHeaderCell>
						<TableHeaderCell>Description</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{entry.props.map(prop => (
						<TableRow key={`${entry.slug}-${prop.name}`}>
							<TableCell>
								<InlineCode>
									{prop.name}
									{prop.required ? ' *' : ''}
								</InlineCode>
							</TableCell>
							<TableCell>
								<InlineCode>{prop.type}</InlineCode>
							</TableCell>
							<TableCell>
								{prop.defaultValue ? <InlineCode>{prop.defaultValue}</InlineCode> : '-'}
							</TableCell>
							<TableCell>{prop.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableViewport>
	)
}
