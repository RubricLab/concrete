'use client'

import { type ComponentSlug, renderComponentExample } from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { getQueryValue } from '@/playground-controls'
import {
	renderAreaChartPlayground,
	renderBarChartPlayground,
	renderChartPlayground,
	renderDataTablePlayground,
	renderDiagramCanvasPlayground,
	renderDonutChartPlayground,
	renderFlowDiagramPlayground,
	renderHeatmapPlayground,
	renderLineChartPlayground,
	renderMeterPlayground,
	renderMetricCardPlayground,
	renderStackedBarChartPlayground
} from './component-playground-data-renderers'
import {
	renderDatePickerPlayground,
	renderDateRangePickerPlayground,
	renderFileUploadPlayground,
	renderFormDialogPlayground,
	renderFormDrawerPlayground,
	renderFormShellPlayground,
	renderImageUploadPlayground,
	renderMultiSelectPlayground,
	renderNumberStepperPlayground,
	renderPasswordInputPlayground,
	renderRangeSliderPlayground,
	renderSettingsPanelPlayground,
	renderTimePickerPlayground,
	renderValidationSummaryPlayground
} from './component-playground-form-renderers'
import {
	renderCommandMenuPlayground,
	renderComposerPlayground,
	renderSearchBarPlayground,
	renderToolbarPlayground
} from './component-playground-interaction-renderers'
import {
	renderMessagePlayground,
	renderReasoningPlayground,
	renderToolCallPlayground
} from './component-playground-message-renderers'

export function renderPlaygroundComponent(
	slug: ComponentSlug,
	searchParams: URLSearchParams
): ReactNode {
	const state = getQueryValue(searchParams, 'state', 'default')

	switch (slug) {
		case 'area-chart':
			return renderAreaChartPlayground(searchParams)
		case 'bar-chart':
			return renderBarChartPlayground(searchParams)
		case 'chart':
			return renderChartPlayground(searchParams, state)
		case 'toolbar':
			return renderToolbarPlayground(searchParams)
		case 'command-menu':
			return renderCommandMenuPlayground(searchParams, state)
		case 'search-bar':
			return renderSearchBarPlayground(searchParams)
		case 'composer':
			return renderComposerPlayground(searchParams)
		case 'donut-chart':
			return renderDonutChartPlayground(searchParams)
		case 'data-table':
			return renderDataTablePlayground(searchParams, state)
		case 'diagram-canvas':
			return renderDiagramCanvasPlayground(searchParams, state)
		case 'flow-diagram':
			return renderFlowDiagramPlayground(searchParams, state)
		case 'meter':
			return renderMeterPlayground(searchParams)
		case 'heatmap':
			return renderHeatmapPlayground(searchParams)
		case 'line-chart':
			return renderLineChartPlayground(searchParams)
		case 'metric-card':
			return renderMetricCardPlayground(searchParams)
		case 'message':
			return renderMessagePlayground(searchParams)
		case 'reasoning-message':
			return renderReasoningPlayground(searchParams)
		case 'tool-call-message':
			return renderToolCallPlayground(searchParams)
		case 'form-shell':
			return renderFormShellPlayground(searchParams)
		case 'validation-summary':
			return renderValidationSummaryPlayground(searchParams)
		case 'settings-panel':
			return renderSettingsPanelPlayground(searchParams)
		case 'stacked-bar-chart':
			return renderStackedBarChartPlayground(searchParams)
		case 'form-dialog':
			return renderFormDialogPlayground(searchParams)
		case 'form-drawer':
			return renderFormDrawerPlayground(searchParams)
		case 'password-input':
			return renderPasswordInputPlayground(searchParams)
		case 'multi-select':
			return renderMultiSelectPlayground(searchParams)
		case 'date-picker':
			return renderDatePickerPlayground(searchParams)
		case 'date-range-picker':
			return renderDateRangePickerPlayground(searchParams)
		case 'time-picker':
			return renderTimePickerPlayground(searchParams)
		case 'number-stepper':
			return renderNumberStepperPlayground(searchParams)
		case 'range-slider':
			return renderRangeSliderPlayground(searchParams)
		case 'file-upload':
			return renderFileUploadPlayground(searchParams)
		case 'image-upload':
			return renderImageUploadPlayground(searchParams)
		default:
			return renderComponentExample(slug, state)
	}
}
