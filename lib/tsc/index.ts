import { launch } from 'puppeteer'
import { join } from 'path'

export interface Note {
  time: number
  pitch: string
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

const midiJsonToWebm = async (midiJson: MidiJson): Promise<string> => {
  const browser = await launch({
    devtools: true
  })
  const [page] = await browser.pages()
  const pagePath = join(__dirname, '../../dist/webpack/index.html')
  await page.evaluateOnNewDocument((midiJson: MidiJson) => {
    window.midiJson = midiJson
  }, midiJson)
  await page.goto(pagePath)
  return ''
}

export default midiJsonToWebm
