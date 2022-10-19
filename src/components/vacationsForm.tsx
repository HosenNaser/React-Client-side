import { useEffect, useState } from "react";
import Card from "./vacationCard";
import style from "../style/vacations.module.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Pagination from "./pagination";

export default function Vacations() {
  const navigator = useNavigate();
  const params = useParams();
  const [update, setUpdate] = useState(true);

  //!! add vacations to local storage
  const [vacations, setVacations] = useState([]);
  const current = parseInt(params.id as string);

  useEffect(() => {
    if (localStorage.vacations === null || localStorage.vacations === undefined) {
      if (update) {
        const res = async () => {
          await fetch("https://vacation-server-side-production.up.railway.app/vacations")
            .then((res) => res.json())
            .then((data) => {
              setUpdate(false);
              setVacations(data.vacations);
              localStorage.setItem("vacations", JSON.stringify(data.vacations));
            })
            .catch((err) => console.log(err));
        };
        res();
      }
    } else {
      setVacations(JSON.parse(localStorage.getItem("vacations") as string));
    }
  }, [update]);

  // navigate to login if user not logged in
  if (!localStorage.username) {
    return <Navigate to={"/"} />;
  }

  // navigate to dashboard to get params
  if (params.id === null || params.id === undefined) {
    navigator("/DashBoard/1");
  }

  let pagination = {
    numberOfCards: vacations.length,
    limitPerPage: 10,
    TotalPages: Math.ceil(vacations.length / 10),
    paginationSize: 7,
    currentPage: parseInt(params.id as string),
  };

  return (
    <>
      <>
        <div className={style.vacMainBody}>
          <div className={style.vacContainer}>
            {vacations.length === 0 ? (
              <label>Please Add New Vacation</label>
            ) : !JSON.parse(localStorage.filter) ? (
              vacations.slice(current * 10 - 10, current * 10).map((vac: any) => {
                return <Card key={vac._id} vac={vac} />;
              })
            ) : (
              vacations
                .filter((vac: any) => {
                  return localStorage.followed.includes(vac._id);
                })
                .map((vac: any) => {
                  return <Card key={vac._id} vac={vac} />;
                })
            )}
          </div>
        </div>
        <Pagination pagination={pagination} />
      </>
    </>
  );
}
