import type { ComposerValue } from '../components'
import { areaChartComponentDefinition } from '../components/area-chart'
import { barChartComponentDefinition } from '../components/bar-chart'
import { chartComponentDefinition } from '../components/chart'
import { commandMenuComponentDefinition } from '../components/command-menu'
import { composerComponentDefinition } from '../components/composer'
import { dataTableComponentDefinition } from '../components/data-table'
import { datePickerComponentDefinition } from '../components/date-picker'
import { dateRangePickerComponentDefinition } from '../components/date-range-picker'
import { diagramCanvasComponentDefinition } from '../components/diagram-canvas'
import { donutChartComponentDefinition } from '../components/donut-chart'
import { fileUploadComponentDefinition } from '../components/file-upload'
import { flowDiagramComponentDefinition } from '../components/flow-diagram'
import { formDialogComponentDefinition } from '../components/form-dialog'
import { formDrawerComponentDefinition } from '../components/form-drawer'
import { formShellComponentDefinition } from '../components/form-shell'
import { heatmapComponentDefinition } from '../components/heatmap'
import { imageUploadComponentDefinition } from '../components/image-upload'
import { lineChartComponentDefinition } from '../components/line-chart'
import { messageComponentDefinition } from '../components/message'
import { meterComponentDefinition } from '../components/meter'
import { metricCardComponentDefinition } from '../components/metric-card'
import { multiSelectComponentDefinition } from '../components/multi-select'
import { numberStepperComponentDefinition } from '../components/number-stepper'
import { passwordInputComponentDefinition } from '../components/password-input'
import { rangeSliderComponentDefinition } from '../components/range-slider'
import { reasoningMessageComponentDefinition } from '../components/reasoning-message'
import { searchBarComponentDefinition } from '../components/search-bar'
import { settingsPanelComponentDefinition } from '../components/settings-panel'
import { stackedBarChartComponentDefinition } from '../components/stacked-bar-chart'
import { timePickerComponentDefinition } from '../components/time-picker'
import { toolCallMessageComponentDefinition } from '../components/tool-call-message'
import { toolbarComponentDefinition } from '../components/toolbar'
import { validationSummaryComponentDefinition } from '../components/validation-summary'
import { avatarPrimitiveDefinition } from '../primitives/avatar'
import { badgePrimitiveDefinition } from '../primitives/badge'
import { brandMarkPrimitiveDefinition } from '../primitives/brand-mark'
import { bubblePrimitiveDefinition } from '../primitives/bubble'
import { buttonPrimitiveDefinition } from '../primitives/button'
import { cardPrimitiveDefinition } from '../primitives/card'
import { caretPrimitiveDefinition } from '../primitives/caret'
import { checkboxPrimitiveDefinition } from '../primitives/checkbox'
import { chipPrimitiveDefinition } from '../primitives/chip'
import { codePrimitiveDefinition } from '../primitives/code'
import { conceptConnectorPrimitiveDefinition } from '../primitives/concept-connector'
import { conceptFramePrimitiveDefinition } from '../primitives/concept-frame'
import { deltaPrimitiveDefinition } from '../primitives/delta'
import { diagramItemPrimitiveDefinition } from '../primitives/diagram-item'
import { diagramNodePrimitiveDefinition } from '../primitives/diagram-node'
import { distributionPrimitiveDefinition } from '../primitives/distribution'
import { dividerPrimitiveDefinition } from '../primitives/divider'
import { dropzonePrimitiveDefinition } from '../primitives/dropzone'
import { emptyStatePrimitiveDefinition } from '../primitives/empty-state'
import { fieldPrimitiveDefinition } from '../primitives/field'
import { focusRingPrimitiveDefinition } from '../primitives/focus-ring'
import { framePrimitiveDefinition } from '../primitives/frame'
import { iconPrimitiveDefinition } from '../primitives/icon'
import { indicatorPrimitiveDefinition } from '../primitives/indicator'
import { inputPrimitiveDefinition } from '../primitives/input'
import { kbdPrimitiveDefinition } from '../primitives/kbd'
import { linkPrimitiveDefinition } from '../primitives/link'
import { pillPrimitiveDefinition } from '../primitives/pill'
import { progressPrimitiveDefinition } from '../primitives/progress'
import { radioPrimitiveDefinition } from '../primitives/radio'
import { rowPrimitiveDefinition } from '../primitives/row'
import { selectPrimitiveDefinition } from '../primitives/select'
import { skeletonPrimitiveDefinition } from '../primitives/skeleton'
import { sliderPrimitiveDefinition } from '../primitives/slider'
import { sparklinePrimitiveDefinition } from '../primitives/sparkline'
import { spinnerPrimitiveDefinition } from '../primitives/spinner'
import { statPrimitiveDefinition } from '../primitives/stat'
import { switchPrimitiveDefinition } from '../primitives/switch'
import { tagPrimitiveDefinition } from '../primitives/tag'
import { textareaPrimitiveDefinition } from '../primitives/textarea'
import { texturePrimitiveDefinition } from '../primitives/texture'
import { tooltipPrimitiveDefinition } from '../primitives/tooltip'
import { uploadItemPrimitiveDefinition } from '../primitives/upload-item'
import { wordmarkPrimitiveDefinition } from '../primitives/wordmark'
import type { ComponentRegistryEntry, PrimitiveRegistryEntry } from './types'

