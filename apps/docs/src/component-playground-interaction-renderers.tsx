'use client'

import {
	Button,
	CommandMenu,
	Composer,
	type ComposerValue,
	SearchBar,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { getIconName, getQueryBoolean, getQueryValue } from '@/playground-controls'
import { commandMenuItems, scopedSearchTokens } from './component-playground-fixtures'
import { CommandStage, ComposerStage } from './component-playground-stages'

export function renderToolbarPlayground(searchParams: URLSearchParams): ReactNode {
	const shortcut = getShortcut(searchParams)
	const appearance = getQueryValue(searchParams, 'appearance', 'icon') as 'chip' | 'icon' | 'subtle'
	const label = getQueryValue(searchParams, 'label', 'Search')
	const icon = getIconName(searchParams, 'icon') ?? 'search'

	return (
		<CommandStage>
			<Toolbar compact={getQueryBoolean(searchParams, 'compact', false)} label="Component toolbar">
				<ToolbarGroup>
					<ToolbarButton
						appearance={appearance}
						label={label}
						pressed={getQueryBoolean(searchParams, 'pressed', false)}
						selected={getQueryBoolean(searchParams, 'selected', false)}
						showShortcut="inline"
						toggleable
						{...(appearance === 'subtle' ? {} : { icon })}
						{...(shortcut ? { shortcut } : {})}
					>
						{appearance === 'subtle' ? label.slice(0, 1).toUpperCase() : undefined}
					</ToolbarButton>
					<ToolbarButton icon="filter" label="Filters" showLabel={false} />
					<ToolbarButton icon="settings" label="Settings" showLabel={false} />
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton appearance="subtle" label="Bold" shortcut={['cmd', 'B']} showShortcut="inline">
						B
					</ToolbarButton>
				</ToolbarGroup>
			</Toolbar>
		</CommandStage>
	)
}

export function renderCommandMenuPlayground(
	searchParams: URLSearchParams,
	state: string
): ReactNode {
	return (
		<CommandStage>
			<CommandMenu
				items={state === 'empty' ? [] : commandMenuItems}
				loading={getQueryBoolean(searchParams, 'loading', state === 'loading')}
				query={getQueryValue(searchParams, 'query', state === 'empty' ? 'missing' : 'sligo')}
				searchable={getQueryBoolean(searchParams, 'searchable', true)}
			/>
		</CommandStage>
	)
}

export function renderSearchBarPlayground(searchParams: URLSearchParams): ReactNode {
	const menu = getQueryBoolean(searchParams, 'menu', false)

	return (
		<CommandStage>
			<SearchBar
				actions={
					<Button shortcut={['enter']} size="small" variant="primary">
						Run
					</Button>
				}
				menu={
					menu ? <CommandMenu items={commandMenuItems} query="sligo" searchable={false} /> : undefined
				}
				menuPlacement={menu ? 'inline' : 'popdown'}
				placeholder={getQueryValue(searchParams, 'placeholder', 'Search, ask, or command...')}
				query={getQueryValue(searchParams, 'query', 'triage sligo')}
				tokens={getQueryBoolean(searchParams, 'tokens', true) ? scopedSearchTokens : []}
				wrap={getQueryBoolean(searchParams, 'wrap', false)}
			/>
		</CommandStage>
	)
}

export function renderComposerPlayground(searchParams: URLSearchParams): ReactNode {
	const menuKind = getQueryValue(searchParams, 'menuKind', '')
	const text = getQueryValue(
		searchParams,
		'text',
		'Hey @arihan - can we run /eval triage-v2 against this?'
	)
	const defaultValue = createComposerValue({
		attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
		commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
		mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
		text
	})

	return (
		<ComposerStage>
			<Composer
				defaultMenuQuery={menuKind === 'mention' ? 'a' : ''}
				defaultValue={defaultValue}
				disabled={getQueryBoolean(searchParams, 'disabled', false)}
				placeholder={getQueryValue(searchParams, 'placeholder', 'Write a message...')}
				submitLabel={getQueryValue(searchParams, 'submitLabel', 'Send')}
				{...(menuKind === 'command' || menuKind === 'mention' ? { defaultMenuKind: menuKind } : {})}
			/>
		</ComposerStage>
	)
}

function getShortcut(searchParams: URLSearchParams): readonly string[] | undefined {
	switch (getQueryValue(searchParams, 'shortcut', 'cmd-k')) {
		case 'cmd-enter':
			return ['cmd', 'enter']
		case 'cmd-k':
			return ['cmd', 'K']
		default:
			return undefined
	}
}

function createComposerValue(value: Partial<ComposerValue>): ComposerValue {
	return {
		attachments: value.attachments ?? [],
		commands: value.commands ?? [],
		html: value.html ?? '',
		mentions: value.mentions ?? [],
		text: value.text ?? ''
	}
}
