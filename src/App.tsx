import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { LuggagePage } from './pages/LuggagePage'
import { TripPlannerPage } from './pages/TripPlannerPage'

const navItems = [
  { to: '/', label: 'Luggage' },
  { to: '/planner', label: 'Trip Planner' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="app-nav">
          <div className="app-nav__brand">TripTest</div>
          <div className="app-nav__links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `app-nav__link${isActive ? ' app-nav__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
        <main className="app-shell__content">
          <Routes>
            <Route path="/" element={<LuggagePage />} />
            <Route path="/planner" element={<TripPlannerPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
