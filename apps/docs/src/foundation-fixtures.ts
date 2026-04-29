export const inkStops = [
	['9', '#0A0B0F'],
	['8', '#16171C'],
	['7', '#22242B'],
	['6', '#3A3C45'],
	['5', '#5A5D68'],
	['4', '#878A95'],
	['3', '#B4B7C0'],
	['2', '#D7D9E0'],
	['1', '#E8EAEE']
] as const

export const skyStops = [
	['1', '#EEF3FB'],
	['2', '#D9E6F8'],
	['3', '#A9C6EF'],
	['4', '#4E8BDE'],
	['sky', '#1F6FD4'],
	['strong', '#0F4E9E']
] as const

export const signalStops = [
	['terminal', '#16C46A'],
	['ultra', '#6B5BFF'],
	['error', '#F03A3A']
] as const

export const surfaceStops = [
	['canvas', '#F7F8FA'],
	['surface', '#FFFFFF'],
	['raised', '#FCFCFD'],
	['sunken', '#F1F2F5'],
	['mist', '#EAECF0']
] as const

export const typeRows = [
	['120 / 0.92', 'Concrete', 'Display - Fraunces 300', 'scaleDisplay'],
	['72 / 0.95', 'Hero headline', 'Display - Fraunces 400', 'scaleHero'],
	['48 / 1.05', 'Section title', 'H1 - Jakarta 800', 'scaleH1'],
	['32 / 1.18', 'Chapter heading', 'H2 - Jakarta 700', 'scaleH2'],
	['20 / 1.25', 'Subsection heading', 'H3 - Jakarta 700', 'scaleH3'],
	[
		'17 / 1.55',
		'Long-form body. Sentence case. Measure 68ch.',
		'Article - Jakarta 400',
		'scaleArticle'
	],
	['15 / 1.45', 'UI body. The default for most running copy.', 'Body - Jakarta 400', 'scaleBody'],
	['13 / 1.45', 'UI labels, buttons, table rows.', 'Label - Jakarta 500', 'scaleLabel'],
	['11 / 1.5', 'Eyebrow - tags - annotations', 'Caps - Jakarta 700', 'scaleCaps']
] as const

export const spaceRows = [
	['s-1', 4],
	['s-2', 8],
	['s-3', 12],
	['s-4', 16],
	['s-6', 24],
	['s-8', 32],
	['s-12', 48],
	['s-16', 64],
	['s-24', 96],
	['s-32', 128]
] as const

export const radiusRows = [
	['r-2', '4px'],
	['r-3', '6px'],
	['r-4', '10px'],
	['r-5', '14px'],
	['r-6', '20px'],
	['pill', '9999px']
] as const

export const elevationRows = [
	['hairline', 'border only', 'none'],
	['shadow-1', 'rest', 'var(--concrete-shadow-1)'],
	['shadow-2', 'popover', 'var(--concrete-shadow-2)'],
	['shadow-3', 'modal', 'var(--concrete-shadow-3)'],
	['shadow-4', 'overlay', 'var(--concrete-shadow-4)']
] as const

export const scrollItems = [
	'Environment variables',
	'Build and deploy',
	'Domains',
	'SSL certificates',
	'Edge functions',
	'Redirects',
	'Headers',
	'Analytics',
	'Logs',
	'Integrations',
	'Team members',
	'Billing',
	'Audit log',
	'Danger zone'
] as const
