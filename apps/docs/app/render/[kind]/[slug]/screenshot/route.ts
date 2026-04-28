import { createRenderScreenshotResponse } from '@/screenshot'

export const runtime = 'nodejs'

type ScreenshotRouteContext = {
	params: Promise<{
		kind: string
		slug: string
	}>
}

export async function GET(request: Request, context: ScreenshotRouteContext): Promise<Response> {
	const params = await context.params
	return createRenderScreenshotResponse(request, params)
}
