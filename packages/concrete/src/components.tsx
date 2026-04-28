import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'
import { Icon, type IconName } from './icons'

export type ConcreteTone = 'neutral' | 'sky' | 'terminal' | 'ultra' | 'error'
export type ConcreteSize = 'sm' | 'md' | 'lg'
export type ConcreteDensity = 'compact' | 'comfortable'

type ClassValue = string | false | null | undefined
type StyleWithVariable = CSSProperties & Record<`--${string}`, string | number | undefined>

export function concreteClassName(...values: readonly ClassValue[]): string {
	return values
		.filter((value): value is string => typeof value === 'string' && value.length > 0)
		.join(' ')
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	leadingIcon?: IconName
	size?: ConcreteSize
	tone?: ConcreteTone
	trailingIcon?: IconName
	variant?: 'solid' | 'soft' | 'outline' | 'ghost'
}

export function Button({
	children,
	className,
	leadingIcon,
	size = 'md',
	tone = 'neutral',
	trailingIcon,
	type = 'button',
	variant = 'solid',
	...props
}: ButtonProps) {
	return (
		<button
			className={concreteClassName('concrete-button', className)}
			data-concrete-size={size}
			data-concrete-tone={tone}
			data-concrete-variant={variant}
			type={type}
			{...props}
		>
			{leadingIcon ? <Icon name={leadingIcon} /> : null}
			<span>{children}</span>
			{trailingIcon ? <Icon name={trailingIcon} /> : null}
		</button>
	)
}

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
	size?: ConcreteSize
}

export function Input({ className, size = 'md', type = 'text', ...props }: InputProps) {
	return (
		<input
			className={concreteClassName('concrete-input', className)}
			data-concrete-size={size}
			type={type}
			{...props}
		/>
	)
}

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
	size?: ConcreteSize
}

export function Textarea({ className, size = 'md', ...props }: TextareaProps) {
	return (
		<textarea
			className={concreteClassName('concrete-textarea', className)}
			data-concrete-size={size}
			{...props}
		/>
	)
}

export interface SelectChoice {
	disabled?: boolean
	label: string
	value: string
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
	choices?: readonly SelectChoice[]
	size?: ConcreteSize
}

export function Select({ children, choices, className, size = 'md', ...props }: SelectProps) {
	return (
		<span className="concrete-select-shell" data-concrete-size={size}>
			<select className={concreteClassName('concrete-select', className)} {...props}>
				{choices
					? choices.map(choice => (
							<option disabled={choice.disabled} key={choice.value} value={choice.value}>
								{choice.label}
							</option>
						))
					: children}
			</select>
			<Icon name="caretDown" size={14} />
		</span>
	)
}

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
	label?: ReactNode
	tone?: ConcreteTone
}

export function Checkbox({ className, label, tone = 'sky', ...props }: CheckboxProps) {
	return (
		<label className={concreteClassName('concrete-choice', className)} data-concrete-tone={tone}>
			<input type="checkbox" {...props} />
			<span className="concrete-choice__box">
				<Icon name="check" size={13} />
			</span>
			{label ? <span className="concrete-choice__label">{label}</span> : null}
		</label>
	)
}

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
	label?: ReactNode
	tone?: ConcreteTone
}

export function Radio({ className, label, tone = 'sky', ...props }: RadioProps) {
	return (
		<label className={concreteClassName('concrete-choice', className)} data-concrete-tone={tone}>
			<input type="radio" {...props} />
			<span className="concrete-choice__radio" />
			{label ? <span className="concrete-choice__label">{label}</span> : null}
		</label>
	)
}

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
	label?: ReactNode
	tone?: ConcreteTone
}

export function Switch({ className, label, tone = 'sky', ...props }: SwitchProps) {
	return (
		<label className={concreteClassName('concrete-switch', className)} data-concrete-tone={tone}>
			<input type="checkbox" {...props} />
			<span className="concrete-switch__track">
				<span className="concrete-switch__thumb" />
			</span>
			{label ? <span className="concrete-switch__label">{label}</span> : null}
		</label>
	)
}

export interface SliderProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
	tone?: ConcreteTone
}

