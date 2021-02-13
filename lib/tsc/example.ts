import { createWriteStream } from 'fs'
import { join } from 'path'
import midiJsonToWebm from './index'

midiJsonToWebm({
  tracks: [{
    notes: [
      {
        time: 0,
        duration: 2,
        velocity: 0.5,
        name: 'C4'
      },
      {
        time: 1,
        duration: 1,
        velocity: 0.5,
        name: 'D4'
      }
    ]
  }]
})
  .pipe(createWriteStream(join(__dirname, 'example.webm')))
