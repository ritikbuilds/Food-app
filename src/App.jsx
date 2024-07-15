import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tracking from "./pages/Tracking";
import LoginSuccess from "./pages/LoginSuccess";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="login-success"
        element={
          <ProtectedRoute>
            <LoginSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="tracking"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