export function Slider({ className, tone = 'sky', ...props }: SliderProps) {
	return (
		<input
			className={concreteClassName('concrete-slider', className)}
			data-concrete-tone={tone}
			type="range"
			{...props}
		/>
	)
}

export interface ChipProps extends ComponentPropsWithoutRef<'button'> {
	leadingIcon?: IconName
	selected?: boolean
	tone?: ConcreteTone
}

export function Chip({
	children,
	className,
	leadingIcon,
	selected = false,
	tone = 'neutral',
	type = 'button',
	...props
}: ChipProps) {
	return (
		<button
			className={concreteClassName('concrete-chip', className)}
			data-concrete-selected={selected ? 'true' : 'false'}
			data-concrete-tone={tone}
			type={type}
			{...props}
		>
			{leadingIcon ? <Icon name={leadingIcon} size={13} /> : null}
			<span>{children}</span>
		</button>
	)
}

export interface PillProps extends ComponentPropsWithoutRef<'span'> {
	tone?: ConcreteTone
}

export function Pill({ children, className, tone = 'neutral', ...props }: PillProps) {
	return (
		<span
			className={concreteClassName('concrete-pill', className)}
			data-concrete-tone={tone}
			{...props}
		>
			{children}
		</span>
	)
}

export interface TagProps extends ComponentPropsWithoutRef<'span'> {
	tone?: ConcreteTone
}

export function Tag({ children, className, tone = 'neutral', ...props }: TagProps) {
	return (
		<span
			className={concreteClassName('concrete-tag', className)}
			data-concrete-tone={tone}
			{...props}
		>
			{children}
		</span>
	)
}

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
	tone?: ConcreteTone
	variant?: 'soft' | 'solid' | 'outline'
}

export function Badge({
	children,
	className,
	tone = 'neutral',
	variant = 'soft',
	...props
}: BadgeProps) {
	return (
		<span
			className={concreteClassName('concrete-badge', className)}
			data-concrete-tone={tone}
			data-concrete-variant={variant}
			{...props}
		>
			{children}
		</span>
	)
}

export interface IndicatorProps extends ComponentPropsWithoutRef<'span'> {
	label?: ReactNode
	tone?: ConcreteTone
}

export function Indicator({
	children,
	className,
	label,
	tone = 'terminal',
	...props
}: IndicatorProps) {
	return (
		<span
			className={concreteClassName('concrete-indicator', className)}
			data-concrete-tone={tone}
			{...props}
		>
			<span className="concrete-indicator__dot" />
			<span>{label ?? children}</span>
		</span>
	)
}

export interface DeltaProps extends ComponentPropsWithoutRef<'span'> {
	direction?: 'down' | 'flat' | 'up'
	value: ReactNode
}

export function Delta({ className, direction = 'up', value, ...props }: DeltaProps) {
	const iconName = direction === 'down' ? 'arrowDown' : direction === 'up' ? 'arrowUp' : 'minus'

	return (
		<span
			className={concreteClassName('concrete-delta', className)}
			data-concrete-direction={direction}
			{...props}
		>
			<Icon name={iconName} size={12} />
			<span>{value}</span>
		</span>
	)
}

export interface CardProps extends ComponentPropsWithoutRef<'section'> {
	padding?: 'none' | 'sm' | 'md' | 'lg'
	variant?: 'flat' | 'raised' | 'sunken'
}

export function Card({
	children,
	className,
	padding = 'md',
	variant = 'flat',
	...props
}: CardProps) {
	return (
		<section
			className={concreteClassName('concrete-card', className)}
			data-concrete-padding={padding}
			data-concrete-variant={variant}
			{...props}
		>
			{children}
		</section>
	)
}

export interface FrameProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
	eyebrow?: ReactNode
	footer?: ReactNode
	title?: ReactNode
}

export function Frame({ children, className, eyebrow, footer, title, ...props }: FrameProps) {
	return (
		<section className={concreteClassName('concrete-frame', className)} {...props}>
			{eyebrow || title ? (
				<header className="concrete-frame__header">
					{eyebrow ? <span>{eyebrow}</span> : null}
					{title ? <strong>{title}</strong> : null}
				</header>
			) : null}
			<div className="concrete-frame__body">{children}</div>
			{footer ? <footer className="concrete-frame__footer">{footer}</footer> : null}
		</section>
	)
}

