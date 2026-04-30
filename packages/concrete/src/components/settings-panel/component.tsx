import type { ReactNode } from 'react'
import {
	FormRow,
	FormSection,
	FormShell,
	type FormShellProps
} from '../../primitives/internal/form-shell'
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

export type SettingsPanelProps = Omit<FormShellProps, 'children'> & {
	sections: readonly SettingsPanelSection[]
}

export function SettingsPanel({ sections, ...props }: SettingsPanelProps) {
	return (
		<FormShell compact {...props}>
			{sections.map(section => (
				<FormSection description={section.description} key={section.id} title={section.title}>
					{section.rows.map(row => (
						<FormRow
							control={row.control}
							description={row.description}
							key={row.id}
							label={row.label}
							meta={row.meta}
							status={row.status}
						/>
					))}
				</FormSection>
			))}
		</FormShell>
	)
}
