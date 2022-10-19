import { useNavigate } from "react-router-dom";
import style from "../style/vacations.module.scss";

export default function Card({ vac }: any) {
  const navigate = useNavigate();
  let userFollowed = JSON.parse(localStorage.followed);

  const editBtn = () => {
    localStorage.setItem(vac._id, JSON.stringify(vac));
    navigate(`/EditVacation/${vac._id}`);
  };

  const removeBtn = async () => {
    fetch(`https://vacation-server-side-production.up.railway.app/vacations/${vac._id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    localStorage.removeItem("vacations");
    navigate("/");
  };

  const followBtn = async () => {
    await fetch(`https://vacation-server-side-production.up.railway.app/users/follow/${vac._id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: localStorage.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.followed = JSON.stringify(data.followed);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.card}>
      <label>Description: {vac.Description}</label>
      <label>Destination: {vac.Destination}</label>
      <label>Price: {vac.Price}$</label>
      <img src={vac.Image} alt="" />
      <label>start:{vac.Start}</label>
      <label>End: {vac.End}</label>
      {localStorage.role !== "admin" ? (
        <div>
          <button onClick={followBtn}>{userFollowed.includes(vac._id) ? "Unfollow" : "follow"}</button>
        </div>
      ) : (
        <div className={style.Btn}>
          <button onClick={editBtn}>Edit</button>
          <button onClick={removeBtn}>remove</button>
        </div>
      )}
    </div>
  );
}
