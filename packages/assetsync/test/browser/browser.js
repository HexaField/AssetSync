import puppeteer from 'puppeteer'

export default async (t, run) => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: false,
		devtools: true
	})
	// const page = await browser.newPage()
	try {
		await run(t)
	} finally {
		// await page.close()
		await browser.close()
	}
}

export async function browser () {
	return await puppeteer.launch({
		args: ['--no-sandbox'],
		devtools: true
	})
}