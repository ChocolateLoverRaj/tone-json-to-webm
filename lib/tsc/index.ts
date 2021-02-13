import { launch } from 'puppeteer'
import { join } from 'path'
import { PassThrough } from 'stream'
import express from 'express'
import { createServer } from 'http'

export interface Note {
  time: number
  name: string
  velocity: number
  duration: number
}

export interface Track {
  notes: Note[]
}

export interface MidiJson {
  tracks: Track[]
}

interface PuppeteerWindow {
  midiJson: MidiJson
}

declare var window: Window & PuppeteerWindow

const midiJsonToWebm = (midiJson: MidiJson, port = 4091): PassThrough => {
  const readable = new PassThrough()

  // Start a node server
  const streamPromise = new Promise<void>(resolve => {
    const webpackPath = join(__dirname, '../../dist/webpack')
    const app = express()
    app.use(express.static(webpackPath))
    app.post('/', (req, res) => {
      req.pipe(readable);
      req.once('end', () => {
        res.end()
        server.close()
        resolve()
      })
    })
    const server = createServer(app)
    server.listen(port)
  });

  (async () => {
    const browser = await launch()
    const [page] = await browser.pages()

    await page.evaluateOnNewDocument((midiJson: MidiJson) => {
      window.midiJson = midiJson
    }, midiJson)
    await page.goto(`http://localhost:${port}`)
    await page.click('body')
    await streamPromise
    await browser.close()
  })()

  return readable
}

export default midiJsonToWebm
