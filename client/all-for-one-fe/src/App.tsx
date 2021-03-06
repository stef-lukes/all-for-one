import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./contexts/AuthProvider";
import { HubContext } from "./contexts/HubProvider";
import LifeStory from "./components/LifeStory";
import FamilyTree from "./components/FamilyTree";
import LifeStoryCategory from "./components/LifeStoryCategory";
import HubAdmin from "./pages/HubAdmin";

function App() {
  const [user, setUser] = useState();
  const [hub, setHub] = useState();

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <HubContext.Provider value={{ hub, setHub }}>
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
              <Route path="/hub" element={<HubAdmin/>} />
            </Routes>
          </div>
        </HubContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
