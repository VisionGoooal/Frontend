import "../css/Register.css";
import Button from "../components/Button";
import Input from "../components/Input";
import FormLinks from "../components/FormLinks";
import { LOGIN_PAGE_PATH } from "../constants/routePaths";

const Register = () => {
  return (
    <>
      <div className="register-page-container">
        <div className="signup-container">
          <form className="signup-form">
            <h2>Register form</h2>
            <Input type="text" id ='name' label="Name*" placeholder="Enter your name" required />
            <Input type="email" id ='email' label="Email*" placeholder="Enter your email" required />
            <Input type="password" id ='password' label="Password*" placeholder="Enter your password" required />
            <Input type="tel" id ='phone' label="Phone No.*" placeholder="Enter your phone number" required />
            <Input type="text" id ='country' label="Country*" placeholder="Enter your country" required />
            <Input type="text" id ='address' label="Address" placeholder="Enter your address" />
            <Button>Submit</Button>
            <FormLinks path={LOGIN_PAGE_PATH} text='Already have an account ? Log In'></FormLinks>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
