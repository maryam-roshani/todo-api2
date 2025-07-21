import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import NavBar from './components/NavBar';
import CalendarPage from './pages/CalendarPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home';

function App() {
  

  return (
    <div>
      <NavBar/>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />}
          />
          <Route path="/signup" element={<Signup />} />

          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/tasks"
            element={
              <ProtectedRoute >
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700"
      >
        Toggle Dark Mode
      </button>

    </div>
  );
}

export default App;
