import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StepFour from "./components/assessment-form/step-four/StepFour";
import StepOne from "./components/assessment-form/step-one/StepOne";
import StepSix from "./components/assessment-form/step-six/StepSix";
import StepThree from "./components/assessment-form/step-three/StepThree";
import StepTwo from "./components/assessment-form/step-two/StepTwo";
import StepFive from "./components/assessment-form/stepFive/StepFive";
import Home from "./components/home/Home";
import DataContext from "./context/DataContext";
import "./index.css";
import { BASE_API_URL } from "./utils/constants";
import { initialState } from "./utils/initialstate";

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const [data, setData] = useState(initialState);
  const [step, setStep] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [patientId, setPatientId] = useState("");

  const handleUpdatePatient = async (patient_id, dataToUpdate) => {
    try {
      await axios.put(`${BASE_API_URL}/v1/patient/${patient_id}`, dataToUpdate);
      // await axios.get(`/patient.json`);
      return true;
    } catch (error) {
      console.log("Error while updating patient. Please try again");
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        step,
        setStep,
        isReadOnly,
        setIsReadOnly,
        setIsEdit,
        isEdit,
        handleUpdatePatient,
        patientId,
        setPatientId,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step-one" element={<StepOne />} />
        <Route path="/step-two" element={<StepTwo />} />
        <Route path="/step-three" element={<StepThree />} />
        <Route path="/step-four" element={<StepFour />} />
        <Route path="/step-five" element={<StepFive />} />
        <Route path="/step-six" element={<StepSix />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DataContext.Provider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
