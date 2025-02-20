import { Link } from "react-router-dom";
import "./NavBar.css";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/howitworks">How It Works</Link>
            </div>
            <div className="logo-container">
                <Link className="logo" to="/">
                <span className="logo-text">Kick</span>
                <span className="logo-highlight">arOO!</span>
                </Link>
            </div>
            <div className="nav-right">
                {auth.token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                ) : (
                    <Link className="login-link" to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;