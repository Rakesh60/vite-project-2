import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AddNote from "./pages/addnote/AddNote";
import UpdateNote from "./pages/updatenote/UpdateNote";
import NoPage from "./pages/nopage/NoPage";
import Profile from "./pages/profile/Profile";
import MyState from "./context/data/myState";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/updatenote" element={<UpdateNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </MyState>
  );
}

export default App;
