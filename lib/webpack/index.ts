import { now, start, Synth, Recorder } from 'tone'
import './index.css'

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

window.addEventListener('click', async () => {
  await start()
  const { midiJson: { tracks } } = window
  console.log(window.midiJson)

  const timeNow = now()
  const recorder = new Recorder()
  recorder.start()
  tracks.forEach(({ notes }) => {
    const synth = new Synth().connect(recorder)
    notes.forEach(({ name, duration, time, velocity }) => {
      synth.triggerAttackRelease(name, duration, timeNow + time, velocity)
    })
  })
  setTimeout(async () => {
    const recording = await recorder.stop()
    fetch('/', {
      method: 'POST',
      body: recording
    })
  }, 4000)
})
