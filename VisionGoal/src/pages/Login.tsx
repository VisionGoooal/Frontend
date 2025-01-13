import Button from "../components/Button";
import "../css/Login.css";
import FormLinks from "../components/FormLinks";
import { REGISTER_PAGE_PATH } from "../constants/routePaths";
import Input from "../components/Input";

const Login = () => {
  return (
    <>
      <div className="login-page-container">
        <div className="login-container">
          <form className="login-form">
            <h2>Login</h2>
            <Input type="email" id ='email' label="Email" placeholder="Enter your email" required/>
            <Input type="password" id ='password' label="Password" placeholder="Enter your password" required />
            <Button>Log In</Button>
            <FormLinks path={REGISTER_PAGE_PATH} text='Don’t have an account? Register'></FormLinks>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
