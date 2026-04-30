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
import { foundationDefinitions } from '../foundations'
import { avatarPrimitiveDefinition } from '../primitives/avatar'
import { badgePrimitiveDefinition } from '../primitives/badge'
import { brandMarkPrimitiveDefinition } from '../primitives/brand-mark'
import { bubblePrimitiveDefinition } from '../primitives/bubble'
import { buttonPrimitiveDefinition } from '../primitives/button'
import { calendarPanelPrimitiveDefinition } from '../primitives/calendar-panel'
import { cardPrimitiveDefinition } from '../primitives/card'
import { caretPrimitiveDefinition } from '../primitives/caret'
import { chartLegendPrimitiveDefinition } from '../primitives/chart-legend'
import { chartSurfacePrimitiveDefinition } from '../primitives/chart-surface'
import { checkboxPrimitiveDefinition } from '../primitives/checkbox'
import { chipPrimitiveDefinition } from '../primitives/chip'
import { codePrimitiveDefinition } from '../primitives/code'
import { composerRailPrimitiveDefinition } from '../primitives/composer-rail'
import { composerShellPrimitiveDefinition } from '../primitives/composer-shell'
import { conceptConnectorPrimitiveDefinition } from '../primitives/concept-connector'
import { conceptFramePrimitiveDefinition } from '../primitives/concept-frame'
import { dataCardHeaderPrimitiveDefinition } from '../primitives/data-card-header'
import { dataTableControlPrimitiveDefinition } from '../primitives/data-table-control'
import { dataTablePaginationPrimitiveDefinition } from '../primitives/data-table-pagination'
import { dataTableShellPrimitiveDefinition } from '../primitives/data-table-shell'
import { deltaPrimitiveDefinition } from '../primitives/delta'
import { diagramControlsPrimitiveDefinition } from '../primitives/diagram-controls'
import { diagramEdgePrimitiveDefinition } from '../primitives/diagram-edge'
import { diagramItemPrimitiveDefinition } from '../primitives/diagram-item'
import { diagramLegendPrimitiveDefinition } from '../primitives/diagram-legend'
import { diagramMiniMapPrimitiveDefinition } from '../primitives/diagram-minimap'
import { diagramNodePrimitiveDefinition } from '../primitives/diagram-node'
import { diagramRailPrimitiveDefinition } from '../primitives/diagram-rail'
import { diagramViewportPrimitiveDefinition } from '../primitives/diagram-viewport'
import { distributionPrimitiveDefinition } from '../primitives/distribution'
import { dividerPrimitiveDefinition } from '../primitives/divider'
import { dropzonePrimitiveDefinition } from '../primitives/dropzone'
import { emptyStatePrimitiveDefinition } from '../primitives/empty-state'
import { feedbackPanelPrimitiveDefinition } from '../primitives/feedback-panel'
import { fieldPrimitiveDefinition } from '../primitives/field'
import { flowNodePrimitiveDefinition } from '../primitives/flow-node'
import { focusRingPrimitiveDefinition } from '../primitives/focus-ring'
import { formLayoutPrimitiveDefinition } from '../primitives/form-layout'
import { formOverlayPrimitiveDefinition } from '../primitives/form-overlay'
import { framePrimitiveDefinition } from '../primitives/frame'
import { iconPrimitiveDefinition } from '../primitives/icon'
import { indicatorPrimitiveDefinition } from '../primitives/indicator'
import { inputPrimitiveDefinition } from '../primitives/input'
import { kbdPrimitiveDefinition } from '../primitives/kbd'
import { linkPrimitiveDefinition } from '../primitives/link'
import { menuShellPrimitiveDefinition } from '../primitives/menu-shell'
import { messageShellPrimitiveDefinition } from '../primitives/message-shell'
import { metricShellPrimitiveDefinition } from '../primitives/metric-shell'
import { optionRowPrimitiveDefinition } from '../primitives/option-row'
import { pickerControlPrimitiveDefinition } from '../primitives/picker-control'
import { pickerShellPrimitiveDefinition } from '../primitives/picker-shell'
import { pillPrimitiveDefinition } from '../primitives/pill'
import { previewStagePrimitiveDefinition } from '../primitives/preview-stage'
import { progressPrimitiveDefinition } from '../primitives/progress'
import { radioPrimitiveDefinition } from '../primitives/radio'
import { rangeControlPrimitiveDefinition } from '../primitives/range-control'
import { reasoningPanelPrimitiveDefinition } from '../primitives/reasoning-panel'
import { rowPrimitiveDefinition } from '../primitives/row'
import { searchFieldPrimitiveDefinition } from '../primitives/search-field'
import { searchTokenPrimitiveDefinition } from '../primitives/search-token'
import { selectPrimitiveDefinition } from '../primitives/select'
import { selectControlPrimitiveDefinition } from '../primitives/select-control'
import { selectMenuPrimitiveDefinition } from '../primitives/select-menu'
import { skeletonPrimitiveDefinition } from '../primitives/skeleton'
import { sliderPrimitiveDefinition } from '../primitives/slider'
import { sparklinePrimitiveDefinition } from '../primitives/sparkline'
import { spinnerPrimitiveDefinition } from '../primitives/spinner'
import { statPrimitiveDefinition } from '../primitives/stat'
import { stepperControlPrimitiveDefinition } from '../primitives/stepper-control'
import { suggestionMenuPrimitiveDefinition } from '../primitives/suggestion-menu'
import { switchPrimitiveDefinition } from '../primitives/switch'
import { tagPrimitiveDefinition } from '../primitives/tag'
import { textareaPrimitiveDefinition } from '../primitives/textarea'
import { texturePrimitiveDefinition } from '../primitives/texture'
import { timeListPrimitiveDefinition } from '../primitives/time-list'
import { toolCallPanelPrimitiveDefinition } from '../primitives/tool-call-panel'
import { toolbarControlPrimitiveDefinition } from '../primitives/toolbar-control'
import { tooltipPrimitiveDefinition } from '../primitives/tooltip'
import { uploadFieldPrimitiveDefinition } from '../primitives/upload-field'
import { uploadItemPrimitiveDefinition } from '../primitives/upload-item'
import { wordmarkPrimitiveDefinition } from '../primitives/wordmark'

