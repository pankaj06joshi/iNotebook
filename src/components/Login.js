import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const resData = await response.json();
      if (resData.success) {
        localStorage.setItem("token", resData.authToken);
        props.showAlert("Logged In Successfully.","success")
        history.push("/");
      } else {
        props.showAlert("Invalid Credentials.","danger")
      }
    } catch (error) {
      console.log({ error: error.message });
      props.showAlert(error.message,"danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{color: "#FA935B"}}>iNotebook</h1>
      <h5 className="text-center mb-5">Follow Your Passion, Sign in to Write Passionate Notes.</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
