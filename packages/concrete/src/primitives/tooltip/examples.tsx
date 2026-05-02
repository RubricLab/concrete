import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Tooltip } from './component'

export const tooltipExamples = defineExamples({
	default: {
		description: 'Forced-open hint tooltip.',
		render: () => (
			<>
				<Tooltip content="Use one short sentence." forceOpen>
					<Button hierarchy="secondary">Anchor</Button>
				</Tooltip>
			</>
		)
	},
	rich: {
		description: 'Tooltip with title and shortcut.',
		render: () => (
			<>
				<Tooltip
					content="Search across docs and examples."
					forceOpen
					shortcut={['cmd', 'k']}
					title="Command search"
				>
					<Button hierarchy="secondary">Anchor</Button>
				</Tooltip>
			</>
		)
	}
})
