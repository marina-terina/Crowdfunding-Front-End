import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
const {auth, setAuth} = useAuth();

const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
};

    return (
        <div>
            <nav className = "navbar">
                <div className = "navbar-left">
                    <Link to="/">How It Works</Link>
                </div>
                <div className="navbar-center">
                    <Link to="/">KickarOO</Link>
                </div>
                <div className = "navbar-right">
                {auth.token ? (
                    <Link to="/" onClick={handleLogout}>
                        Log Out
                    </Link>
                    ) : (
                    <Link to="/login">Login</Link>
                )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;