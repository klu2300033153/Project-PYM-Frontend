import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import Logout from './pages/Logout';
import Profile from './pages/Profile';

import PlayPage from './pages/PlayPage';
import PlayPlaylistPageComponent from "./components/PlayPlaylistPageComponent"; // create this next

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/play/:musicId" element={<PlayPage />} />
      <Route path="/listen/:playlistId" element={<PlayPlaylistPageComponent />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
