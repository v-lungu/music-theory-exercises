import { useEffect, useState } from 'react'

const ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const QUALITIES = ['maj7', '7', 'm7']

function randomChord() {
  const root = ROOTS[Math.floor(Math.random() * ROOTS.length)]
  const quality = QUALITIES[Math.floor(Math.random() * QUALITIES.length)]
  return root + quality
}

function pickDifferent(current) {
  let next = randomChord()
  while (next === current) next = randomChord()
  return next
}

function ChordExercise() {
  const [chord, setChord] = useState(randomChord)
  const [timerOn, setTimerOn] = useState(false)
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (!timerOn) return
    const id = setInterval(() => setChord(pickDifferent), seconds * 1000)
    return () => clearInterval(id)
  }, [timerOn, seconds])

  return (
    <section id="center">
      <h1 className="chord">{chord}</h1>
      <button
        type="button"
        className="next"
        onClick={() => setChord(pickDifferent)}
      >
        New chord
      </button>
      <div className="controls">
        <button
          type="button"
          className={timerOn ? 'chip selected' : 'chip'}
          aria-pressed={timerOn}
          onClick={() => setTimerOn((on) => !on)}
        >
          Timer
        </button>
        <label className={timerOn ? '' : 'disabled'}>
          <input
            type="range"
            className="timer-slider"
            min="1"
            max="10"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            disabled={!timerOn}
          />
          <span className="seconds-value">{seconds}s</span>
        </label>
      </div>
    </section>
  )
}

export default ChordExercise