export interface RowProps extends ComponentPropsWithoutRef<'div'> {
	description?: ReactNode
	label: ReactNode
	leading?: ReactNode
	trailing?: ReactNode
}

export function Row({ className, description, label, leading, trailing, ...props }: RowProps) {
	return (
		<div className={concreteClassName('concrete-row', className)} {...props}>
			{leading ? <span className="concrete-row__leading">{leading}</span> : null}
			<span className="concrete-row__content">
				<strong>{label}</strong>
				{description ? <span>{description}</span> : null}
			</span>
			{trailing ? <span className="concrete-row__trailing">{trailing}</span> : null}
		</div>
	)
}

export interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
	orientation?: 'horizontal' | 'vertical'
}

export function Divider({ className, orientation = 'horizontal', ...props }: DividerProps) {
	return (
		<hr
			className={concreteClassName('concrete-divider', className)}
			data-concrete-orientation={orientation}
			{...props}
		/>
	)
}

export interface BubbleProps extends ComponentPropsWithoutRef<'div'> {
	side?: 'assistant' | 'system' | 'user'
}

export function Bubble({ children, className, side = 'assistant', ...props }: BubbleProps) {
	return (
		<div
			className={concreteClassName('concrete-bubble', className)}
			data-concrete-side={side}
			{...props}
		>
			{children}
		</div>
	)
}

export interface StatProps extends ComponentPropsWithoutRef<'div'> {
	helper?: ReactNode
	label?: ReactNode
	tone?: ConcreteTone
	value: ReactNode
}

export function Stat({ className, helper, label, tone = 'neutral', value, ...props }: StatProps) {
	return (
		<div
			className={concreteClassName('concrete-stat', className)}
			data-concrete-tone={tone}
			{...props}
		>
			{label ? <span className="concrete-stat__label">{label}</span> : null}
			<strong className="concrete-stat__value">{value}</strong>
			{helper ? <span className="concrete-stat__helper">{helper}</span> : null}
		</div>
	)
}

export interface SparklineProps
	extends Omit<ComponentPropsWithoutRef<'svg'>, 'children' | 'points'> {
	accessibilityLabel?: string
	points?: readonly number[]
	tone?: ConcreteTone
}

function getSparklinePolyline(points: readonly number[]): string {
	const safePoints = points.length > 1 ? points : [0, 1]
	const minimum = Math.min(...safePoints)
	const maximum = Math.max(...safePoints)
	const range = maximum - minimum || 1
	const lastIndex = safePoints.length - 1 || 1

	return safePoints
		.map((point, index) => {
			const x = (index / lastIndex) * 100
			const y = 36 - ((point - minimum) / range) * 28
			return `${x.toFixed(2)},${y.toFixed(2)}`
		})
		.join(' ')
}

export function Sparkline({
	accessibilityLabel,
	className,
	points = [12, 18, 16, 24, 22, 31, 36],
	tone = 'sky',
	...props
}: SparklineProps) {
	return (
		<svg
			aria-hidden={accessibilityLabel ? undefined : true}
			aria-label={accessibilityLabel}
			className={concreteClassName('concrete-sparkline', className)}
			data-concrete-tone={tone}
			preserveAspectRatio="none"
			role={accessibilityLabel ? 'img' : undefined}
			viewBox="0 0 100 40"
			{...props}
		>
			{accessibilityLabel ? <title>{accessibilityLabel}</title> : null}
			<polyline points={getSparklinePolyline(points)} />
		</svg>
	)
}

export interface AvatarProps extends ComponentPropsWithoutRef<'span'> {
	imageAlt?: string
	imageSource?: string
	initials?: string
	size?: ConcreteSize
}

export function Avatar({
	className,
	imageAlt = '',
	imageSource,
	initials = 'RL',
	size = 'md',
	...props
}: AvatarProps) {
	return (
		<span
			className={concreteClassName('concrete-avatar', className)}
			data-concrete-size={size}
			{...props}
		>
			{imageSource ? <img alt={imageAlt} src={imageSource} /> : <span>{initials}</span>}
		</span>
	)
}

export interface ProgressProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
	value?: number
}

