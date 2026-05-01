import { Badge, Chip, Cluster, Frame, Header, Panel, Stack, TextLink } from '@rubriclab/concrete'
import type { ReactNode } from 'react'

type CatalogCardProps = {
	category: string
	children: ReactNode
	description: string
	href: string
	name: string
	pressure: readonly string[]
	states: number
}

export function CatalogCard({
	category,
	children,
	description,
	href,
	name,
	pressure,
	states
}: CatalogCardProps) {
	return (
		<Panel
			description={description}
			footer={
				<TextLink href={href} purpose="nav">
					Open
				</TextLink>
			}
			meta={<Badge intent="terminal">{category}</Badge>}
			title={name}
		>
			<Stack density="compact">
				<Frame align="center" scale="standard" texture="field">
					{children}
				</Frame>
				<Cluster density="compact">
					<Chip>{states} states</Chip>
					{pressure.map(pressureName => (
						<Chip key={pressureName}>{pressureName}</Chip>
					))}
				</Cluster>
			</Stack>
		</Panel>
	)
}

type CatalogIntroProps = {
	count: number
	description: string
	eyebrow: string
	title: string
}

export function CatalogIntro({ count, description, eyebrow, title }: CatalogIntroProps) {
	return (
		<Header
			description={description}
			eyebrow={eyebrow}
			level="1"
			meta={<Badge intent="terminal">{count} registered</Badge>}
			title={title}
		/>
	)
}
