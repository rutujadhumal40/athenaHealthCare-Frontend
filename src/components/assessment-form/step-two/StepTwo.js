import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row,Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import useAlert from "../../../custom-hooks/useAlert";
import {
  ATLEAST_ONE_SELECT,
  NEXT_BUTTON_TEXT,
  PREVIOUS_BUTTON_TEXT,
  REQUIRED_ERROR_MSG,
  UPDATE_BUTTON_TEXT,
  UPDATE_PROGRESS_BUTTON_TEXT,
} from "../../../utils/constants";
import { getConvertedDate } from "../../../utils/functions";
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "./steptwo.css";
import axios from "axios";

const StepTwo = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    console.log("INSIDE USE");
    axios.get("http://localhost:5000/getDepartments").then((data) => {
      console.log("DATA", data.data);
      setDepartments(data.data);
    });
  }, []);
  const navigate = useNavigate();
  const {
    data,
    setData,
    step,
    isReadOnly,
    handleUpdatePatient,
    patientId,
    isEdit,
  } = useContext(DataContext);

  // const {
  //   successMsg,
  //   setSuccessMsg,
  //   errorMsg,
  //   setErrorMsg,
  //   isUpdated,
  //   setIsUpdated,
  //   inProgress,
  //   setInProgress,
  // } = useAlert();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     dateOfService: data?.patientVisit?.dateOfService
  //       ? getConvertedDate(data?.patientVisit?.dateOfService)
  //       : null,
  //     pulseRate: data?.patientVisit?.vitalSigns?.temperature?.pulseRate,
  //     respirationRate:
  //       data?.patientVisit?.vitalSigns?.temperature?.respirationRate,
  //     bloodPressure: data?.patientVisit?.vitalSigns?.temperature?.bloodPressure,
  //     weight: data?.patientVisit?.vitalSigns?.temperature?.weight,
  //     smokeStatus: data?.patientVisit?.smokeStatus === true ? "true" : "false",
  //   },
  // });

  // const showNextButton = isUpdated || (!isReadOnly && !isEdit) || isReadOnly;

  // const handleFormSubmit = async (values) => {
  //   const { dateOfService, smokeStatus, ...rest } = values;
  //   const dataToUpdate = {
  //     patientVisit: {
  //       dateOfService,
  //       smokeStatus: smokeStatus === "true" ? true : false,
  //       vitalSigns: {
  //         temperature: {
  //           ...rest,
  //         },
  //       },
  //     },
  //   };
  //   setData((prev) => ({
  //     ...prev,
  //     ...dataToUpdate,
  //   }));
  //   if (showNextButton) {
  //     setSuccessMsg("");
  //     setErrorMsg("");
  //     navigate("/step-three");
  //   } else {
  //     try {
  //       setInProgress(true);
  //       const response = await handleUpdatePatient(patientId, {
  //         ...data,
  //         ...dataToUpdate,
  //       });
  //       if (response === true) {
  //         setIsUpdated(true);
  //         setSuccessMsg("Data is successfully updated.");
  //         setErrorMsg("");
  //       } else {
  //         setErrorMsg("Error while updating data. Please try again.");
  //         setSuccessMsg("");
  //       }
  //     } catch (error) {
  //     } finally {
  //       setInProgress(false);
  //     }
  //   }
  // };

  const handlePreviousClick = () => {
    navigate("/step-one");
  };

  const handleNextClick = () => {
    navigate("/step-three");
  };

  const handleOpenAppt = async (department_id) => {
    // setDepttId(department_id);
    // navigate("/step-three");
  };
  return (
    <>
      <Header />
      <Stepper step={step} />

      <div style={{ margin: "30px" }}>
        <Table>
          <thead className="table-active">
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>State</th>
              <th>City</th>
              <th>Timezone</th>
              <th>Open Appointments</th>
            </tr>
          </thead>
          <tbody className="table-light">
            {departments.map((patient, index) => {
              const [
                department_id,
                department_name,
                state,
                city,
                timezone_name,
              ] = patient;
              return (
                <tr key={index}>
                  <td>{department_id}</td>
                  <td>{department_name}</td>
                  <td>{state}</td>
                  <td>{city}</td>
                  <td>{timezone_name}</td>
                  <td>
                    <Button onClick={() => handleOpenAppt(department_id)}>
                      Check Open Appt
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="step-form container step-two">
        <Form>
          <Form.Group className="mb-3 buttons">
            {/* <Button type="button" onClick={handlePreviousClick}>
              {PREVIOUS_BUTTON_TEXT}
            </Button> */}
            {/* <Button type="submit" className="btn" onClick={handleNextClick}>
              {NEXT_BUTTON_TEXT}
            </Button> */}
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default StepTwo;
