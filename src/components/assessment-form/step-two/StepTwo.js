import { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import Stepper from "../../stepper/Stepper";
import "./steptwo.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const StepTwo = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleDetails = () => {
    //setStep(3);
    navigate("/");
  };

  useEffect(async () => {
    console.log("INSIDE USE", deptId);
    try {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/getOpenAppointments/${deptId}`)
        .then((data) => {
          console.log("DATA", data.data);
          setOpenAppt(data.data);
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
    departments,
    setDepartments,
    deptId,
    patientIdForAppt,
    setAppointmentId,
    setStep,
    appointmentId,
    openAppt,
    setOpenAppt,
    isExistingPatient,
  } = useContext(DataContext);

  console.log("isExistingPatient", isExistingPatient);
  const handleClick = async (appointment_id) => {
    setAppointmentId(appointment_id);
    console.log("patientIdForAppt", patientIdForAppt, appointment_id);
    // navigate("/step-three");
    try {
      setLoading(true);
      await axios
        .get(
          `http://localhost:5000/createNewAppointment/${patientIdForAppt}/${appointment_id}`
        )
        .then((data) => {
          console.log("DATA", data.data);
        });
    } catch (error) {
    } finally {
      setLoading(false);
      setShow(true);
    }
  };
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

  return (
    <>
      {!isExistingPatient && <Stepper step={step} />}
      {loading ? (
        <div class="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          <Link to={step >= 1 ? "/" : ""}>
            <AiFillHome color="#5A84C3" size={30} className="home" />
          </Link>
          <div className={`step-form container step-three mt-5`}>
            <h5 style={{ marginBottom: "20px", textAlign: "center" }}>
              Open Appointments for {deptId}
            </h5>
            <Table style={{ textAlign: "center" }}>
              <thead className="table-active">
                <tr>
                  <th>Appointment Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Start Time</th>
                  <th>Book Appointment</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {openAppt.map((patient, index) => {
                  const {
                    appointment_id,
                    appointment_type,
                    date,
                    duration,
                    start_time,
                  } = patient;
                  return (
                    <tr key={index}>
                      <td>{appointment_type}</td>
                      <td>{date}</td>
                      <td>{duration} mins</td>
                      <td>{start_time}</td>
                      <td className="icon">
                        <button
                          style={{
                            width: "150px",
                            backgroundColor: "#5A84C3",
                            color: "white",
                            border: "0px",
                          }}
                          onClick={() => handleClick(appointment_id)}
                        >
                          {loading ? "Loading" : "Book Appointment"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>Appointment Booked successfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleDetails}>
                Go To Home
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default StepTwo;
