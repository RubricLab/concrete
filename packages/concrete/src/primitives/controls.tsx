import type {
	ButtonHTMLAttributes,
	CSSProperties,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactElement,
	ReactNode,
	SVGProps
} from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import classes from './primitives.module.css'
import { clampPercent, cn } from './utils'

export type ButtonSize = 'tiny' | 'small' | 'medium' | 'large'
export type ButtonVariant =
	| 'danger'
	| 'ghost'
	| 'primary'
	| 'secondary'
	| 'sky'
	| 'sky-soft'
	| 'soft'
	| 'ultra'
export type CaretDirection = 'down' | 'right' | 'up'
export type CaretSize = 'large' | 'medium' | 'small'

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	iconOnly?: boolean
	leadingIcon?: IconSlot
	loading?: boolean
	pressed?: boolean
	shortcut?: readonly string[]
	size?: ButtonSize
	trailingIcon?: IconSlot
	variant?: ButtonVariant
}

type IconSlot = IconName | ReactElement

export function Button({
	children,
	className,
	disabled,
	iconOnly = false,
	leadingIcon,
	loading = false,
	pressed = false,
	shortcut,
	size = 'medium',
	trailingIcon,
	type = 'button',
	variant = 'secondary',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				classes.button,
				getButtonVariantClass(variant),
				getButtonSizeClass(size),
				iconOnly && classes.buttonIcon,
				className
			)}
			data-loading={loading ? true : undefined}
			data-pressed={pressed ? true : undefined}
			data-variant={variant}
			disabled={disabled || loading}
			type={type}
		>
			{loading ? <span aria-hidden className={classes.spinner} /> : renderIconSlot(leadingIcon)}
			{children}
			{renderIconSlot(trailingIcon)}
			{shortcut && shortcut.length > 0 ? (
				<span className={classes.buttonShortcut}>
					{shortcut.map((shortcutKey, shortcutIndex) => (
						<span className={cn(classes.kbd, classes.buttonKbd)} key={`${shortcutKey}-${shortcutIndex}`}>
							{formatShortcutKey(shortcutKey)}
						</span>
					))}
				</span>
			) : null}
		</button>
	)
}

export type KbdProps = HTMLAttributes<HTMLElement> & {
	tone?: 'dark' | 'default'
}

export function Kbd({ children, className, tone = 'default', ...props }: KbdProps) {
	return (
		<kbd className={cn(classes.kbd, tone === 'dark' && classes.kbdDark, className)} {...props}>
			{children}
		</kbd>
	)
}

export type SpinnerProps = SVGProps<SVGSVGElement> & {
	size?: number
	tone?: 'default' | 'inverse' | 'sky'
}

export function Spinner({ className, size = 18, tone = 'default', ...props }: SpinnerProps) {
	return (
		<svg
			aria-label="Loading"
			className={cn(
				classes.spinnerSvg,
				tone === 'sky' && classes.spinnerSky,
				tone === 'inverse' && classes.spinnerInverse,
				className
			)}
			height={size}
			role="img"
			viewBox="0 0 24 24"
			width={size}
			{...props}
		>
			<title>Loading</title>
			<circle cx="12" cy="12" r="9" strokeWidth="2.5" />
			<path d="M12 3a9 9 0 0 1 9 9" strokeWidth="2.5" />
		</svg>
	)
}

export type CaretProps = HTMLAttributes<HTMLSpanElement> & {
	direction?: CaretDirection
	open?: boolean
	size?: CaretSize
}

