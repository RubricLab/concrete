import type { ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import { CodeBlock, Spinner } from '../../primitives'
import { Message, type MessageProps } from '../../primitives/internal/message'
import type { MessageStatus, ToolCallStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'

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
			<details
				className={concreteClassNames.toolCall}
				data-status={status}
				open={open ?? status === 'running'}
			>
				<summary>
					<span>
						<ConcreteIcon name={toolIcon} />
						<b>{name}</b>
					</span>
					<span>
						<span className={concreteClassNames.toolCallStatus} data-status={status}>
							<ToolStatusIcon status={status} />
							{status}
						</span>
						{duration ? <small>{duration}</small> : null}
						<ConcreteIcon name="chevron-down" />
					</span>
				</summary>
				<div className={concreteClassNames.toolCallBody}>
					{input ? (
						<CodeBlock
							className={concreteClassNames.toolCodeBlock}
							code={input}
							language={language}
							showLineNumbers={false}
						/>
					) : null}
					{output ? <div className={concreteClassNames.toolOutput}>{output}</div> : null}
				</div>
			</details>
		</Message>
	)
}

function ToolStatusIcon({ status }: { status: ToolCallStatus }) {
	switch (status) {
		case 'error':
			return <ConcreteIcon name="circle-alert" />
		case 'queued':
			return <ConcreteIcon name="clock" />
		case 'running':
			return <Spinner size={11} tone="default" />
		case 'success':
			return <ConcreteIcon name="check" />
	}
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
