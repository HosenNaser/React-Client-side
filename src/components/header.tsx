import { useNavigate } from "react-router-dom";
import style from "../style/Header.module.scss";

function Header() {
  const navigate = useNavigate();
  const goTo = (des: string) => {
    navigate("/" + des);
  };

  const logout = () => {
    localStorage.clear();
    goTo("");
  };

  const filter = () => {
    if (JSON.parse(localStorage.filter)) {
      localStorage.filter = false;
    } else {
      localStorage.filter = true;
    }

    goTo("");
  };
  return (
    <div className={style.NavBar}>
      <div onClick={() => goTo("")} className={style.title}>
        <span>Vacations</span>
      </div>

      {!localStorage.username ? (
        <div className={style.nav}>
          <button onClick={() => goTo("")}>Login</button>
          <button onClick={() => goTo("signUp")}>Register</button>
        </div>
      ) : (
        <div className={style.nav}>
          <div>
            <label>Welcome {localStorage.username}</label>
          </div>
          <div>
            {localStorage.role === "admin" ? (
              <>
                <button onClick={() => goTo("AddVacation")}>Add Vacation</button>
                <button onClick={() => goTo("chart")}>Chart</button>
              </>
            ) : (
              <>
                <button onClick={filter}>{!JSON.parse(localStorage.filter) ? "Filter" : "All"}</button>
              </>
            )}

            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
