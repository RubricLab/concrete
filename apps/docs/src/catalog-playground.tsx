'use client'

import type { ControlDefinition, PrimitiveState } from '@rubriclab/concrete'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { PropControl } from '@/playground-controls'
import { getQueryValue } from '@/playground-query'

type CatalogPlaygroundProps = {
	controls: readonly ControlDefinition[]
	preview: ReactNode
	previewClassName?: string
	shellClassName?: string
	states: readonly PrimitiveState[]
}

export function CatalogPlayground({
	controls,
	preview,
	previewClassName = '',
	shellClassName = '',
	states
}: CatalogPlaygroundProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const stateValue = getQueryValue(searchParams, 'state', 'default')

	function updateQueryParameter(name: string, value: string, defaultValue: string) {
		const nextSearchParams = new URLSearchParams(searchParams.toString())

		if (value === defaultValue || value.length === 0) {
			nextSearchParams.delete(name)
		} else {
			nextSearchParams.set(name, value)
		}

		const queryString = nextSearchParams.toString()
		router.replace(queryString.length > 0 ? `${pathname}?${queryString}` : pathname, {
			scroll: false
		})
	}

	return (
		<div className={['playgroundShell', shellClassName].filter(Boolean).join(' ')}>
			<div
				className={['playgroundPreview', previewClassName].filter(Boolean).join(' ')}
				key={searchParams.toString()}
			>
				{preview}
			</div>
			<form className="playgroundControls">
				<PropControl
					control={{
						defaultValue: 'default',
						label: 'State',
						name: 'state',
						options: states.map(state => ({
							label: state.name,
							value: state.query
						})),
						type: 'select'
					}}
					onChange={updateQueryParameter}
					value={stateValue}
				/>
				{controls.map(control => (
					<PropControl
						control={control}
						key={control.name}
						onChange={updateQueryParameter}
						value={getQueryValue(searchParams, control.name, control.defaultValue)}
					/>
				))}
			</form>
		</div>
	)
}
