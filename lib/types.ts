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
