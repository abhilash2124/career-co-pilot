import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";  // Redirect to login page after logout
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <nav className="navbar">

        <Link to="/">Home 🏡</Link>

        {!token && <Link to="/login">Login 🎯</Link>}

        {token && <Link onClick={handleLogout}>Logout 📤</Link>}
      </nav>


      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
