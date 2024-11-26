import { Link, Outlet } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/project">Projects</Link>
                <Link to="/">Sign In</Link>
                <Link to="/project">Contacts</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;