import type { ComponentRegistryEntry, PrimitiveRegistryEntry } from '@rubriclab/concrete'

type CatalogPropsTableProps = {
	entry: ComponentRegistryEntry | PrimitiveRegistryEntry
}

export function CatalogPropsTable({ entry }: CatalogPropsTableProps) {
	return (
		<table className="propsTable">
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{entry.props.map(prop => (
					<tr key={`${entry.slug}-${prop.name}`}>
						<td>
							<code>
								{prop.name}
								{prop.required ? ' *' : ''}
							</code>
						</td>
						<td>
							<code>{prop.type}</code>
						</td>
						<td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : '-'}</td>
						<td>{prop.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
