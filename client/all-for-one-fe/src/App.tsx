import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./contexts/AuthProvider";
import LifeStory from "./components/LifeStory";
import FamilyTree from "./components/FamilyTree";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lifestory" element={<LifeStory />} />
            <Route path="/familytree" element={<FamilyTree />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
