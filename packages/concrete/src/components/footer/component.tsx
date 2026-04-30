import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import {
	Cluster,
	Container,
	Grid,
	Header,
	Label,
	Stack,
	Surface,
	Text,
	TextLink
} from '../../primitives'

type FooterElementProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'style' | 'title'>

export type FooterLink = {
	external?: boolean | undefined
	href: string
	id: string
	label: ReactNode
}

export type FooterColumn = {
	id: string
	links: readonly FooterLink[]
	title: ReactNode
}

export type FooterProps = FooterElementProps & {
	actions?: readonly FooterLink[] | undefined
	aside?: ReactNode | undefined
	brand?: ReactNode | undefined
	columns?: readonly FooterColumn[] | undefined
	density?: Density | undefined
	description?: ReactNode | undefined
	meta?: ReactNode | undefined
	title?: ReactNode | undefined
}

export function Footer({
	actions = [],
	aside,
	brand,
	columns = [],
	density = 'compact',
	description,
	meta,
	title,
	...props
}: FooterProps) {
	return (
		<Surface as="footer" density={density} depth="flat" tone="muted" {...props}>
			<Container density={density} measure="wide">
				<Stack density={density}>
					<Stack density={density}>
						{brand ? <Text tone="strong">{brand}</Text> : null}
						<Header density={density} description={description} meta={meta} title={title} />
					</Stack>
					{aside ? <Surface depth="sunken">{aside}</Surface> : null}
					{columns.length > 0 ? (
						<Grid columns="three" density={density}>
							{columns.map(column => (
								<Stack density={density} key={column.id}>
									<Label tone="sunken">{column.title}</Label>
									<Stack density="compact">
										{column.links.map(link => (
											<TextLink
												href={link.href}
												key={link.id}
												variant="nav"
												{...(link.external ? { external: true } : {})}
											>
												{link.label}
											</TextLink>
										))}
									</Stack>
								</Stack>
							))}
						</Grid>
					) : null}
					{actions.length > 0 ? (
						<Cluster density={density}>
							{actions.map(action => (
								<TextLink
									href={action.href}
									key={action.id}
									variant="nav"
									{...(action.external ? { external: true } : {})}
								>
									{action.label}
								</TextLink>
							))}
						</Cluster>
					) : null}
				</Stack>
			</Container>
		</Surface>
	)
}
