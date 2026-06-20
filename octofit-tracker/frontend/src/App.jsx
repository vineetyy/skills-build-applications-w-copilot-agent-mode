import { NavLink, Route, Routes } from 'react-router-dom';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const apiRoot = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' }
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="text-muted">React frontend using Vite and Codespaces-aware API routing.</p>
        <p className="small">
          API base URL: <code>{apiRoot}</code>
        </p>
      </header>

      <nav className="mb-4">
        <div className="nav nav-tabs">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home apiRoot={apiRoot} />} />
        <Route path="/users" element={<Users apiRoot={apiRoot} />} />
        <Route path="/teams" element={<Teams apiRoot={apiRoot} />} />
        <Route path="/activities" element={<Activities apiRoot={apiRoot} />} />
        <Route path="/leaderboard" element={<Leaderboard apiRoot={apiRoot} />} />
        <Route path="/workouts" element={<Workouts apiRoot={apiRoot} />} />
      </Routes>
    </div>
  );
}

function Home({ apiRoot }) {
  return (
    <div>
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Use the tabs above to explore users, teams, activities, leaderboard, and workouts.</p>
      <p className="alert alert-info">
        This app uses <code>VITE_CODESPACE_NAME</code> to build the API URL in Codespaces.
        If it is not set, the app falls back to <code>http://localhost:8000/api</code>.
      </p>
      <p>Current API root: <code>{apiRoot}</code></p>
    </div>
  );
}

export default App;
