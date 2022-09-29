import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import axios from "axios";
import PatientStepper from "../../Patients_Stepper/Stepper";
import "../../patients-list/patientslist.css";
import { Button, Table } from "react-bootstrap";
import PatientModal from "../Modal/appointmentModal";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "../patientInfo.css";
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
    isView,
  } = useContext(DataContext);

  console.log("isExistingPatient", isExistingPatient, isView);

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

  console.log("isExistingPatient", isExistingPatient, isView);
  return (
    <>
      {isExistingPatient && !isView && <PatientStepper step={step} />}
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
            <h5 className="apptList">Appointments List for {patientName}</h5>
            <Table className="align">
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Patient Name</th>
                  <th>Department Name</th>
                  <th>Appointment Type</th>
                  <th>View details</th>
                </tr>
              </thead>
              <tbody className="bg-light text-dark">
                {appointments.map((patient, index) => {
                  const { appointmentid, departmentid, appointmenttype } =
                    patient || {};

                  return (
                    <tr key={index}>
                      <td>{patientName}</td>
                      <td>{departmentid}</td>
                      <td>{appointmenttype}</td>
                      <td>
                        <Button
                          onClick={() => handleClick(appointmentid)}
                          className="viewBtn"
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
