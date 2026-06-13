import { useState } from 'react'

const ROOTS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const MODES = [
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian',
]

function randomMode(roots) {
  const root = roots[Math.floor(Math.random() * roots.length)]
  const mode = MODES[Math.floor(Math.random() * MODES.length)]
  return `${root} ${mode}`
}

function ModesExercise() {
  const [selectedRoots, setSelectedRoots] = useState(ROOTS)
  const [mode, setMode] = useState(() => randomMode(ROOTS))

  function toggleRoot(root) {
    setSelectedRoots((current) =>
      current.includes(root)
        ? current.filter((r) => r !== root)
        : [...current, root]
    )
  }

  function nextMode() {
    if (selectedRoots.length === 0) return
    setMode((current) => {
      let next = randomMode(selectedRoots)
      while (next === current) next = randomMode(selectedRoots)
      return next
    })
  }

  return (
    <section id="center">
      <h1 className="mode">{mode}</h1>
      <button
        type="button"
        className="next"
        onClick={nextMode}
        disabled={selectedRoots.length === 0}
      >
        New mode
      </button>
      <div className="root-options-group">
        <button
          type="button"
          className="select-all-btn"
          onClick={() =>
            setSelectedRoots(
              selectedRoots.length === ROOTS.length ? [] : ROOTS
            )
          }
        >
          {selectedRoots.length === ROOTS.length ? 'Select none' : 'Select all'}
        </button>
        <div className="root-options">
          {ROOTS.map((root) => {
            const selected = selectedRoots.includes(root)
            return (
              <button
                key={root}
                type="button"
                className={selected ? 'chip selected' : 'chip'}
                aria-pressed={selected}
                onClick={() => toggleRoot(root)}
              >
                {root}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ModesExercise
