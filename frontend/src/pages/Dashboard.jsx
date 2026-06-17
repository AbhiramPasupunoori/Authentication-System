import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setUser(res.data);

      } catch {

        navigate("/login");
      }
    };

    fetchProfile();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div>

      <h1>Dashboard</h1>

      {user && (
        <>
          <h2>
            Welcome {user.name}
          </h2>

          <p>
            Email: {user.email}
          </p>
        </>
      )}

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;