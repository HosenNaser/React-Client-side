import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../style/inputs.module.scss";

export default function NewVac() {
  const params = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  let editVac: any;
  let fetchUrl: string;
  if (params.id !== null && params.id !== undefined) {
    editVac = JSON.parse(localStorage.getItem(params.id as string) as string);
  }
  // Add New Vacation To DataBase
  const AddToVac = async () => {
    setMsg("");

    let data = {
      Description: (document.getElementById("description") as HTMLInputElement).value,
      Destination: (document.getElementById("destination") as HTMLInputElement).value,
      Price: (document.getElementById("price") as HTMLInputElement).value,
      Start: (document.getElementById("fDate") as HTMLInputElement).value,
      End: (document.getElementById("lDate") as HTMLInputElement).value,
      Image: editVac == null ? image : editVac.Image,
    };
    if (editVac == null) {
      fetchUrl = "http://localhost:5000/vacations/Add";
    } else {
      fetchUrl = `http://localhost:5000/vacations/Edit/${params.id}`;
    }
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("vacations");
        return res;
      })
      .catch((err) => console.log(err));

    if (!res.success) {
      setMsg("missing Values");
    } else {
      navigate("/");
    }
  };
  return (
    <div className={style.FormContainer}>
      <div>
        <span>Add New Vacation</span>
      </div>
      <div className={style.form}>
        <table>
          <tbody>
            <tr>
              <td>Description:</td>
              <td>
                <input defaultValue={editVac == null ? "" : editVac.Description} id="description" type="text" />
              </td>
            </tr>
            <tr>
              <td>Destination:</td>
              <td>
                <input defaultValue={editVac == null ? "" : editVac.Destination} id="destination" type="text" />
              </td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>
                {" "}
                <input defaultValue={editVac == null ? "" : editVac.Price} id="price" type="number" />
              </td>
            </tr>
            <tr>
              <td>Start:</td>
              <td>
                {" "}
                <input defaultValue={editVac == null ? "" : editVac.Start} id="fDate" type="date" />
              </td>
            </tr>
            <tr>
              <td>End:</td>
              <td>
                <input defaultValue={editVac == null ? "" : editVac.End} id="lDate" type="date" />
              </td>
            </tr>
            <tr>
              <td>Image:</td>
              <td>
                <input
                  id="img"
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImage(reader.result as string);
                    };
                    reader.readAsDataURL(e.target.files?.item(0) as File);
                  }}
                  type="file"
                  accept="image/*"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <label style={{ color: "red", fontSize: 22 }}>{msg !== "" ? msg : null}</label>
        </div>
        <div className={style.Btn}>
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={AddToVac}>{editVac == null ? "Add" : "Edit"}</button>
        </div>
      </div>
    </div>
  );
}
