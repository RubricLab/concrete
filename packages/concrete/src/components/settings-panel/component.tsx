import type { ReactNode } from 'react'
import {
	FormLayoutRow,
	FormLayoutSection,
	FormLayoutShell,
	type FormLayoutShellProps
} from '../../primitives/form-layout'
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

export type SettingsPanelProps = Omit<FormLayoutShellProps, 'children'> & {
	sections: readonly SettingsPanelSection[]
}

export function SettingsPanel({ sections, ...props }: SettingsPanelProps) {
	return (
		<FormLayoutShell compact {...props}>
			{sections.map(section => (
				<FormLayoutSection description={section.description} key={section.id} title={section.title}>
					{section.rows.map(row => (
						<FormLayoutRow
							control={row.control}
							description={row.description}
							key={row.id}
							label={row.label}
							meta={row.meta}
							status={row.status}
						/>
					))}
				</FormLayoutSection>
			))}
		</FormLayoutShell>
	)
}