export function Caret({
	className,
	direction = 'right',
	open = false,
	size = 'medium',
	...props
}: CaretProps) {
	return (
		<span
			aria-hidden
			className={cn(
				classes.caret,
				open && classes.caretOpen,
				direction === 'up' && classes.caretUp,
				direction === 'down' && classes.caretDown,
				size === 'small' && classes.caretSmall,
				size === 'large' && classes.caretLarge,
				className
			)}
			{...props}
		>
			<ConcreteIcon name="chevron-right" />
		</span>
	)
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Checkbox({ checked, className, label, ...props }: CheckboxProps) {
	return (
		<label className={cn(classes.checkRow, className)}>
			<input checked={checked} className={classes.visuallyHidden} type="checkbox" {...props} />
			<span aria-hidden className={cn(classes.checkbox, checked && classes.checkboxChecked)}>
				{checked ? <ConcreteIcon name="check" /> : null}
			</span>
			{label}
		</label>
	)
}

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Radio({ checked, className, label, ...props }: RadioProps) {
	return (
		<label className={cn(classes.checkRow, className)}>
			<input checked={checked} className={classes.visuallyHidden} type="radio" {...props} />
			<span aria-hidden className={cn(classes.radio, checked && classes.radioChecked)}>
				{checked ? <span className={classes.radioDot} /> : null}
			</span>
			{label}
		</label>
	)
}

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label?: ReactNode
}

export function Switch({ checked, className, label, ...props }: SwitchProps) {
	return (
		<label className={cn(classes.switch, className)}>
			<input checked={checked} className={classes.visuallyHidden} type="checkbox" {...props} />
			<span aria-hidden className={cn(classes.switchTrack, checked && classes.switchChecked)} />
			{label}
		</label>
	)
}

export type SliderTone = 'default' | 'sky'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	tone?: SliderTone
}

type SliderStyle = CSSProperties & {
	'--concrete-slider-percent'?: string
}

export function Slider({
	className,
	defaultValue,
	max = 100,
	min = 0,
	style,
	tone = 'default',
	value,
	...props
}: SliderProps) {
	const minimum = getNumericInputValue(min)
	const maximum = getNumericInputValue(max)
	const current = getNumericInputValue(value ?? defaultValue ?? minimum)
	const range = maximum - minimum
	const percent = range === 0 ? 0 : clampPercent(((current - minimum) / range) * 100)
	const sliderStyle: SliderStyle = { '--concrete-slider-percent': `${percent}%`, ...style }

	return (
		<input
			className={cn(classes.slider, tone === 'sky' && classes.sliderSky, className)}
			defaultValue={defaultValue}
			max={max}
			min={min}
			style={sliderStyle}
			type="range"
			value={value}
			{...props}
		/>
	)
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}

function getNumericInputValue(value: number | readonly string[] | string | undefined): number {
	switch (typeof value) {
		case 'number':
			return Number.isFinite(value) ? value : 0
		case 'string': {
			const parsedValue = Number.parseFloat(value)
			return Number.isFinite(parsedValue) ? parsedValue : 0
		}
		case 'undefined':
			return 0
		default: {
			const parsedValue = Number.parseFloat(value[0] ?? '0')
			return Number.isFinite(parsedValue) ? parsedValue : 0
		}
	}
}

function getButtonVariantClass(variant: ButtonVariant): string | undefined {
	switch (variant) {
		case 'danger':
			return classes.buttonDanger
		case 'ghost':
			return classes.buttonGhost
		case 'primary':
			return classes.buttonPrimary
		case 'sky':
			return classes.buttonSky
		case 'sky-soft':
			return classes.buttonSkySoft
		case 'soft':
			return classes.buttonSoft
		case 'ultra':
			return classes.buttonUltra
		case 'secondary':
			return classes.buttonSecondary
	}
}

function getButtonSizeClass(size: ButtonSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.buttonLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.buttonSmall
		case 'tiny':
			return classes.buttonTiny
	}
}

function formatShortcutKey(shortcutKey: string): string {
	switch (shortcutKey.toLowerCase()) {
		case 'cmd':
		case 'command':
		case 'meta':
			return '⌘'
		case 'enter':
		case 'return':
			return '↵'
		case 'shift':
			return '⇧'
		case 'option':
		case 'alt':
			return '⌥'
		default:
			return shortcutKey
	}
}
