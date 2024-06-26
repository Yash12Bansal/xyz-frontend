import "./App.css";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Unapproved from "./components/Unapproved";
import Fooddb from "./components/FoodDatabase";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import GoogleAuth from "./components/GoogleAuth";
// import Fooddb from './components/FoodDatabase';
// import InsulinEntries from './components/InsulinEntries';
// import InsulinPatient from './components/InsulinPatient';
// import Patients from './components/Patients';
// import PatientsDetails from './components/PatientDetails';
// import InsulinDetails from './components/InsulinDetails';
// import FoodDetails from './components/FoodDetails';
// import BgDetails from './components/BgDetails';
// import Prediction from './components/PredictionICR';
// import PredictionDetails from './components/PredictionDetails';
// import EditPrediction from './components/EditPrediction';
// import AddPrediction from './components/AddPrediction';
import Main from "./components/Main";
import RotatingDot from "./components/RotatingDot";
import Patients from "./components/Patients";
import PatientDetails from "./components/PatientDetails";
import InsulinPatient from "./components/InsulinDetails";
import MonthRecord from "./components/MonthRecord";
import BgDetails from "./components/BgDetails";
import FoodDetails from "./components/FoodDetails";
// import PatientLogin from './components/PatientLogin';
// import MonthRecord from './components/MonthRecord';
// import SinglePatientDetail from './components/SinglePatientDetail'
// https://sheets.googleapis.com/v4/spreadsheets/{{googleSheetId}}
function App() {
  const [user, setUser] = useState(null);
  // http://localhost:8080/
  const getUser = async () => {
    console.log("THIS GET uSER FUNCTION IS CALLED NOW");
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/web/login/success`;
      const { data } = await axios({
        method: "GET",
        url: url,
        withCredentials: true,
        headers: {
          // Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      });
      console.log("XXXXX", data);

      setUser(data.user);
      // console.log("THIS IS THE USER THAT IS CURRENTLY LOGGED IN")
      // console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Fragment>
        {/* <Navbar></Navbar> */}
        <Routes></Routes>
        <section>
          <switch>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  user ? (
                    <Main user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/login/unApproved"
                element={
                  user ? <Navigate to="/login" /> : <Unapproved user={user} />
                }
              />

              <Route
                exact
                path="/login"
                element={
                  user ? (
                    <Navigate to="/" />
                  ) : (
                    <Landing user={user} setUser={setUser} />
                  )
                }
              />

              {/* <Route exact path="/admin" element={<Landing />} /> */}
              <Route
                exact
                path="/food-database"
                element={
                  user ? (
                    <Fooddb user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patients"
                element={
                  user ? (
                    <Patients user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id"
                element={
                  user ? (
                    <PatientDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/insulin"
                element={
                  user ? (
                    <InsulinPatient user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/food"
                element={
                  user ? (
                    <FoodDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/bg"
                element={
                  user ? (
                    <BgDetails user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/patient-details/:id/record/"
                element={
                  user ? (
                    <MonthRecord user={user} setUser={setUser} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* <Route exact path="/food-database" component={Fooddb} /> */}
              {/*<Route exact path="/insulin-entries" component= { InsulinEntries }  /> 
            <Route exact path="/insulin-entries/:id" component= { InsulinPatient }  />   
            <Route exact path="/patients" component= { Patients }  />   
            <Route exact path="/prediction" component= { Prediction }  /> 
            <Route exact path="/prediction/:id" component= { PredictionDetails }  /> 
            <Route exact path="/prediction-edit/:id" component= { EditPrediction }  /> 
            <Route exact path="/add-prediction/" component= { AddPrediction }  /> 
            <Route exact path="/patientlogin/" component= { PatientLogin }  /> 
            <Route exact path="/single-patient-details/:id" component= { SinglePatientDetail }  />  */}
            </Routes>
          </switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
