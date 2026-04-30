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
import { featureCardComponentDefinition } from '../components/feature-card'
import { fileUploadComponentDefinition } from '../components/file-upload'
import { flowDiagramComponentDefinition } from '../components/flow-diagram'
import { footerComponentDefinition } from '../components/footer'
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
import { navComponentDefinition } from '../components/nav'
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
import { alertPrimitiveDefinition } from '../primitives/alert'
import { avatarPrimitiveDefinition } from '../primitives/avatar'
import { axisPrimitiveDefinition } from '../primitives/axis'
import { badgePrimitiveDefinition } from '../primitives/badge'
import { brandMarkPrimitiveDefinition } from '../primitives/brand-mark'
import { buttonPrimitiveDefinition } from '../primitives/button'
import { calendarGridPrimitiveDefinition } from '../primitives/calendar-grid'
import { cardPrimitiveDefinition } from '../primitives/card'
import { caretPrimitiveDefinition } from '../primitives/caret'
import { chartFramePrimitiveDefinition } from '../primitives/chart-frame'
import { chartGridPrimitiveDefinition } from '../primitives/chart-grid'
import { checkboxPrimitiveDefinition } from '../primitives/checkbox'
import { chipPrimitiveDefinition } from '../primitives/chip'
import { clusterPrimitiveDefinition } from '../primitives/cluster'
import { codePrimitiveDefinition } from '../primitives/code'
import { composerSurfacePrimitiveDefinition } from '../primitives/composer-surface'
import { conceptConnectorPrimitiveDefinition } from '../primitives/concept-connector'
import { conceptFramePrimitiveDefinition } from '../primitives/concept-frame'
import { containerPrimitiveDefinition } from '../primitives/container'
import { controlGroupPrimitiveDefinition } from '../primitives/control-group'
import { dataSurfacePrimitiveDefinition } from '../primitives/data-surface'
import { deltaPrimitiveDefinition } from '../primitives/delta'
import { diagramControlsPrimitiveDefinition } from '../primitives/diagram-controls'
import { diagramEdgePrimitiveDefinition } from '../primitives/diagram-edge'
import { diagramItemPrimitiveDefinition } from '../primitives/diagram-item'
import { diagramLegendPrimitiveDefinition } from '../primitives/diagram-legend'
import { diagramMiniMapPrimitiveDefinition } from '../primitives/diagram-minimap'
import { diagramNodePrimitiveDefinition } from '../primitives/diagram-node'
import { diagramRailPrimitiveDefinition } from '../primitives/diagram-rail'
import { diagramViewportPrimitiveDefinition } from '../primitives/diagram-viewport'
import { dialogSurfacePrimitiveDefinition } from '../primitives/dialog-surface'
import { disclosurePanelPrimitiveDefinition } from '../primitives/disclosure-panel'
import { distributionPrimitiveDefinition } from '../primitives/distribution'
import { dividerPrimitiveDefinition } from '../primitives/divider'
import { dockPrimitiveDefinition } from '../primitives/dock'
import { donutRingPrimitiveDefinition } from '../primitives/donut-ring'
import { drawerSurfacePrimitiveDefinition } from '../primitives/drawer-surface'
import { dropzonePrimitiveDefinition } from '../primitives/dropzone'
import { emptyStatePrimitiveDefinition } from '../primitives/empty-state'
import { fieldPrimitiveDefinition } from '../primitives/field'
import { fieldRowPrimitiveDefinition } from '../primitives/field-row'
import { flowNodePrimitiveDefinition } from '../primitives/flow-node'
import { framePrimitiveDefinition } from '../primitives/frame'
import { gridPrimitiveDefinition } from '../primitives/grid'
import { headerPrimitiveDefinition } from '../primitives/header'
import { headingPrimitiveDefinition } from '../primitives/heading'
import { heatmapGridPrimitiveDefinition } from '../primitives/heatmap-grid'
import { iconPrimitiveDefinition } from '../primitives/icon'
import { iconButtonPrimitiveDefinition } from '../primitives/icon-button'
import { indicatorPrimitiveDefinition } from '../primitives/indicator'
import { inlinePrimitiveDefinition } from '../primitives/inline'
import { inputPrimitiveDefinition } from '../primitives/input'
import { kbdPrimitiveDefinition } from '../primitives/kbd'
import { labelPrimitiveDefinition } from '../primitives/label'
import { legendPrimitiveDefinition } from '../primitives/legend'
import { linkPrimitiveDefinition } from '../primitives/link'
import { listboxPrimitiveDefinition } from '../primitives/listbox'
import { menuGroupPrimitiveDefinition } from '../primitives/menu-group'
import { menuSurfacePrimitiveDefinition } from '../primitives/menu-surface'
import { messageBubblePrimitiveDefinition } from '../primitives/message-bubble'
import { optionRowPrimitiveDefinition } from '../primitives/option-row'
import { overlayPrimitiveDefinition } from '../primitives/overlay'
import { paginationPrimitiveDefinition } from '../primitives/pagination'
import { panelPrimitiveDefinition } from '../primitives/panel'
import { pickerButtonPrimitiveDefinition } from '../primitives/picker-button'
import { pickerSurfacePrimitiveDefinition } from '../primitives/picker-surface'
import { pillPrimitiveDefinition } from '../primitives/pill'
import { plotPrimitiveDefinition } from '../primitives/plot'
import { progressPrimitiveDefinition } from '../primitives/progress'
import { radioPrimitiveDefinition } from '../primitives/radio'
import { railPrimitiveDefinition } from '../primitives/rail'
import { rangePrimitiveDefinition } from '../primitives/range'
import { rowPrimitiveDefinition } from '../primitives/row'
import { scaleFramePrimitiveDefinition } from '../primitives/scale-frame'
import { scrollAreaPrimitiveDefinition } from '../primitives/scroll-area'
import { searchInputPrimitiveDefinition } from '../primitives/search-input'
import { sectionPrimitiveDefinition } from '../primitives/section'
import { selectPrimitiveDefinition } from '../primitives/select'
import { seriesBarPrimitiveDefinition } from '../primitives/series-bar'
import { seriesLinePrimitiveDefinition } from '../primitives/series-line'
import { seriesPointPrimitiveDefinition } from '../primitives/series-point'
import { skeletonPrimitiveDefinition } from '../primitives/skeleton'
import { sliderPrimitiveDefinition } from '../primitives/slider'
import { sparklinePrimitiveDefinition } from '../primitives/sparkline'
import { spinnerPrimitiveDefinition } from '../primitives/spinner'
import { splitPrimitiveDefinition } from '../primitives/split'
import { stackPrimitiveDefinition } from '../primitives/stack'
import { statPrimitiveDefinition } from '../primitives/stat'
import { stepperPrimitiveDefinition } from '../primitives/stepper'
import { surfacePrimitiveDefinition } from '../primitives/surface'
import { switchPrimitiveDefinition } from '../primitives/switch'
import { tablePrimitiveDefinition } from '../primitives/table'
import { tagPrimitiveDefinition } from '../primitives/tag'
import { targetLinePrimitiveDefinition } from '../primitives/target-line'
import { textPrimitiveDefinition } from '../primitives/text'
import { textareaPrimitiveDefinition } from '../primitives/textarea'
import { tiltFramePrimitiveDefinition } from '../primitives/tilt-frame'
import { timeListPrimitiveDefinition } from '../primitives/time-list'
import { tokenPrimitiveDefinition } from '../primitives/token'
import { tokenRailPrimitiveDefinition } from '../primitives/token-rail'
import { toolCallPanelPrimitiveDefinition } from '../primitives/tool-call-panel'
import { toolbarControlPrimitiveDefinition } from '../primitives/toolbar-control'
import { tooltipPrimitiveDefinition } from '../primitives/tooltip'
import { tracePanelPrimitiveDefinition } from '../primitives/trace-panel'
import { transcriptItemPrimitiveDefinition } from '../primitives/transcript-item'
import { uploadFieldPrimitiveDefinition } from '../primitives/upload-field'
import { uploadItemPrimitiveDefinition } from '../primitives/upload-item'
import { validationListPrimitiveDefinition } from '../primitives/validation-list'
import { wordmarkPrimitiveDefinition } from '../primitives/wordmark'

