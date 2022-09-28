import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import axios from "axios";
import PatientStepper from "../../Patients_Stepper/Stepper";
import "../../patients-list/patientslist.css";
import { Button, Table } from "react-bootstrap";
import PatientModal from "../Modal/appointmentModal";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const Appointment = () => {
  const {
    patientId,
    step,
    appointments,
    setAppointments,
    insurance,
    setApptId,
    apptId,
    patientName,
    isExistingPatient,
  } = useContext(DataContext);

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setLoading(true);
        console.log("INSIDE getBalanceData");
        const { data: details } = await axios.get(
          `http://localhost:5000/getAppointments/${patientId}`
        );
        setAppointments(details);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getAppointments();
  }, []);

  const handleClick = (appointmentid) => {
    setApptId(appointmentid);
    const updatedData = appointments.filter(
      (item) => item.appointmentid === appointmentid
    );
    setModalData(updatedData);
    setShow(true);
  };
  return (
    <>
      {!isExistingPatient && <PatientStepper step={step} />}
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
              Appointments List for {patientName}
            </h5>
            {/* <div className="patients-list"> */}
            {/* {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>} */}
            <Table
              style={{ textAlign: "center" }}
              // striped
              // bordered
              // hover
              // responsive
            >
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Patient Name</th>
                  {/* <th>Appointment ID</th> */}
                  <th>Department Name</th>
                  <th>Appointment Type</th>
                  <th>View details</th>
                </tr>
              </thead>
              <tbody className="bg-light text-dark">
                {appointments.map((patient, index) => {
                  const {
                    patientid,
                    appointmentid,
                    departmentid,
                    appointmenttype,
                    providerid,
                    starttime,
                    duration,
                    date,
                  } = patient || {};

                  return (
                    <tr key={index}>
                      <td>{patientName}</td>
                      {/* <td>{appointmentid}</td> */}
                      <td>{departmentid}</td>
                      <td>{appointmenttype}</td>
                      <td className="icon">
                        <Button
                          onClick={() => handleClick(appointmentid)}
                          style={{ margin: "0px", float: "none" }}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
      {show && (
        <PatientModal
          show={show}
          setShow={setShow}
          appointments={appointments}
          modalData={modalData}
          insurance={insurance}
          apptId={apptId}
          patientName={patientName}
        />
      )}
    </>
  );
};

export default Appointment;
