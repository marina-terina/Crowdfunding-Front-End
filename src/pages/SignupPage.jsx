import SignupForm from "../components/SignupForm"
import Footer from "../components/Footer";
import kickarooLogo from "../assets/images/Kickaroo.png";
function SignupPage() {
    return (
        <>
        <div className="login-container">
                <img src={kickarooLogo} alt="Kickaroo Logo" className="login-logo" />
                <SignupForm/>
            </div>
            
            <Footer />
        </>
    );
}

export default SignupPage;