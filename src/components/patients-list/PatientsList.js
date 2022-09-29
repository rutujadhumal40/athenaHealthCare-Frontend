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
                  <td>
                    <button
                      className="viewBtn"
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
                  <td>
                    <button
                      className="viewBtn"
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
