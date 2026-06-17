import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email");
    }

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;