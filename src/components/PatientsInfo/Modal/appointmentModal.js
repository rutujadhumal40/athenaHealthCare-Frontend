import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DataContext from "../../../context/DataContext";
const PatientModal = (props) => {
  const { show, setShow, appointments, modalData, apptId } = props;
  const { setInsurance, insurance,patientName } = useContext(DataContext);

  

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
          <Modal.Title>Appointment Details for {patientName}</Modal.Title>
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
                <th>Insurance Name</th>
                <th>Insurance Type</th>
                {/* <th>Policy Number</th> */}
                {/* <th>Insurance Phone</th> */}
                <th>Insurance Policyholder</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Issue Date</th>
                <th>Expiration Date</th>
                <th>Eligibility Status</th>


              </tr>
            </thead>
            <tbody className="bg-light text-dark">
              {insurance.map((item, index) => {
                const {
                  insuranceplanname,
                  policynumber,
                  issuedate,
                  insurancephone,
                  insurancepolicyholder,
                  expirationdate,
                  insurancetype,
                  insurancepolicyholdercountrycode,
                  insurancepolicyholderstate,
                  insurancepolicyholdercity,
                  eligibilitystatus
                } = item || {};

                return (
                  <tr key={index}>
                    <td>{insuranceplanname}</td>
                    <td>{insurancetype}</td>
                    {/* <td>{policynumber}</td> */}
                    {/* <td>{insurancephone}</td> */}
                    <td>{insurancepolicyholder}</td>
                    <td>{insurancepolicyholdercountrycode}</td>
                    <td>{insurancepolicyholderstate}</td>
                    <td>{insurancepolicyholdercity}</td>
                    <td>{issuedate}</td>
                    <td>{expirationdate}</td>
                    <td>{eligibilitystatus}</td>

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
