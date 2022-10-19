import { useState, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import style from "../style/inputs.module.scss";
export default function Login() {
  const name = useRef<HTMLInputElement | null>(null);
  const pass = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  if (localStorage.username) {
    return <Navigate to={"/DashBoard"} />;
  }

  const loginBtn = async () => {
    const userInfo = { username: name.current?.value, password: pass.current?.value };
    setLoading(true);
    setMsg("");

    const res = await fetch("https://vacations-server.onrender.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        setLoading(false);
        setMsg("server not connected");
      });

    if (!res.success) {
      setMsg(res.message);
    } else {
      localStorage.username = res.user.username;
      localStorage.role = res.user.role;
      localStorage.id = res.user._id;
      localStorage.filter = false;
      localStorage.followed = JSON.stringify(res.user.vacations);
      navigate("/DashBoard");
    }
  };
  return (
    <div className={style.FormContainer}>
      <div>
        <span>Login Now</span>
      </div>
      <div className={style.form}>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>
                {" "}
                <input ref={name} placeholder="Username" disabled={loading} type="text" />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                {" "}
                <input ref={pass} placeholder="Password" disabled={loading} type="password" />
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <label style={{ color: "red", fontSize: 22 }}>{msg !== "" ? msg : null}</label>
        </div>

        <div>
          {loading ? (
            <h4>loading</h4>
          ) : (
            <div>
              <button type="submit" onClick={loginBtn}>
                Login
              </button>
            </div>
          )}
        </div>
        <span>
          Don't have account?<Link to="/signUp">Register Now</Link>
        </span>
      </div>
    </div>
  );
}
