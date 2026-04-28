'use client'

import {
	Badge,
	Card,
	CodeBlock,
	Composer,
	type ComposerValue,
	composerExampleValue
} from '@rubriclab/concrete'
import { useMemo, useState } from 'react'

const attachmentSeed = {
	id: 'evaluation-notes',
	meta: '1.8 KB',
	name: 'evaluation-notes.md',
	type: 'file'
} as const

export function ComposerDemo() {
	const [value, setValue] = useState<ComposerValue>(composerExampleValue)
	const [submittedValue, setSubmittedValue] = useState<ComposerValue | null>(null)
	const snapshot = useMemo(
		() =>
			JSON.stringify(
				{
					attachments: value.attachments.map(attachment => attachment.name),
					commands: value.commands.map(command => command.label),
					mentions: value.mentions.map(mention => mention.label),
					text: value.text.trim()
				},
				null,
				2
			),
		[value]
	)

	function addDemoAttachment() {
		setValue(currentValue => {
			if (currentValue.attachments.some(attachment => attachment.id === attachmentSeed.id)) {
				return currentValue
			}

			return {
				...currentValue,
				attachments: [...currentValue.attachments, attachmentSeed]
			}
		})
	}

	return (
		<div className="componentDemo">
			<Composer
				onAttachmentRequest={addDemoAttachment}
				onSubmit={setSubmittedValue}
				onValueChange={setValue}
				value={value}
			/>
			<div className="componentMetricGrid">
				<Card className="componentMetric" title="Value">
					<Badge signal="terminal">{value.text.trim().length} chars</Badge>
					<Badge signal="ultra">{value.mentions.length} mentions</Badge>
					<Badge signal="terminal">{value.commands.length} commands</Badge>
				</Card>
				<Card
					className="componentMetric"
					description={
						submittedValue
							? submittedValue.text.trim() || 'Attachment-only submit.'
							: 'No submit event yet.'
					}
					title="Submit"
				>
					<Badge signal={submittedValue ? 'terminal' : 'ultra'}>
						{submittedValue ? 'captured' : 'waiting'}
					</Badge>
				</Card>
			</div>
			<CodeBlock code={snapshot} language="JSON" showLineNumbers={false} />
		</div>
	)
}
