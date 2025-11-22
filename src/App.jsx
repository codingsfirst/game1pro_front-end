// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Auth/AuthPage";
import HomePage from "./Home/HomePage";
import GamePage from "./Game/GamePage";
import GamesListPage from "./Game/GamesListPage";
import NotificationsPage from "./Notifications/NotificationsPage";
import AboutPage from "./About/AboutPage";
import HelpPage from "./About/HelpPage"; // agar banaya hai
import AddBalancePage from "./Balance/AddBalancePage"; // tumhara file path
import ProfilePage from "./ProfileCard/ProfilePage";
import Navbar from "./Navbar/Navbar";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("g1p_token");
  if (!token) return <Navigate to="/auth" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <HomePage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/game/:gameId"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <GamesListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AboutPage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <HelpPage />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-balance"
        element={
          <ProtectedRoute>
            <AddBalancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
