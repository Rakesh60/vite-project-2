import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AddNote from "./pages/addnote/AddNote";
import UpdateNote from "./pages/updatenote/UpdateNote";
import NoPage from "./pages/nopage/NoPage";
import Profile from "./pages/profile/Profile";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProctectedRoute>
                <Home />
              </ProctectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/addnote"
            element={
              <ProctectedRoute>
                <AddNote />
              </ProctectedRoute>
            }
          />
          <Route
            path="/updatenote"
            element={
              <ProctectedRoute>
                <UpdateNote />
              </ProctectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProctectedRoute>
                <Profile />
              </ProctectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster /> //Toaster
      </Router>
    </MyState>
  );
}

export default App;

export const ProctectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
