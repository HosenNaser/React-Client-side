import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import style from "../style/vacations.module.scss";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Charts() {
  const [data, setData] = useState<any>();
  const [fetchNow, setFetch] = useState(true);
  let labels: any = [];
  let followers: any = [];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const vacations = async () => {
    if (fetchNow) {
      await fetch("https://vacation-server-side-production.up.railway.app/vacations")
        .then((res) => res.json())
        .then((result) => {
          let res = result.vacations;

          res.forEach((e: any) => {
            if (e.followers > 0) {
              labels.push(e.Destination as string);
              followers.push(e.followers);
            }
          });

          let data = {
            labels,
            datasets: [
              {
                label: "followers",
                data: labels.map((v: any, i: any) => followers[i]),
                backgroundColor: "rgba(255, 99, 0, 0.5)",
              },
            ],
          };
          setData(data);
          setFetch(false);
        })
        .catch((err) => console.log("err"));
    }
  };

  vacations();

  if (!fetchNow) {
    return (
      <div className={style.chart}>
        <Bar options={options} data={data} />
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
