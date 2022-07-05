import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./contexts/AuthProvider";
import LifeStory from "./components/LifeStory";
import FamilyTree from "./components/FamilyTree";
import LifeStoryCategory from "./components/LifeStoryCategory";

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lifestory" element={<LifeStory />} />
            <Route
              path="/lifestory/:category"
              element={<LifeStoryCategory />}
            />
            <Route path="/familytree" element={<FamilyTree />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
