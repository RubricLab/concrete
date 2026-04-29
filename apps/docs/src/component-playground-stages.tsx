'use client'

import { Button } from '@rubriclab/concrete'
import type { ReactNode } from 'react'

export function FormFooter({ submitLabel = 'Save changes' }: { submitLabel?: string }) {
	return (
		<>
			<Button size="small" variant="secondary">
				Cancel
			</Button>
			<Button size="small">{submitLabel}</Button>
		</>
	)
}

export function ComposerStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageComposer">{children}</div>
}

export function CommandStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageCommand">{children}</div>
}

export function MessageStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageMessage">{children}</div>
}

export function FormStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageForm">{children}</div>
}

export function FormWideStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageWide">{children}</div>
}

export function DataGridStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageDataGrid">{children}</div>
}

export function DataWideStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageData">{children}</div>
}
