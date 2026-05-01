import {
	Badge,
	Chip,
	CodeBlock,
	Container,
	componentRegistry,
	foundationRegistry,
	Grid,
	InlineCode,
	Panel,
	primitiveRegistry,
	renderComponentExample,
	renderFoundationExample,
	renderPrimitiveExample,
	Section,
	Stack,
	Stat,
	Surface,
	Text,
	TextLink
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'

export default function HomeRoute() {
	return (
		<Container as="main" density="editorial" measure="wide">
			<Stack density="editorial">
				<Panel
					actions={
						<TextLink href="/components" purpose="nav">
							Open catalog
						</TextLink>
					}
					description="Concrete is Rubric Labs' design system for research writing, dense product surfaces, generated interfaces, agent workflows, and educational explainers."
					meta={<Badge intent="terminal">AI-native</Badge>}
					title="Soft, powerful, compact software."
				>
					<Stack density="editorial">
						<Grid columns="three">
							<Stat label="Foundations" value={foundationRegistry.length} />
							<Stat label="Primitives" value={primitiveRegistry.length} />
							<Stat label="Components" value={componentRegistry.length} />
						</Grid>
						<CodeBlock code="npm install @rubriclab/concrete" language="Shell" mode="command" />
					</Stack>
				</Panel>

				<Section
					description="Foundations are value systems: colors, typography, spacing, sizing, layout, radii, elevation, motion, textures, iconography, state, and accessibility."
					title="Foundations define the language."
				>
					<Grid columns="three">
						{foundationRegistry.map(entry => (
							<RegistryCard
								category={entry.category}
								description={entry.description}
								href={`/foundations/${entry.slug}`}
								key={entry.slug}
								name={entry.name}
								preview={renderFoundationExample(entry.slug)}
								pressure={entry.pressure}
								states={entry.states.length}
							/>
						))}
					</Grid>
				</Section>

				<Section
					description="Primitives own DOM, classes, ARIA, local token-backed CSS, schemas, examples, and render input. They are the atomic vocabulary."
					title="Primitives carry the brand."
				>
					<Grid>
						{primitiveRegistry.map(entry => (
							<RegistryCard
								category={entry.category}
								description={entry.description}
								href={`/primitives/${entry.slug}`}
								key={entry.slug}
								name={entry.name}
								preview={renderPrimitiveExample(entry.slug)}
								pressure={entry.pressure}
								states={entry.states.length}
							/>
						))}
					</Grid>
				</Section>

				<Section
					description="Components assemble primitives into useful product patterns without owning a local visual system."
					title="Components compose workflows."
				>
					<Grid>
						{componentRegistry.map(entry => (
							<RegistryCard
								category={entry.category}
								description={entry.description}
								href={`/components/${entry.slug}`}
								key={entry.slug}
								name={entry.name}
								preview={renderComponentExample(entry.slug)}
								pressure={entry.pressure}
								states={entry.states.length}
							/>
						))}
					</Grid>
				</Section>

				<Section
					description="Apps should import Concrete, choose pressure at composition time, and use registry metadata when building docs, screenshots, or generated UI."
					title="Public package surface."
				>
					<Grid columns="three">
						<Surface depth="sunken">
							<Stack density="compact">
								<Text intent="strong">Install</Text>
								<CodeBlock code="npm install @rubriclab/concrete" language="Shell" mode="command" />
							</Stack>
						</Surface>
						<Surface depth="sunken">
							<Stack density="compact">
								<Text intent="strong">Import</Text>
								<InlineCode>@rubriclab/concrete</InlineCode>
								<InlineCode>@rubriclab/concrete/styles.css</InlineCode>
							</Stack>
						</Surface>
						<Surface depth="sunken">
							<Stack density="compact">
								<Text intent="strong">Render</Text>
								<TextLink href="/render/primitive/button">/render/primitive/button</TextLink>
								<TextLink href="/render/component/nav">/render/component/nav</TextLink>
							</Stack>
						</Surface>
					</Grid>
				</Section>
			</Stack>
		</Container>
	)
}

type RegistryCardProps = {
	category: string
	description: string
	href: string
	name: string
	pressure: readonly string[]
	preview: ReactNode
	states: number
}

function RegistryCard({
	category,
	description,
	href,
	name,
	pressure,
	preview,
	states
}: RegistryCardProps) {
	return (
		<Panel
			description={description}
			footer={
				<TextLink href={href} purpose="nav">
					Open
				</TextLink>
			}
			meta={
				<Stack density="compact">
					<Badge intent="terminal">{category}</Badge>
					<Text purpose="caption" intent="muted">
						{states} states
					</Text>
				</Stack>
			}
			title={name}
		>
			<Stack density="compact">
				<Surface depth="sunken">
					<Stack align="center">{preview}</Stack>
				</Surface>
				<Stack density="compact">
					{pressure.map(value => (
						<Chip key={value}>{value}</Chip>
					))}
				</Stack>
			</Stack>
		</Panel>
	)
}
