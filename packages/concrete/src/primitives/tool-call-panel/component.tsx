import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { ToolCallStatus } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { CodeBlock, type CodeBlockProps } from '../code'
import { Spinner } from '../spinner'
import { cn } from '../utils'

export type ToolCallPanelProps = Omit<
	DetailsHTMLAttributes<HTMLDetailsElement>,
	'children' | 'name'
> & {
	children?: ReactNode
	duration?: ReactNode
	name: ReactNode
	status?: ToolCallStatus | undefined
	toolIcon?: IconName | undefined
}

export type ToolCallStatusChipProps = HTMLAttributes<HTMLSpanElement> & {
	status: ToolCallStatus
}

export type ToolCallBodyProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type ToolOutputProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type ToolCodeBlockProps = Omit<CodeBlockProps, 'className'> & {
	className?: string | undefined
}

export function ToolCallPanel({
	children,
	className,
	duration,
	name,
	status = 'running',
	toolIcon = 'terminal',
	...props
}: ToolCallPanelProps) {
	return (
		<details className={cn(concreteClassNames.toolCall, className)} data-status={status} {...props}>
			<summary>
				<span>
					<ConcreteIcon name={toolIcon} />
					<b>{name}</b>
				</span>
				<span>
					<ToolCallStatusChip status={status} />
					{duration ? <small>{duration}</small> : null}
					<ConcreteIcon name="chevron-down" />
				</span>
			</summary>
			{children ? <ToolCallBody>{children}</ToolCallBody> : null}
		</details>
	)
}

export function ToolCallStatusChip({ className, status, ...props }: ToolCallStatusChipProps) {
	return (
		<span
			className={cn(concreteClassNames.toolCallStatus, className)}
			data-status={status}
			{...props}
		>
			<ToolStatusIcon status={status} />
			{status}
		</span>
	)
}

export function ToolCallBody({ children, className, ...props }: ToolCallBodyProps) {
	return (
		<div className={cn(concreteClassNames.toolCallBody, className)} {...props}>
			{children}
		</div>
	)
}

export function ToolOutput({ children, className, ...props }: ToolOutputProps) {
	return (
		<div className={cn(concreteClassNames.toolOutput, className)} {...props}>
			{children}
		</div>
	)
}

export function ToolCodeBlock({ className, ...props }: ToolCodeBlockProps) {
	return <CodeBlock className={cn(concreteClassNames.toolCodeBlock, className)} {...props} />
}

function ToolStatusIcon({ status }: { status: ToolCallStatus }) {
	switch (status) {
		case 'error':
			return <ConcreteIcon name="circle-alert" />
		case 'queued':
			return <ConcreteIcon name="clock" />
		case 'running':
			return <Spinner density="compact" />
		case 'success':
			return <ConcreteIcon name="check" />
	}
}
