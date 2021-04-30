import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

import "./Styles.css";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const history = useHistory();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      seterror("");
      setloading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setloading(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      seterror(error.code.split("/")[1]);
      setloading(false);
    }
  }

  return (
    <div className="sign-up">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {error && <div className="error">{error}</div>}
        <p className="details">Email</p>
        <input type="text" ref={emailRef} />
        <p className="details">Password</p>
        <input type="password" ref={passwordRef} />
        <button disabled={loading}>{loading ? "loading..." : " Login"}</button>
        <p id="login-redirect">
          Dont' have an account?<Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
