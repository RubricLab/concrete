import type { HTMLAttributes, ReactNode } from 'react'
import { FieldRow, Panel, Section } from '../../primitives'
import type { FieldStatus } from '../../schemas'

export type SettingsPanelRow = {
	control: ReactNode
	description?: ReactNode | undefined
	id: string
	label: ReactNode
	meta?: ReactNode | undefined
	status?: FieldStatus | undefined
}

export type SettingsPanelSection = {
	description?: ReactNode | undefined
	id: string
	rows: readonly SettingsPanelRow[]
	title: ReactNode
}

export type SettingsPanelProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	actions?: ReactNode | undefined
	className?: string | undefined
	compact?: boolean | undefined
	description?: ReactNode | undefined
	footer?: ReactNode | undefined
	meta?: ReactNode | undefined
	sections: readonly SettingsPanelSection[]
	status?: FieldStatus | undefined
	title: ReactNode
}

export function SettingsPanel({
	actions,
	className,
	compact = true,
	description,
	footer,
	meta,
	sections,
	status = 'default',
	title,
	...props
}: SettingsPanelProps) {
	return (
		<Panel
			actions={actions}
			className={className}
			density={compact ? 'compact' : 'comfortable'}
			description={description}
			footer={footer}
			meta={meta}
			title={title}
			intent={status === 'error' ? 'error' : 'default'}
			{...props}
		>
			{sections.map(section => (
				<Section description={section.description} key={section.id} separated title={section.title}>
					{section.rows.map(row => (
						<FieldRow
							control={row.control}
							description={row.description}
							key={row.id}
							label={row.label}
							meta={row.meta}
							status={row.status}
						/>
					))}
				</Section>
			))}
		</Panel>
	)
}
