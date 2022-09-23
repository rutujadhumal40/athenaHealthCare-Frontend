import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DataContext from "../../../context/DataContext";
const PatientModal = (props) => {
  const { show, setShow, appointments, modalData, apptId } = props;
  const { setInsurance, insurance } = useContext(DataContext);

  const handleClose = () => setShow(false);
  useEffect(() => {
    const getInsurances = async () => {
      try {
        console.log("INSIDE getBalanceData");
        const { data: details } = await axios.get(
          `http://localhost:5000/getInsurances/${apptId}`
        );
        console.log("details", details);
        setInsurance(details);
      } catch (error) {
      } finally {
      }
    };
    getInsurances();
  }, []);
  return (
    <>
      <Modal
        show={show}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none", marginBottom: "0px" }}
        >
          <Modal.Title>Appointment Details for {apptId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            style={{ textAlign: "center", marginTop: "-24px" }}
            // striped
            // bordered
            // hover
            // responsive
          >
            <thead className="bg-secondary text-white">
              <tr>
                <th>ProviderID</th>
                <th>StartTime</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="bg-light text-dark">
              {modalData.map((patient, index) => {
                const { appointmentid, providerid, starttime, duration, date } =
                  patient || {};

                return (
                  <tr key={index}>
                    <td>{providerid}</td>
                    <td>{starttime}</td>
                    <td>{duration}</td>
                    <td>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title>Insurance Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table
            style={{ textAlign: "center", marginTop: "-24px" }}
            // striped
            // bordered
            // hover
            // responsive
          >
            <thead className="bg-secondary text-white">
              <tr>
                <th>InsuranceID</th>
                <th>policynumber</th>
                <th>issuedate</th>
                <th>insurancephone</th>
                <th>insurancepolicyholder</th>
                <th>expirationdate</th>

              </tr>
            </thead>
            <tbody className="bg-light text-dark">
              {insurance.map((item, index) => {
                const {
                  insuranceid,
                  policynumber,
                  issuedate,
                  insurancephone,
                  insurancepolicyholder,
                  expirationdate
                } = item || {};

                return (
                  <tr key={index}>
                    <td>{insuranceid}</td>
                    <td>{policynumber}</td>
                    <td>{issuedate}</td>
                    <td>{insurancephone}</td>
                    <td>{insurancepolicyholder}</td>
                    <td>{expirationdate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientModal;
