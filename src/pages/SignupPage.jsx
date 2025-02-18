import SignupForm from "../components/SignupForm"
import kickarooLogo from "../assets/images/Kickaroo.png";
function SignupPage() {
    return (
        <>
        <div className="login-container">
                <img src={kickarooLogo} alt="Kickaroo Logo" className="login-logo" />
                <SignupForm/>
            </div>
        </>
    );
}

export default SignupPage;