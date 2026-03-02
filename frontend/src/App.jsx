import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtenctedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home 🏡</Link> | {""}
        <Link to="/login">Login🎯</Link> | {""}
        <Link onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>Logout📤</Link>
      </nav>


      <Routes>
        <Route path="/" element={
          <ProtenctedRoute>
            <Home />
          </ProtenctedRoute>
          } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
