import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { BrandMark, Cluster, Container, Inline, Surface, Text, TextLink } from '../../primitives'

type NavElementProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'style'>

export type NavItem = {
	current?: boolean | undefined
	external?: boolean | undefined
	href: string
	id: string
	label: ReactNode
}

export type NavProps = NavElementProps & {
	actions?: readonly NavItem[] | undefined
	activeId?: string | undefined
	brand?: ReactNode | undefined
	brandHref?: string | undefined
	density?: Density | undefined
	items: readonly NavItem[]
	label?: string | undefined
}

export function Nav({
	actions = [],
	activeId,
	brand,
	brandHref = '/',
	density = 'compact',
	items,
	label = 'Primary',
	...props
}: NavProps) {
	return (
		<Surface aria-label={label} as="nav" density={density} depth="flat" tone="default" {...props}>
			<Container density={density} measure="wide">
				<Cluster density={density} justify="between">
					{renderBrand(brand, brandHref)}
					<Cluster density={density}>{items.map(item => renderNavItem(item, activeId))}</Cluster>
					{actions.length > 0 ? (
						<Cluster density={density}>{actions.map(item => renderNavItem(item, activeId))}</Cluster>
					) : null}
				</Cluster>
			</Container>
		</Surface>
	)
}

function renderBrand(brand: ReactNode | undefined, brandHref: string): ReactNode {
	const content = brand ?? (
		<Inline density="compact">
			<BrandMark />
			<Text tone="strong">Concrete</Text>
		</Inline>
	)

	return (
		<TextLink href={brandHref} variant="nav">
			{content}
		</TextLink>
	)
}

function renderNavItem(item: NavItem, activeId: string | undefined): ReactNode {
	const current = item.current ?? item.id === activeId

	return (
		<TextLink
			current={current}
			href={item.href}
			key={item.id}
			variant="nav"
			{...(item.external ? { external: true } : {})}
		>
			{item.label}
		</TextLink>
	)
}
