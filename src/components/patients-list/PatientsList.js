import { useContext, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import "./patientslist.css";

const PatientsList = ({ filteredData }) => {
  const navigate = useNavigate();

  const {
    setIsReadOnly,
    setStep,
    setIsEdit,
    setPatientId,
    setPatientName,
    showTable,
    setDeptId,
    setIsExistingPatient,
    setpatientIdforAppt,
    isExistingPatient,
    setIsView,
  } = useContext(DataContext);

  const handleViewDetailsClick = async (
    patient_id,
    firstname,
    selectedOption
  ) => {
    try {
      setIsView(false);
      setIsExistingPatient(true);
      setPatientId(patient_id);
      setPatientName(firstname);
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

  const handleClick = async (department_id, patient_id, firstname, text) => {
    console.log("department_id", isExistingPatient, department_id, patient_id);
    setIsView(true);
    setIsExistingPatient(true);
    setpatientIdforAppt(patient_id);
    setDeptId(department_id);
    setPatientId(patient_id);
    setPatientName(firstname);
    if (text === "book") {
      navigate("/step-two");
    } else {
      navigate("/appointments");
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
  console.log("filteredData", filteredData);
  return (
    <div className="patients-list">
      {showTable && (
        <Table style={{ textAlign: "center" }}>
          <thead className="bg-secondary text-white">
            <tr>
              <th>Suffix</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Countrycode</th>
              <th>View</th>
              <th>View Appointment</th>
              <th>Book Appointment</th>
            </tr>
          </thead>
          <tbody className="bg-light text-dark">
            {filteredData.map((patient, index) => {
              const {
                department_id,
                patient_id,
                firstname,
                lastname,
                suffix,
                countrycode,
              } = patient || {};

              return (
                <tr key={index}>
                  <td>{suffix}</td>
                  <td>{firstname}</td>
                  <td>{lastname}</td>
                  <td>{countrycode}</td>
                  <td className="icon">
                    <AiOutlineEye
                      color="black"
                      size={30}
                      className="icon"
                      onClick={() =>
                        handleViewDetailsClick(patient_id, firstname, "view")
                      }
                    />
                  </td>
                  <td className="icon">
                    <button
                      style={{
                        width: "140px",
                        backgroundColor: "#5A84C3",
                        color: "white",
                        border: "0px",
                        borderRadius: "10px",
                      }}
                      onClick={() =>
                        handleClick(
                          department_id,
                          patient_id,
                          firstname,
                          "view"
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                  <td className="icon">
                    <button
                      style={{
                        width: "140px",
                        backgroundColor: "#5A84C3",
                        color: "white",
                        border: "0px",
                        borderRadius: "10px",
                      }}
                      onClick={() =>
                        handleClick(
                          department_id,
                          patient_id,
                          firstname,
                          "book"
                        )
                      }
                    >
                      Book
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PatientsList;
