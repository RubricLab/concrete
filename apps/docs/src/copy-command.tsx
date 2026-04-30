'use client'

import { ConcreteIcon } from '@rubriclab/concrete'
import { useState } from 'react'

type CopyCommandProps = {
	command: string
	label?: string
}

export function CopyCommand({ command, label = 'Copy command' }: CopyCommandProps) {
	const [copied, setCopied] = useState(false)

	async function copyCommand() {
		try {
			await navigator.clipboard.writeText(command)
			setCopied(true)
			window.setTimeout(() => setCopied(false), 1400)
		} catch {
			setCopied(false)
		}
	}

	return (
		<button aria-label={label} className="copyCommand" onClick={copyCommand} type="button">
			<code>{command}</code>
			<span>
				<ConcreteIcon name={copied ? 'check' : 'copy'} />
				{copied ? 'Copied' : 'Copy'}
			</span>
		</button>
	)
}
