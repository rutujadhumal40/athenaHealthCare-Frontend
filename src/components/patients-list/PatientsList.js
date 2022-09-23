import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { BASE_API_URL } from "../../utils/constants";
import "./patientslist.css";

const PatientsList = ({ filteredData, setFilteredData }) => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setData, setIsReadOnly, setStep, setIsEdit, setPatientId } =
    useContext(DataContext);

  const handleViewDetailsClick = async (patient_id, selectedOption) => {
    try {
      setPatientId(patient_id);
      // const { data: details } = await axios.get(
      //   `${BASE_API_URL}/v1/patient/${patient_id}`
      // );
      // const { data: details } = await axios.get(`/patient.json`);
      //   setData(details);
      setStep(1);
      if (selectedOption === "view") {
        setIsEdit(false);
        setIsReadOnly(true);
      } else if (selectedOption === "edit") {
        setIsReadOnly(false);
        setIsEdit(true);
      }
      navigate("/basicInfo");
    } catch (error) {
      console.log("error while viewing details. Try again later.");
    }
  };

  // const handleDeleteClick = async (patient_id, motherName) => {
  //   const response = window.confirm(
  //     `Are you sure you want to delete patient data for mother name ${motherName}?`
  //   );
  //   if (response) {
  //     try {
  //       await axios.delete(`${BASE_API_URL}/v1/patient/${patient_id}`);
  //       setSuccessMsg("Data is successfully deleted.");
  //       setFilteredData(
  //         filteredData.filter((patient) => patient.patient_id !== patient_id)
  //       );
  //       setErrorMsg("");
  //       setTimeout(() => {
  //         setSuccessMsg("");
  //       }, 5000);
  //     } catch (error) {
  //       setSuccessMsg("");
  //       setErrorMsg("Error while deleting data. Please try again.");
  //     }
  //   }
  // };

  return (
    <div className="patients-list">
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Table style={{ textAlign: "center" }}>
        <thead className="bg-secondary text-white">
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Suffix</th>
            <th>Countrycode</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="bg-light text-dark">
          {filteredData.map((patient, index) => {
            const { patient_id, firstname, lastname, suffix, countrycode } =
              patient || {};

            return (
              <tr key={index}>
                <td>{patient_id}</td>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{suffix}</td>
                <td>{countrycode}</td>
                <td className="icon">
                  <AiOutlineEye
                    color="black"
                    size={30}
                    className="icon"
                    onClick={() => handleViewDetailsClick(patient_id, "view")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientsList;
