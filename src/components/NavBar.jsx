import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
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
                    <Link to="/login">Log In</Link>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;