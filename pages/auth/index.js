import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Auth() {
  const [condition, setCondition] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onConditionChange(e) {
    setCondition(!condition);
  }
  async function onSubmitHandler(e) {
    e.preventDefault();
    const response = await axios.post("/api/auth", {
      email,
      password,
      condition,
    });
    console.log(response.data);
    if (response.data.condition) {
      sessionStorage.setItem("TOKEN", response.data.token);
      window.location.href = "/";
    } else {
      alert(response.data.message);
    }
  }
  useEffect(function () {
    async function checkAuth() {
      const token = sessionStorage.getItem("TOKEN");
      const response = await axios.post("/api/checkAuth", { token });
      if (response.data.condition) {
        window.location.href = "/";
      }
    }

    checkAuth();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container">
        <h4 className="text-center">Authentication</h4>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              onChange={onEmailChange}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={onPasswordChange}
              value={password}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              {condition ? "SIGN UP" : "LOGIN"}
            </button>
          </div>
          <div className="mb-3">
            <button
              type="button"
              onClick={onConditionChange}
              className="btn btn-secondary"
            >
              {condition ? "LOGIN" : "SIGNUP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
