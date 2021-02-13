import midiJsonToWebm from './index'

midiJsonToWebm({
  tracks: [{
    notes: [
      {
        time: 0,
        duration: 1,
        velocity: 0.5,
        pitch: 'C4'
      }
    ]
  }]
})