export const primitiveRegistry = [
	entryFromDefinition(buttonPrimitiveDefinition),
	entryFromDefinition(inputPrimitiveDefinition),
	entryFromDefinition(fieldPrimitiveDefinition),
	entryFromDefinition(dropzonePrimitiveDefinition),
	entryFromDefinition(uploadItemPrimitiveDefinition),
	entryFromDefinition(caretPrimitiveDefinition),
	entryFromDefinition(textareaPrimitiveDefinition),
	entryFromDefinition(selectPrimitiveDefinition),
	entryFromDefinition(checkboxPrimitiveDefinition),
	entryFromDefinition(radioPrimitiveDefinition),
	entryFromDefinition(switchPrimitiveDefinition),
	entryFromDefinition(sliderPrimitiveDefinition),
	entryFromDefinition(cardPrimitiveDefinition),
	entryFromDefinition(pillPrimitiveDefinition),
	entryFromDefinition(chipPrimitiveDefinition),
	entryFromDefinition(badgePrimitiveDefinition),
	entryFromDefinition(tagPrimitiveDefinition),
	entryFromDefinition(avatarPrimitiveDefinition),
	entryFromDefinition(rowPrimitiveDefinition),
	entryFromDefinition(bubblePrimitiveDefinition),
	entryFromDefinition(codePrimitiveDefinition),
	entryFromDefinition(conceptFramePrimitiveDefinition),
	entryFromDefinition(conceptConnectorPrimitiveDefinition),
	entryFromDefinition(diagramNodePrimitiveDefinition),
	entryFromDefinition(diagramItemPrimitiveDefinition),
	entryFromDefinition(kbdPrimitiveDefinition),
	entryFromDefinition(spinnerPrimitiveDefinition),
	entryFromDefinition(linkPrimitiveDefinition),
	entryFromDefinition(dividerPrimitiveDefinition),
	entryFromDefinition(emptyStatePrimitiveDefinition),
	entryFromDefinition(tooltipPrimitiveDefinition),
	entryFromDefinition(progressPrimitiveDefinition),
	entryFromDefinition(statPrimitiveDefinition),
	entryFromDefinition(deltaPrimitiveDefinition),
	entryFromDefinition(sparklinePrimitiveDefinition),
	entryFromDefinition(distributionPrimitiveDefinition),
	entryFromDefinition(indicatorPrimitiveDefinition),
	entryFromDefinition(skeletonPrimitiveDefinition),
	entryFromDefinition(framePrimitiveDefinition),
	entryFromDefinition(texturePrimitiveDefinition),
	entryFromDefinition(brandMarkPrimitiveDefinition),
	entryFromDefinition(wordmarkPrimitiveDefinition),
	entryFromDefinition(iconPrimitiveDefinition),
	entryFromDefinition(focusRingPrimitiveDefinition)
] as const satisfies readonly PrimitiveRegistryEntry[]

export const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const componentRegistry = [
	componentEntryFromDefinition(toolbarComponentDefinition),
	componentEntryFromDefinition(commandMenuComponentDefinition),
	componentEntryFromDefinition(searchBarComponentDefinition),
	componentEntryFromDefinition(formShellComponentDefinition),
	componentEntryFromDefinition(validationSummaryComponentDefinition),
	componentEntryFromDefinition(settingsPanelComponentDefinition),
	componentEntryFromDefinition(formDialogComponentDefinition),
	componentEntryFromDefinition(formDrawerComponentDefinition),
	componentEntryFromDefinition(passwordInputComponentDefinition),
	componentEntryFromDefinition(multiSelectComponentDefinition),
	componentEntryFromDefinition(datePickerComponentDefinition),
	componentEntryFromDefinition(dateRangePickerComponentDefinition),
	componentEntryFromDefinition(timePickerComponentDefinition),
	componentEntryFromDefinition(numberStepperComponentDefinition),
	componentEntryFromDefinition(rangeSliderComponentDefinition),
	componentEntryFromDefinition(fileUploadComponentDefinition),
	componentEntryFromDefinition(imageUploadComponentDefinition),
	componentEntryFromDefinition(metricCardComponentDefinition),
	componentEntryFromDefinition(meterComponentDefinition),
	componentEntryFromDefinition(lineChartComponentDefinition),
	componentEntryFromDefinition(areaChartComponentDefinition),
	componentEntryFromDefinition(barChartComponentDefinition),
	componentEntryFromDefinition(stackedBarChartComponentDefinition),
	componentEntryFromDefinition(donutChartComponentDefinition),
	componentEntryFromDefinition(heatmapComponentDefinition),
	componentEntryFromDefinition(chartComponentDefinition),
	componentEntryFromDefinition(dataTableComponentDefinition),
	componentEntryFromDefinition(flowDiagramComponentDefinition),
	componentEntryFromDefinition(diagramCanvasComponentDefinition),
	componentEntryFromDefinition(messageComponentDefinition),
	componentEntryFromDefinition(reasoningMessageComponentDefinition),
	componentEntryFromDefinition(toolCallMessageComponentDefinition),
	componentEntryFromDefinition(composerComponentDefinition)
] as const satisfies readonly ComponentRegistryEntry[]

export function getPrimitiveEntry(slug: string): PrimitiveRegistryEntry | undefined {
	return primitiveRegistry.find(entryValue => entryValue.slug === slug)
}

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
	return componentRegistry.find(entryValue => entryValue.slug === slug)
}

function entryFromDefinition(definition: PrimitiveRegistryEntry): PrimitiveRegistryEntry {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states
	}
}

function componentEntryFromDefinition(definition: ComponentRegistryEntry): ComponentRegistryEntry {
	return {
		category: definition.category,
		description: definition.description,
		guidance: definition.guidance,
		name: definition.name,
		pressure: definition.pressure,
		props: definition.props,
		slug: definition.slug,
		states: definition.states
	}
}
