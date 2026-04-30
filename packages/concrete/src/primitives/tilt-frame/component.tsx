'use client'

import type { HTMLAttributes, PointerEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TiltFrameIntensity = 'medium' | 'subtle'
export type TiltFrameSurface = 'raised' | 'sunken' | 'transparent'

export type TiltFrameProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode
	/** Enables cursor-driven rotation. */
	interactive?: boolean
	/** Rotation strength. Keep hero/product uses subtle. */
	intensity?: TiltFrameIntensity
	surface?: TiltFrameSurface
}

const tiltIntensityDegrees = {
	medium: 6.5,
	subtle: 3.5
} satisfies Record<TiltFrameIntensity, number>

type PendingTilt = {
	rotateX: number
	rotateY: number
	target: HTMLDivElement
}

// TECH-DEBT: Low-quality landing-page primitive. Cursor-driven visual depth is too
// aesthetic-specific for the core surface vocabulary and needs a stricter role contract.
export function TiltFrame({
	children,
	className,
	interactive = true,
	intensity = 'subtle',
	onPointerLeave,
	onPointerMove,
	surface = 'raised',
	...props
}: TiltFrameProps) {
	const frameReference = useRef<number | null>(null)
	const pendingTiltReference = useRef<PendingTilt | null>(null)

	useEffect(() => {
		return () => {
			if (frameReference.current !== null) {
				window.cancelAnimationFrame(frameReference.current)
			}
		}
	}, [])

	function updateTilt(event: PointerEvent<HTMLDivElement>) {
		onPointerMove?.(event)

		if (!interactive) {
			return
		}

		const bounds = event.currentTarget.getBoundingClientRect()
		const x = clampTiltAxis((event.clientX - bounds.left) / bounds.width - 0.5)
		const y = clampTiltAxis((event.clientY - bounds.top) / bounds.height - 0.5)
		const degrees = tiltIntensityDegrees[intensity]

		queueTilt(event.currentTarget, roundTiltValue(-y * degrees), roundTiltValue(x * degrees))
	}

	function resetTilt(event: PointerEvent<HTMLDivElement>) {
		onPointerLeave?.(event)

		pendingTiltReference.current = null

		if (frameReference.current !== null) {
			window.cancelAnimationFrame(frameReference.current)
			frameReference.current = null
		}

		event.currentTarget.style.removeProperty('--concrete-tilt-rotate-x')
		event.currentTarget.style.removeProperty('--concrete-tilt-rotate-y')
	}

	function queueTilt(target: HTMLDivElement, rotateX: number, rotateY: number) {
		pendingTiltReference.current = { rotateX, rotateY, target }

		if (frameReference.current !== null) {
			return
		}

		frameReference.current = window.requestAnimationFrame(() => {
			const pendingTilt = pendingTiltReference.current
			frameReference.current = null

			if (!pendingTilt) {
				return
			}

			pendingTilt.target.style.setProperty('--concrete-tilt-rotate-x', `${pendingTilt.rotateX}deg`)
			pendingTilt.target.style.setProperty('--concrete-tilt-rotate-y', `${pendingTilt.rotateY}deg`)
		})
	}

	return (
		<div
			className={cn(concreteClassNames.tiltFrame, className)}
			data-interactive={interactive ? true : undefined}
			data-surface={surface}
			onPointerLeave={resetTilt}
			onPointerMove={updateTilt}
			{...props}
		>
			<div className={concreteClassNames.tiltFrameSurface}>
				<div className={concreteClassNames.tiltFrameContent}>{children}</div>
				<span aria-hidden className={concreteClassNames.tiltFrameGlare} />
			</div>
		</div>
	)
}

function clampTiltAxis(value: number): number {
	return Math.max(-0.5, Math.min(0.5, value))
}

function roundTiltValue(value: number): number {
	return Math.round(value * 100) / 100
}
