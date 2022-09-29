import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StepOne from "./components/assessment-form/step-one/StepOne";
import StepTwo from "./components/assessment-form/step-two/StepTwo";
import Home from "./components/home/Home";
import Appointment from "./components/PatientsInfo/Appointments/appointment";
import BasicInfo from "./components/PatientsInfo/BasicInfo/BasicInfo";
import DataContext from "./context/DataContext";
import { BASE_API_URL } from "./utils/constants";
import { initialState } from "./utils/initialstate";
import "./index.css";

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
  const [filteredData, setFilteredData] = useState([]);
  const [balance, setBalance] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [apptId, setApptId] = useState();
  const [deptId, setDeptId] = useState();
  const [patientIdForAppt, setpatientIdforAppt] = useState();
  const [departments, setDepartments] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  const [openAppt, setOpenAppt] = useState([]);
  const [isExistingPatient, setIsExistingPatient] = useState(false);
  const [isView, setIsView] = useState(false);

  return (
    <DataContext.Provider
      value={{
        setPatientName,
        patientName,
        data,
        setData,
        step,
        setStep,
        isReadOnly,
        setIsReadOnly,
        setIsEdit,
        isEdit,
        patientId,
        setPatientId,
        setFilteredData,
        filteredData,
        setBalance,
        balance,
        appointments,
        setAppointments,
        insurance,
        setInsurance,
        setApptId,
        apptId,
        setShowTable,
        showTable,
        departments,
        setDepartments,
        deptId,
        setDeptId,
        patientIdForAppt,
        setpatientIdforAppt,
        appointmentId,
        setAppointmentId,
        openAppt,
        setOpenAppt,
        isExistingPatient,
        setIsExistingPatient,
        isView,
        setIsView,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step-one" element={<StepOne />} />
        <Route path="/step-two" element={<StepTwo />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/basicInfo" element={<BasicInfo />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
    </DataContext.Provider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));
