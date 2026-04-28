export function cn(...values: Array<false | null | string | undefined>): string {
	return values.filter(Boolean).join(' ')
}

export function clampPercent(value: number): number {
	switch (true) {
		case value < 0:
			return 0
		case value > 100:
			return 100
		default:
			return value
	}
}
