import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { useAuth } from "../hooks/use-auth";

function SignUpPage() {
  console.log("SignUpPage rendered");
  const navigate = useNavigate();
  const { auth } = useAuth();

  if (auth?.token) {
    return (
      <div className="signup-page">
        <h2>You are already logged in!</h2>
        <p>
          Log out if you wish to create a new account. Otherwise, explore the
          site!
        </p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <p>Sign up to create a new account</p>
      <SignUpForm />
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Login here</button>
      </p>
    </div>
  );
}

export default SignUpPage;
