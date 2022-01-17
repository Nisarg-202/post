import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  async function onHandleChange(e) {
    e.preventDefault();
    const response = await axios.post("/api/post", { email, name });
    if (response.data.condition) {
      alert("Successfully registered!");
    } else {
      alert("Something went Wrong!");
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={onHandleChange} className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            onChange={onNameChange}
            value={name}
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
