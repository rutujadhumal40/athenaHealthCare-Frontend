import { useForm } from "react-hook-form";
import DataContext from "../../../context/DataContext";
import PatientStepper from "../../Patients_Stepper/Stepper";
import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./basicInfo.css";
import axios from "axios";
const BasicInfo = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);
  const {
    setData,
    setIsReadOnly,
    setStep,
    patientId,
    filteredData,
    step,
    setBalance,
    balance,
    patientName,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      suffix: filteredData?.pati,
      first_name: "",
      last_name: "",
      country_code: "",
      state: "",
      zip: "",
      dob: "",
      department_id: "",
      status: "",
    },
  });
  useEffect(() => {
    let updatedData = filteredData.filter(
      (item) => item.patient_id === patientId
    );
    setPatientData(updatedData);
    const getBalanceData = async () => {
      try {
        const { data: details } = await axios.get(
          `http://localhost:5000/getBalance/${patientId}`
        );
        console.log("BALANCE", details);
        setBalance(details);
      } catch (error) {
      } finally {
      }
    };
    getBalanceData();
  }, []);

  const handleClick = () => {
    setStep(2);
    navigate("/appointments");
  };
  return (
    <>
      <PatientStepper step={step} />
      <div className="step-form container step-three">
        <h4 className="text-dark">Patient's Information</h4>
        <Table style={{ textAlign: "center" }}>
          <thead className="bg-secondary text-white">
            <tr>
              <th>Home Phone</th>
              <th>Mobile Phone</th>
              <th>ZIP</th>
              <th>DOB</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {patientData.map((patient, index) => {
              const { homephone, mobilephone, zip, dob, status } =
                patient || {};

              return (
                <tr key={index}>
                  <td>{homephone}</td>
                  <td>{mobilephone}</td>
                  <td>{zip}</td>
                  <td>{dob}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <h4 className="text-dark">Balances</h4>
        <Table style={{ textAlign: "center" }}>
          <thead className="bg-secondary text-white">
            <tr>
              <th>Patient Name</th>
              <th>Balance</th>
              <th>Clean Balance</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {balance.map((item, index) => {
              const { balance, cleanbalance } = item || {};
              return (
                <tr key={index}>
                  <td>{patientName}</td>
                  <td>{balance}</td>
                  <td>{cleanbalance ? "true" : "false"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button onClick={() => handleClick()} className="btn">
          Appointment List
        </Button>
      </div>
    </>
  );
};

export default BasicInfo;
