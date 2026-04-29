'use client'

import {
	Message,
	ReasoningMessage,
	Toolbar,
	ToolbarButton,
	ToolCallMessage
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { getQueryBoolean, getQueryValue } from '@/playground-controls'
import { reasoningSteps } from './component-playground-fixtures'
import { MessageStage } from './component-playground-stages'

export function renderMessagePlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<Message
				actions={
					<Toolbar compact label="Message actions">
						<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
						<ToolbarButton icon="refresh-ccw" label="Retry" showLabel={false} tooltipPlacement="bottom" />
					</Toolbar>
				}
				author={getQueryValue(searchParams, 'author', 'Rubric')}
				avatarInitials="RL"
				messageRole={
					getQueryValue(searchParams, 'messageRole', 'assistant') as
						| 'assistant'
						| 'system'
						| 'tool'
						| 'user'
				}
				showAvatar={getQueryBoolean(searchParams, 'showAvatar', true)}
				status={
					getQueryValue(searchParams, 'status', 'complete') as
						| 'complete'
						| 'error'
						| 'pending'
						| 'streaming'
				}
				surface={getQueryValue(searchParams, 'surface', 'bubble') as 'bubble' | 'plain'}
			>
				{getQueryValue(searchParams, 'body', 'The run is failing during schema hydration.')}
			</Message>
		</MessageStage>
	)
}

export function renderReasoningPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<ReasoningMessage
				open={getQueryBoolean(searchParams, 'open', true)}
				status={
					getQueryValue(searchParams, 'status', 'streaming') as
						| 'complete'
						| 'error'
						| 'pending'
						| 'streaming'
				}
				steps={reasoningSteps}
				summary={getQueryValue(
					searchParams,
					'summary',
					'Checking context and selecting the next deterministic action.'
				)}
				title={getQueryValue(searchParams, 'title', 'Thinking')}
			/>
		</MessageStage>
	)
}

export function renderToolCallPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<ToolCallMessage
				duration={getQueryValue(searchParams, 'duration', '1.8s')}
				input={getQueryValue(searchParams, 'input', 'rg -n "composer" @rubriclab/concrete')}
				name={getQueryValue(searchParams, 'name', 'search workspace')}
				open={getQueryBoolean(searchParams, 'open', true)}
				output={getQueryValue(searchParams, 'output', '7 tests passed. TypeScript clean.')}
				status={
					getQueryValue(searchParams, 'status', 'running') as 'error' | 'queued' | 'running' | 'success'
				}
			/>
		</MessageStage>
	)
}
