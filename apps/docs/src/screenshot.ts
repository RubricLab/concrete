import { chromium } from 'playwright'
import { getViewportSize, parseUrlRenderQuery } from './rendering'

export type RenderScreenshotParams = {
	kind: string
	slug: string
}

export async function createRenderScreenshotResponse(
	request: Request,
	params: RenderScreenshotParams
): Promise<Response> {
	const requestUrl = new URL(request.url)
	const query = parseUrlRenderQuery(requestUrl)
	const viewport = getViewportSize(query.viewport)
	const renderUrl = new URL(`/render/${params.kind}/${params.slug}`, requestUrl.origin)

	for (const [key, value] of requestUrl.searchParams.entries()) {
		renderUrl.searchParams.set(key, value)
	}

	const browser = await chromium.launch({ args: ['--no-sandbox'] })

	try {
		const page = await browser.newPage({
			deviceScaleFactor: 2,
			viewport
		})

		await page.goto(renderUrl.toString(), { waitUntil: 'load' })

		const screenshot = await page.screenshot({
			caret: 'initial',
			fullPage: false,
			quality: query.quality,
			type: 'jpeg'
		})
		const body = new ArrayBuffer(screenshot.byteLength)

		new Uint8Array(body).set(screenshot)

		return new Response(body, {
			headers: {
				'cache-control': 'no-store',
				'content-type': 'image/jpeg'
			}
		})
	} finally {
		await browser.close()
	}
}
