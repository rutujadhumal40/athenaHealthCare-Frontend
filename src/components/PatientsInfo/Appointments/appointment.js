import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import axios from "axios";
import PatientStepper from "../../Patients_Stepper/Stepper";
import "../../patients-list/patientslist.css";
import { Button, Table } from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import PatientModal from "../Modal/appointmentModal";

const Appointment = () => {
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
    appointments,
    setAppointments,
    insurance,
    setInsurance,
    setLoading,
    setApptId,
    apptId,
  } = useContext(DataContext);

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    console.log("patientId", patientId);
    const getAppointments = async () => {
      try {
        console.log("INSIDE getBalanceData");
        const { data: details } = await axios.get(
          `http://localhost:5000/getAppointments/${patientId}`
        );
        console.log("details", details);
        setAppointments(details);
        // setAppointments([
        //   {
        //     patientid: "1",
        //     appointmentid: "1173723",
        //     departmentid: "102",
        //     appointmenttype: "PHYSICAL",
        //     providerid: "26",
        //     starttime: "00:00",
        //     duration: "15",
        //     date: "07/25/2024",
        //   },
        //   {
        //     patientid: "1",
        //     appointmentid: "1173724",
        //     departmentid: "102",
        //     appointmenttype: "PHYSICAL",
        //     providerid: "26",
        //     starttime: "00:00",
        //     duration: "15",
        //     date: "07/25/2024",
        //   },
        // ]);
      } catch (error) {
      } finally {
      }
    };

    const getInsurances = async () => {
      try {
        console.log("INSIDE getBalanceData");
        const { data: details } = await axios.get(
          `http://localhost:5000/getInsurances/${apptId}`
        );
        console.log("details", details);
        setInsurance(details);
        // setAppointments([
        //   {
        //     patientid: "1",
        //     appointmentid: "1173723",
        //     departmentid: "102",
        //     appointmenttype: "PHYSICAL",
        //     providerid: "26",
        //     starttime: "00:00",
        //     duration: "15",
        //     date: "07/25/2024",
        //   },
        //   {
        //     patientid: "1",
        //     appointmentid: "1173724",
        //     departmentid: "102",
        //     appointmenttype: "PHYSICAL",
        //     providerid: "26",
        //     starttime: "00:00",
        //     duration: "15",
        //     date: "07/25/2024",
        //   },
        // ]);
      } catch (error) {
      } finally {
      }
    };
    getAppointments();
    getInsurances();
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
      <PatientStepper step={step} />
      <div className="step-form container step-three">
        <h5 style={{ marginBottom: "20px", textAlign: "center" }}>
          Appointments List for PatientID {patientId}
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
              <th>Patient ID</th>
              <th>Appointment ID</th>
              <th>Department ID</th>
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
                  <td>{patientid}</td>
                  <td>{appointmentid}</td>
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
      {show && (
        <PatientModal
          show={show}
          setShow={setShow}
          appointments={appointments}
          modalData={modalData}
          insurance={insurance}
          apptId={apptId}
        />
      )}
    </>
  );
};

export default Appointment;