export { foundationDefinitions }

export const primitiveDefinitions = [
	buttonPrimitiveDefinition,
	toolbarControlPrimitiveDefinition,
	inputPrimitiveDefinition,
	fieldPrimitiveDefinition,
	stackPrimitiveDefinition,
	inlinePrimitiveDefinition,
	clusterPrimitiveDefinition,
	containerPrimitiveDefinition,
	gridPrimitiveDefinition,
	splitPrimitiveDefinition,
	scrollAreaPrimitiveDefinition,
	dockPrimitiveDefinition,
	railPrimitiveDefinition,
	surfacePrimitiveDefinition,
	panelPrimitiveDefinition,
	sectionPrimitiveDefinition,
	headerPrimitiveDefinition,
	textPrimitiveDefinition,
	headingPrimitiveDefinition,
	labelPrimitiveDefinition,
	iconButtonPrimitiveDefinition,
	controlGroupPrimitiveDefinition,
	fieldRowPrimitiveDefinition,
	tokenPrimitiveDefinition,
	searchInputPrimitiveDefinition,
	pickerButtonPrimitiveDefinition,
	pickerSurfacePrimitiveDefinition,
	menuSurfacePrimitiveDefinition,
	menuGroupPrimitiveDefinition,
	listboxPrimitiveDefinition,
	overlayPrimitiveDefinition,
	dialogSurfacePrimitiveDefinition,
	drawerSurfacePrimitiveDefinition,
	alertPrimitiveDefinition,
	validationListPrimitiveDefinition,
	disclosurePanelPrimitiveDefinition,
	dataSurfacePrimitiveDefinition,
	transcriptItemPrimitiveDefinition,
	messageBubblePrimitiveDefinition,
	optionRowPrimitiveDefinition,
	calendarGridPrimitiveDefinition,
	dropzonePrimitiveDefinition,
	uploadFieldPrimitiveDefinition,
	uploadItemPrimitiveDefinition,
	caretPrimitiveDefinition,
	textareaPrimitiveDefinition,
	selectPrimitiveDefinition,
	checkboxPrimitiveDefinition,
	radioPrimitiveDefinition,
	stepperPrimitiveDefinition,
	rangePrimitiveDefinition,
	tracePanelPrimitiveDefinition,
	switchPrimitiveDefinition,
	sliderPrimitiveDefinition,
	cardPrimitiveDefinition,
	chartFramePrimitiveDefinition,
	plotPrimitiveDefinition,
	chartGridPrimitiveDefinition,
	axisPrimitiveDefinition,
	targetLinePrimitiveDefinition,
	seriesLinePrimitiveDefinition,
	seriesPointPrimitiveDefinition,
	seriesBarPrimitiveDefinition,
	donutRingPrimitiveDefinition,
	heatmapGridPrimitiveDefinition,
	legendPrimitiveDefinition,
	tablePrimitiveDefinition,
	paginationPrimitiveDefinition,
	pillPrimitiveDefinition,
	chipPrimitiveDefinition,
	badgePrimitiveDefinition,
	tagPrimitiveDefinition,
	avatarPrimitiveDefinition,
	rowPrimitiveDefinition,
	codePrimitiveDefinition,
	composerSurfacePrimitiveDefinition,
	tokenRailPrimitiveDefinition,
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
	timeListPrimitiveDefinition,
	toolCallPanelPrimitiveDefinition,
	tiltFramePrimitiveDefinition,
	scaleFramePrimitiveDefinition,
	brandMarkPrimitiveDefinition,
	wordmarkPrimitiveDefinition,
	iconPrimitiveDefinition
] as const

export const componentDefinitions = [
	navComponentDefinition,
	footerComponentDefinition,
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
	featureCardComponentDefinition,
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
