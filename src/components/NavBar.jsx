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
                <div className = "nav-left">
                    <Link to="/howitworks">How It Works</Link>
                </div>
                <div className = "logo-container">
                    <Link className = "logo" to ="/">Kick<span>arOO!</span></Link>
                </div>
                <div className = "nav-right">
                {auth.token ? (
                    <Link to="/" onClick={handleLogout}>
                        Log Out
                    </Link>
                    ) : (
                    <Link className="login-button" to="/login">Login</Link>
                )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;