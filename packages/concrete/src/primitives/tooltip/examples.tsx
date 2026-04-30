import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Frame } from '../frame/component'
import { Tooltip } from './component'

export const tooltipExamples = defineExamples({
	default: {
		description: 'Forced-open hint tooltip.',
		render: () => (
			<Frame>
				<Tooltip content="Use one short sentence." forceOpen>
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
			</Frame>
		)
	},
	rich: {
		description: 'Tooltip with title and shortcut.',
		render: () => (
			<Frame>
				<Tooltip
					content="Search across docs and examples."
					forceOpen
					shortcut={['cmd', 'k']}
					title="Command search"
				>
					<Button variant="secondary">Anchor</Button>
				</Tooltip>
			</Frame>
		)
	}
})
