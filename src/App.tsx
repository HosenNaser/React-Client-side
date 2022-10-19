import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Charts from "./components/chart";
import Header from "./components/header";
import Login from "./components/loginForm";
import NewVac from "./components/newVacationForm";
import SignUpForm from "./components/signUpForm";
import Vacations from "./components/vacationsForm";

function App() {
  return (
    <section className="MainBody">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/DashBoard" element={<Vacations />} />
        <Route path="/DashBoard/:id" element={<Vacations />} />
        <Route path="/AddVacation" element={<NewVac />} />
        <Route path="/EditVacation/:id" element={<NewVac />} />
        <Route path="/chart" element={<Charts />} />
      </Routes>
    </section>
  );
}

export default App;
