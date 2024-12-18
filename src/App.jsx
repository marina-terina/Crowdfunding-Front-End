import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
// ... other imports

const Layout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <HeroSection />
                        <div className="project-container">
                            <HomePage />
                        </div>
                    </>
                ),
            },
            // ... other routes
        ],
    },
]);

function App() {
    return (
        <div className="app">
            <NavBar />
            <HeroSection />
            <div className="project-container">
    
            </div>
        </div>
    );
}

export default App; 