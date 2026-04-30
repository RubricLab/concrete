import type { ReactNode } from 'react'
import type { IconName } from '../../icons'
import { ToolCallPanel, ToolCodeBlock, ToolOutput } from '../../primitives'
import { Message, type MessageProps } from '../../primitives/internal/message'
import type { MessageStatus, ToolCallStatus } from '../../schemas'

export type ToolCallMessageProps = Omit<
	MessageProps,
	'children' | 'messageRole' | 'status' | 'surface'
> & {
	duration?: ReactNode
	input?: string
	language?: string
	name: ReactNode
	open?: boolean
	output?: ReactNode
	status?: ToolCallStatus
	toolIcon?: IconName
}

export function ToolCallMessage({
	duration,
	input,
	language = 'ts',
	name,
	open,
	output,
	status = 'running',
	toolIcon = 'terminal',
	...props
}: ToolCallMessageProps) {
	return (
		<Message
			messageRole="tool"
			showStatus={false}
			status={getMessageStatusFromToolStatus(status)}
			surface="plain"
			{...props}
		>
			<ToolCallPanel
				duration={duration}
				name={name}
				open={open ?? status === 'running'}
				status={status}
				toolIcon={toolIcon}
			>
				{input ? <ToolCodeBlock code={input} language={language} showLineNumbers={false} /> : null}
				{output ? <ToolOutput>{output}</ToolOutput> : null}
			</ToolCallPanel>
		</Message>
	)
}

function getMessageStatusFromToolStatus(status: ToolCallStatus): MessageStatus {
	switch (status) {
		case 'error':
			return 'error'
		case 'queued':
			return 'pending'
		case 'running':
			return 'streaming'
		case 'success':
			return 'complete'
	}
}
