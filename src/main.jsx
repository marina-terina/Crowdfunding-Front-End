import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import "./App.css"
import NavBar from "./components/NavBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx"
import CreateProject from "./pages/CreateProject.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import CreatePledge from "./pages/CreatePledge.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage />},
          { path: "/createProject", element: <CreateProject />},
          { path: "/project/:projectId/pledge", element: <CreatePledge/> },
          { path: "/project/:id", element: <ProjectPage /> },
          { path: "/howitworks", element: <HowItWorks /> },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> 
     {/* Here we wrap our app in the router provider so they render */}
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
