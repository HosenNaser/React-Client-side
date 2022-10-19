import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/inputs.module.scss";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const submitBtn = async () => {
    let first_name = (document.getElementById("firstName") as HTMLInputElement).value;
    let last_name = (document.getElementById("lastName") as HTMLInputElement).value;
    let username = (document.getElementById("username") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

    let user = { first_name, last_name, username, password };
    console.log(user);

    const res = await fetch("https://vacations-server.onrender.com/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((result) => {
        return result.json();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (!res.success) {
      setMsg("missing values");
    } else navigate("/");
  };

  return (
    <div className={style.FormContainer}>
      <div>
        <span>Register Now!!</span>
      </div>
      <div className={style.form}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>First Name:</label>
              </td>
              <td>
                {" "}
                <input type="text" id="firstName" required />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label>Last Name:</label>
              </td>
              <td>
                <input type="text" id="lastName" required />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label>Username:</label>
              </td>
              <td>
                {" "}
                <input type="text" id="username" required />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label>Password:</label>
              </td>
              <td>
                <input type="password" id="password" required />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label style={{ color: "red", fontSize: 22 }}>{msg !== "" ? msg : null}</label>
        </div>
        <div className={style.Btn}>
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={submitBtn}>sign up</button>
        </div>
      </div>
    </div>
  );
}
