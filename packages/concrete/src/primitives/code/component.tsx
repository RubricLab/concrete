import type { HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

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
		<div className={cn(concreteClassNames.code, className)} {...props}>
			<div className={concreteClassNames.codeHead}>
				<span className={concreteClassNames.codeLang}>{language}</span>
				<button className={concreteClassNames.codeCopy} type="button">
					<ConcreteIcon name="copy" />
					{copyLabel}
				</button>
			</div>
			<div className={concreteClassNames.codeBody}>
				{showLineNumbers ? (
					<div aria-hidden className={concreteClassNames.codeGutter}>
						{lines.map((_, index) => (
							<span key={`line-${index + 1}`}>{index + 1}</span>
						))}
					</div>
				) : null}
				<pre className={concreteClassNames.codePre}>
					<code>
						{lines.map((line, index) => (
							<span className={concreteClassNames.codeLine} key={`${index}-${line}`}>
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
		<code className={cn(concreteClassNames.inlineCode, className)} {...props}>
			{children}
		</code>
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
			return concreteClassNames.syntaxAttribute
		case 'comment':
			return concreteClassNames.syntaxComment
		case 'function':
			return concreteClassNames.syntaxFunction
		case 'identifier':
			return concreteClassNames.syntaxIdentifier
		case 'keyword':
			return concreteClassNames.syntaxKeyword
		case 'number':
			return concreteClassNames.syntaxNumber
		case 'operator':
			return concreteClassNames.syntaxOperator
		case 'punctuation':
			return concreteClassNames.syntaxPunctuation
		case 'string':
			return concreteClassNames.syntaxString
		case 'type':
			return concreteClassNames.syntaxType
	}
}