export function Progress({ className, value = 0, ...props }: ProgressProps) {
	const clampedValue = Math.min(100, Math.max(0, value))
	const style: StyleWithVariable = { '--concrete-progress-value': `${clampedValue}%` }

	return (
		<div
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={clampedValue}
			className={concreteClassName('concrete-progress', className)}
			role="progressbar"
			style={style}
			{...props}
		>
			<span />
		</div>
	)
}

export interface SpinnerProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
	label?: string
	size?: ConcreteSize
}

export function Spinner({ className, label = 'Loading', size = 'md', ...props }: SpinnerProps) {
	return (
		<span
			aria-label={label}
			className={concreteClassName('concrete-spinner', className)}
			data-concrete-size={size}
			role="status"
			{...props}
		/>
	)
}

export interface DistributionProps extends ComponentPropsWithoutRef<'div'> {
	values?: readonly number[]
}

export function Distribution({
	className,
	values = [24, 44, 68, 52, 30, 18],
	...props
}: DistributionProps) {
	const maximum = Math.max(...values, 1)

	return (
		<div className={concreteClassName('concrete-distribution', className)} {...props}>
			{values.map((value, index) => {
				const style: StyleWithVariable = {
					'--concrete-bar-height': `${Math.max(6, (value / maximum) * 100)}%`
				}
				return <span aria-hidden="true" key={`${value}-${index}`} style={style} />
			})}
		</div>
	)
}

export interface SkeletonProps extends ComponentPropsWithoutRef<'span'> {
	width?: string
}

export function Skeleton({ className, width = '100%', ...props }: SkeletonProps) {
	const style: StyleWithVariable = { '--concrete-skeleton-width': width }
	return (
		<span className={concreteClassName('concrete-skeleton', className)} style={style} {...props} />
	)
}

export interface TooltipProps extends Omit<ComponentPropsWithoutRef<'span'>, 'content'> {
	content: ReactNode
}

export function Tooltip({ children, className, content, ...props }: TooltipProps) {
	return (
		<span className={concreteClassName('concrete-tooltip', className)} {...props}>
			{children}
			<span className="concrete-tooltip__content" role="tooltip">
				{content}
			</span>
		</span>
	)
}

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
	tone?: ConcreteTone
}

export function Link({ children, className, tone = 'sky', ...props }: LinkProps) {
	return (
		<a className={concreteClassName('concrete-link', className)} data-concrete-tone={tone} {...props}>
			{children}
		</a>
	)
}

export function Code({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) {
	return (
		<code className={concreteClassName('concrete-code', className)} {...props}>
			{children}
		</code>
	)
}

export function Kbd({ children, className, ...props }: ComponentPropsWithoutRef<'kbd'>) {
	return (
		<kbd className={concreteClassName('concrete-kbd', className)} {...props}>
			{children}
		</kbd>
	)
}

export interface CaretProps extends ComponentPropsWithoutRef<'span'> {
	direction?: 'down' | 'left' | 'right' | 'up'
}

export function Caret({ className, direction = 'down', ...props }: CaretProps) {
	return (
		<span
			className={concreteClassName('concrete-caret', className)}
			data-concrete-direction={direction}
			{...props}
		>
			<Icon name="caretDown" size={14} />
		</span>
	)
}

export interface ScrollbarProps extends ComponentPropsWithoutRef<'div'> {
	items?: readonly ReactNode[]
}

export function Scrollbar({
	className,
	items = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
	...props
}: ScrollbarProps) {
	return (
		<div className={concreteClassName('concrete-scrollbar', className)} {...props}>
			{items.map((item, index) => (
				<span key={`${String(item)}-${index}`}>{item}</span>
			))}
		</div>
	)
}

export interface EmptyStateProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
	action?: ReactNode
	description?: ReactNode
	icon?: IconName
	title: ReactNode
}

export function EmptyState({
	action,
	className,
	description,
	icon = 'sparkles',
	title,
	...props
}: EmptyStateProps) {
	return (
		<div className={concreteClassName('concrete-empty-state', className)} {...props}>
			<span className="concrete-empty-state__icon">
				<Icon name={icon} size={18} />
			</span>
			<strong>{title}</strong>
			{description ? <span>{description}</span> : null}
			{action ? <div>{action}</div> : null}
		</div>
	)
}
