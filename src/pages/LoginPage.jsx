import LoginForm from "../components/LoginForm";
import kickarooLogo from "../assets/images/Kickaroo.png";
import "../components/LoginForm.css";

function LoginPage() {
    return (
        <>
            <div className="login-container">
                {/* <img src={kickarooLogo} alt="Kickaroo Logo" className="login-logo" /> */}
                <LoginForm />
            </div>
        </>
    );
}

export default LoginPage;