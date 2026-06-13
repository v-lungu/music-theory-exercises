import { useState } from 'react'
import './App.css'
import ChordExercise from './exercises/ChordExercise'
import ModesExercise from './exercises/ModesExercise'

const TABS = [
  { id: 'chords', label: 'Chords', component: ChordExercise },
  { id: 'modes', label: 'Modes', component: ModesExercise },
]

function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id)
  const ActiveExercise = TABS.find((tab) => tab.id === activeTab).component

  return (
    <>
      <nav className="navbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <ActiveExercise />
    </>
  )
}

export default App
