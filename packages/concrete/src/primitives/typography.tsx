import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../icons'
import classes from './primitives.module.css'
import { cn } from './utils'

export type CodeLanguage = 'HTML' | 'TypeScript' | 'typescript' | 'html'

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
	code: string
	copyLabel?: ReactNode
	language?: CodeLanguage | string
	showLineNumbers?: boolean
}

export function CodeBlock({
	className,
	code,
	copyLabel = 'Copy',
	language = 'TypeScript',
	showLineNumbers = true,
	...props
}: CodeBlockProps) {
	const lines = code.split('\n')

	return (
		<div className={cn(classes.code, className)} {...props}>
			<div className={classes.codeHead}>
				<span className={classes.codeLang}>{language}</span>
				<button className={classes.codeCopy} type="button">
					<ConcreteIcon name="copy" />
					{copyLabel}
				</button>
			</div>
			<div className={classes.codeBody}>
				{showLineNumbers ? (
					<div aria-hidden className={classes.codeGutter}>
						{lines.map((_, index) => (
							<span key={`line-${index + 1}`}>{index + 1}</span>
						))}
					</div>
				) : null}
				<pre className={classes.codePre}>
					<code>
						{lines.map((line, index) => (
							<span className={classes.codeLine} key={`${index}-${line}`}>
								{renderHighlightedCodeLine(line, language)}
								{index < lines.length - 1 ? '\n' : null}
							</span>
						))}
					</code>
				</pre>
			</div>
		</div>
	)
}

export type InlineCodeProps = HTMLAttributes<HTMLElement>

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
	return (
		<code className={cn(classes.inlineCode, className)} {...props}>
			{children}
		</code>
	)
}

export type TextLinkTone = 'default' | 'muted' | 'sky'
export type TextLinkVariant = 'inline' | 'nav'

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	external?: boolean
	tone?: TextLinkTone
	variant?: TextLinkVariant
}

export function TextLink({
	children,
	className,
	external = false,
	tone = 'default',
	variant = 'inline',
	...props
}: TextLinkProps) {
	return (
		<a
			className={cn(
				classes.link,
				tone === 'sky' && classes.linkSky,
				tone === 'muted' && classes.linkMuted,
				external && classes.linkExternal,
				variant === 'nav' && classes.linkNav,
				className
			)}
			{...props}
		>
			{children}
			{external ? <ConcreteIcon aria-hidden name="external-link" /> : null}
		</a>
	)
}

type SyntaxTokenKind =
	| 'attribute'
	| 'comment'
	| 'function'
	| 'identifier'
	| 'keyword'
	| 'number'
	| 'operator'
	| 'punctuation'
	| 'string'
	| 'type'

type SyntaxToken = {
	kind: SyntaxTokenKind
	value: string
}

function renderHighlightedCodeLine(line: string, language: string): readonly ReactNode[] {
	return tokenizeCodeLine(line, language).map((token, index) => {
		if (token.kind === 'identifier') {
			return token.value
		}

		return (
			<span className={getSyntaxTokenClass(token.kind)} key={`${index}-${token.value}`}>
				{token.value}
			</span>
		)
	})
}

function tokenizeCodeLine(line: string, language: string): readonly SyntaxToken[] {
	switch (language.toLowerCase()) {
		case 'html':
			return tokenizeHtmlLine(line)
		default:
			return tokenizeTypescriptLine(line)
	}
}

function tokenizeTypescriptLine(line: string): readonly SyntaxToken[] {
	const tokenExpression =
		/(\/\/.*)|(["'`][^"'`]*["'`])|\b(import|from|export|const|let|var|function|return|extends|keyof|type|interface|as|satisfies|switch|case|default|break|if|else|new|readonly)\b|\b([A-Z][A-Za-z0-9_$]*)\b|\b([A-Za-z_$][A-Za-z0-9_$]*)(?=\s*\()|\b(\d+(?:\.\d+)?)\b|([{}()[\],.;:<>])|([=|&]+|\+|-|\*|\/|\.)/g
	const tokens: SyntaxToken[] = []
	let cursor = 0
	let match = tokenExpression.exec(line)

	while (match) {
		if (match.index > cursor) {
			tokens.push({ kind: 'identifier', value: line.slice(cursor, match.index) })
		}

		tokens.push({
			kind: getTypescriptTokenKind(match),
			value: match[0]
		})
		cursor = match.index + match[0].length
		match = tokenExpression.exec(line)
	}

	if (cursor < line.length) {
		tokens.push({ kind: 'identifier', value: line.slice(cursor) })
	}

	return tokens
}

function tokenizeHtmlLine(line: string): readonly SyntaxToken[] {
	const tokenExpression =
		/(<!--.*?-->)|(<\/?)|([A-Za-z][A-Za-z0-9-]*)(?=[\s/>])|(\s+[A-Za-z_:][A-Za-z0-9_:-]*)(?==)|("[^"]*")|(\/?>)/g
	const tokens: SyntaxToken[] = []
	let cursor = 0
	let match = tokenExpression.exec(line)

	while (match) {
		if (match.index > cursor) {
			tokens.push({ kind: 'identifier', value: line.slice(cursor, match.index) })
		}

		tokens.push({
			kind: getHtmlTokenKind(match),
			value: match[0]
		})
		cursor = match.index + match[0].length
		match = tokenExpression.exec(line)
	}

	if (cursor < line.length) {
		tokens.push({ kind: 'identifier', value: line.slice(cursor) })
	}

	return tokens
}

function getTypescriptTokenKind(match: RegExpExecArray): SyntaxTokenKind {
	if (match[1]) {
		return 'comment'
	}
	if (match[2]) {
		return 'string'
	}
	if (match[3]) {
		return 'keyword'
	}
	if (match[4]) {
		return 'type'
	}
	if (match[5]) {
		return 'function'
	}
	if (match[6]) {
		return 'number'
	}
	if (match[7]) {
		return 'punctuation'
	}
	return 'operator'
}

function getHtmlTokenKind(match: RegExpExecArray): SyntaxTokenKind {
	if (match[1]) {
		return 'comment'
	}
	if (match[2] || match[6]) {
		return 'punctuation'
	}
	if (match[3]) {
		return 'attribute'
	}
	if (match[4]) {
		return 'attribute'
	}
	if (match[5]) {
		return 'string'
	}
	return 'identifier'
}

function getSyntaxTokenClass(kind: SyntaxTokenKind): string | undefined {
	switch (kind) {
		case 'attribute':
			return classes.syntaxAttribute
		case 'comment':
			return classes.syntaxComment
		case 'function':
			return classes.syntaxFunction
		case 'identifier':
			return classes.syntaxIdentifier
		case 'keyword':
			return classes.syntaxKeyword
		case 'number':
			return classes.syntaxNumber
		case 'operator':
			return classes.syntaxOperator
		case 'punctuation':
			return classes.syntaxPunctuation
		case 'string':
			return classes.syntaxString
		case 'type':
			return classes.syntaxType
	}
}
