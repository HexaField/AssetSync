import puppeteer from 'puppeteer'
import express from 'express'
import path from 'path'

const PORT = 4000;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function runServer(file) {
	const app = express()
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, file))
	})
	app.listen(PORT)
	return app
}

export default async (t, run) => {
	t.timeout(100 * 1000)
	let server = null
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: false,
		devtools: true
	})
	const page = await browser.newPage()
	try {
		await page.goto(`http://localhost:${PORT}/`)
		await run(t, page)
	} finally {
		await browser.close()
		server.close()
	}
}