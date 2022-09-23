import { useForm } from "react-hook-form";
import DataContext from "../../../context/DataContext";
import PatientStepper from "../../Patients_Stepper/Stepper";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

//import "../../assessment-form/step-one/stepone.css";
import "./basicInfo.css";
import axios from "axios";
const BasicInfo = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState([]);
  const {
    setData,
    setIsReadOnly,
    setStep,
    setIsEdit,
    setPatientId,
    patientId,
    filteredData,
    isReadOnly,
    inProgress,
    step,
    setBalance,
    balance,
    setLoading,
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
    console.log("updatedData", updatedData);
    setPatientData(updatedData);
    // setPatientData([
    //   {
    //     patient_id: "1",
    //     suffix: "Ms.",
    //     firstname: "Rutuja",
    //     lastname: "Dhumal",
    //     countrycode: "US",
    //     state: "NY",
    //     homephone: "123",
    //     mobilephone: "123",
    //     zip: "123",
    //     dob: "12/03/1996",
    //     department_id: "1",
    //     status: "active",
    //   },
    // ]);

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
  // className="form-heading"
  return (
    <>
      <PatientStepper step={step} />
      <div className="step-form container step-three">
        {/* <AiFillHome color="black" size={30} className="icon" /> */}
        <h4 className="text-dark">Patient's Information</h4>
        <Table
          style={{ textAlign: "center" }}
          // striped
          // bordered
          // hover
          // responsive
        >
          <thead className="bg-secondary text-white">
            <tr>
              <th>Home Phone</th>
              <th>Mobile Phone</th>
              <th>ZIP</th>
              <th>DOB</th>
              <th>Department Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {patientData.map((patient, index) => {
              const {
                homephone,
                mobilephone,
                zip,
                dob,
                department_id,
                status,
              } = patient || {};

              return (
                <tr key={index}>
                  <td>{homephone}</td>
                  <td>{mobilephone}</td>
                  <td>{zip}</td>
                  <td>{dob}</td>
                  <td>{department_id}</td>
                  <td>{status}</td>

                  {/* <td className="icon">
                  <AiOutlineEdit
                    size={30}
                    className="icon"
                    // onClick={() => handleViewDetailsClick(patient_id, "edit")}
                  />
                </td> */}
                  {/* <td className="icon">
                  <AiOutlineDelete
                    size={30}
                    className="icon"
                    // onClick={() => handleDeleteClick(patient_id, motherName)}
                  />
                </td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>

        <h4 className="text-dark">Balances</h4>
        <Table
          style={{ textAlign: "center" }}
          // striped
          // bordered
          // hover
          // responsive
        >
          <thead className="bg-secondary text-white">
            <tr>
              <th>Patient ID</th>
              <th>Balance</th>
              <th>Clean Balance</th>
              <th>Provider Group ID</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {balance.map((item, index) => {
              const { patient_id, balance, cleanbalance, providergroupid } =
                item || {};

              return (
                <tr key={index}>
                  <td>{patient_id}</td>
                  <td>{balance}</td>
                  <td>{cleanbalance ? 'true' : 'false'}</td>
                  <td>{providergroupid}</td>

                  {/* <td className="icon">
                  <AiOutlineEdit
                    size={30}
                    className="icon"
                    // onClick={() => handleViewDetailsClick(patient_id, "edit")}
                  />
                </td> */}
                  {/* <td className="icon">
                  <AiOutlineDelete
                    size={30}
                    className="icon"
                    // onClick={() => handleDeleteClick(patient_id, motherName)}
                  />
                </td> */}
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
