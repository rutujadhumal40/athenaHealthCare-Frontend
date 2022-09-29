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
    step,
    deptId,
    patientIdForAppt,
    setAppointmentId,
    openAppt,
    setOpenAppt,
    isExistingPatient,
    isView,
    patientName,
  } = useContext(DataContext);

  const handleClick = async (appointment_id) => {
    setAppointmentId(appointment_id);
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
      const filterAppt = openAppt.filter(
        (item) => item.appointment_id !== appointment_id
      );
      setOpenAppt(filterAppt);
      setShow(true);
    }
  };

  return (
    <>
      {!isExistingPatient && !isView && <Stepper step={step} />}
      {loading ? (
        <div class="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          {isExistingPatient && isView && (
            <Link to={step >= 1 ? "/" : ""}>
              <AiFillHome color="#5A84C3" size={30} className="home" />
            </Link>
          )}
          <div className={`step-form container step-three mt-5`}>
            <h5 className="openAppointment">
              Open Appointments for {patientName}
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
                          className="bookAppointmentbtn"
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