export { foundationDefinitions }

export const primitiveDefinitions = [
	buttonPrimitiveDefinition,
	toolbarControlPrimitiveDefinition,
	inputPrimitiveDefinition,
	fieldPrimitiveDefinition,
	searchFieldPrimitiveDefinition,
	searchTokenPrimitiveDefinition,
	menuShellPrimitiveDefinition,
	messageShellPrimitiveDefinition,
	metricShellPrimitiveDefinition,
	formLayoutPrimitiveDefinition,
	formOverlayPrimitiveDefinition,
	feedbackPanelPrimitiveDefinition,
	optionRowPrimitiveDefinition,
	calendarPanelPrimitiveDefinition,
	dropzonePrimitiveDefinition,
	uploadFieldPrimitiveDefinition,
	uploadItemPrimitiveDefinition,
	caretPrimitiveDefinition,
	textareaPrimitiveDefinition,
	selectPrimitiveDefinition,
	checkboxPrimitiveDefinition,
	radioPrimitiveDefinition,
	stepperControlPrimitiveDefinition,
	rangeControlPrimitiveDefinition,
	reasoningPanelPrimitiveDefinition,
	switchPrimitiveDefinition,
	sliderPrimitiveDefinition,
	selectControlPrimitiveDefinition,
	selectMenuPrimitiveDefinition,
	cardPrimitiveDefinition,
	dataCardHeaderPrimitiveDefinition,
	chartSurfacePrimitiveDefinition,
	chartLegendPrimitiveDefinition,
	dataTableShellPrimitiveDefinition,
	dataTableControlPrimitiveDefinition,
	dataTablePaginationPrimitiveDefinition,
	pillPrimitiveDefinition,
	chipPrimitiveDefinition,
	badgePrimitiveDefinition,
	tagPrimitiveDefinition,
	avatarPrimitiveDefinition,
	rowPrimitiveDefinition,
	bubblePrimitiveDefinition,
	codePrimitiveDefinition,
	composerShellPrimitiveDefinition,
	composerRailPrimitiveDefinition,
	conceptFramePrimitiveDefinition,
	conceptConnectorPrimitiveDefinition,
	diagramViewportPrimitiveDefinition,
	diagramControlsPrimitiveDefinition,
	diagramRailPrimitiveDefinition,
	diagramEdgePrimitiveDefinition,
	diagramMiniMapPrimitiveDefinition,
	diagramLegendPrimitiveDefinition,
	diagramNodePrimitiveDefinition,
	diagramItemPrimitiveDefinition,
	flowNodePrimitiveDefinition,
	kbdPrimitiveDefinition,
	spinnerPrimitiveDefinition,
	linkPrimitiveDefinition,
	pickerControlPrimitiveDefinition,
	pickerShellPrimitiveDefinition,
	previewStagePrimitiveDefinition,
	dividerPrimitiveDefinition,
	emptyStatePrimitiveDefinition,
	tooltipPrimitiveDefinition,
	progressPrimitiveDefinition,
	statPrimitiveDefinition,
	deltaPrimitiveDefinition,
	sparklinePrimitiveDefinition,
	distributionPrimitiveDefinition,
	indicatorPrimitiveDefinition,
	skeletonPrimitiveDefinition,
	framePrimitiveDefinition,
	suggestionMenuPrimitiveDefinition,
	texturePrimitiveDefinition,
	timeListPrimitiveDefinition,
	toolCallPanelPrimitiveDefinition,
	brandMarkPrimitiveDefinition,
	wordmarkPrimitiveDefinition,
	iconPrimitiveDefinition,
	focusRingPrimitiveDefinition
] as const

export const componentDefinitions = [
	toolbarComponentDefinition,
	commandMenuComponentDefinition,
	searchBarComponentDefinition,
	formShellComponentDefinition,
	validationSummaryComponentDefinition,
	settingsPanelComponentDefinition,
	formDialogComponentDefinition,
	formDrawerComponentDefinition,
	passwordInputComponentDefinition,
	multiSelectComponentDefinition,
	datePickerComponentDefinition,
	dateRangePickerComponentDefinition,
	timePickerComponentDefinition,
	numberStepperComponentDefinition,
	rangeSliderComponentDefinition,
	fileUploadComponentDefinition,
	imageUploadComponentDefinition,
	metricCardComponentDefinition,
	meterComponentDefinition,
	lineChartComponentDefinition,
	areaChartComponentDefinition,
	barChartComponentDefinition,
	stackedBarChartComponentDefinition,
	donutChartComponentDefinition,
	heatmapComponentDefinition,
	chartComponentDefinition,
	dataTableComponentDefinition,
	flowDiagramComponentDefinition,
	diagramCanvasComponentDefinition,
	messageComponentDefinition,
	reasoningMessageComponentDefinition,
	toolCallMessageComponentDefinition,
	composerComponentDefinition
] as const

export function getPrimitiveDefinition(slug: string) {
	return primitiveDefinitions.find(definition => definition.slug === slug)
}

export function getComponentDefinition(slug: string) {
	return componentDefinitions.find(definition => definition.slug === slug)
}

export function getFoundationDefinition(slug: string) {
	return foundationDefinitions.find(definition => definition.slug === slug)
}
