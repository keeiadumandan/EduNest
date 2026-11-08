import { useState } from 'react'
import DormList from './components/DormList.jsx'
import StudentList from './components/StudentList.jsx'
import RoomList from './components/RoomList.jsx'
import PreferenceList from './components/PreferenceList.jsx'
import ReviewList from './components/ReviewList.jsx'

const TABS = [
  { key: 'dorms', label: 'Dorms', Component: DormList },
  { key: 'students', label: 'Students', Component: StudentList },
  { key: 'rooms', label: 'Rooms', Component: RoomList },
  { key: 'preferences', label: 'Preferences', Component: PreferenceList },
  { key: 'reviews', label: 'Reviews', Component: ReviewList },
]

export default function App() {
  const [active, setActive] = useState('dorms')
  const ActiveComponent = TABS.find((t) => t.key === active).Component

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dorm Matching</h1>
        <nav className="tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              className={active === t.key ? 'tab active' : 'tab'}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <ActiveComponent key={active} />
      </main>
    </div>
  )
}
