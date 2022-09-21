import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import useAlert from "../../../custom-hooks/useAlert";
import {
  ATLEAST_ONE_SELECT,
  BASE_API_URL,
  PREVIOUS_BUTTON_TEXT,
  REQUIRED_ERROR_MSG,
  SUBMIT,
  UPDATE_BUTTON_TEXT,
} from "../../../utils/constants";
import { getConvertedDate } from "../../../utils/functions";
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "../step-one/stepone.css";

const StepSix = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const {
    setData,
    step,
    data,
    isReadOnly,
    isEdit,
    handleUpdatePatient,
    patientId,
  } = useContext(DataContext);

  const { inProgress, setInProgress } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      appointmentDate: data?.patientFollowUpAppointments?.pFollowupAppointment
        ?.appointmentDate
        ? getConvertedDate(
            data?.patientFollowUpAppointments?.pFollowupAppointment
              ?.appointmentDate
          )
        : null,

      childFollowupAppointment_appointmentDate: data
        ?.patientFollowUpAppointments?.childFollowupAppointment?.appointmentDate
        ? getConvertedDate(
            data?.patientFollowUpAppointments?.childFollowupAppointment
              ?.appointmentDate
          )
        : null,

      childFollowupAppointment_healthCare:
        data?.patientFollowUpAppointments?.childFollowupAppointment?.healthCare,

      childFollowupAppointment_isAppointmentTaken:
        data?.patientFollowUpAppointments?.childFollowupAppointment
          ?.isAppointmentTaken === true
          ? "Yes"
          : "No",

      healthCare:
        data?.patientFollowUpAppointments?.pFollowupAppointment?.healthCare,

      isAppointmentTaken:
        data?.patientFollowUpAppointments?.pFollowupAppointment
          ?.isAppointmentTaken === true
          ? "Yes"
          : "No",
    },
  });

  const handleFormSubmit = async (values) => {
    const {
      appointmentDate,
      childFollowupAppointment_appointmentDate,
      childFollowupAppointment_healthCare,
      childFollowupAppointment_isAppointmentTaken,
      healthCare,
      isAppointmentTaken,
    } = values;
    const dataToUpdate = {
      patientFollowUpAppointments: {
        pFollowupAppointment: {
          isAppointmentTaken: isAppointmentTaken === "Yes" ? true : false,
          appointmentDate: appointmentDate,
          healthCare: healthCare,
        },
        childFollowupAppointment: {
          isAppointmentTaken:
            childFollowupAppointment_isAppointmentTaken === "Yes"
              ? true
              : false,
          appointmentDate: childFollowupAppointment_appointmentDate,
          healthCare: childFollowupAppointment_healthCare,
        },
      },
    };

    setData((prev) => ({
      ...prev,
      ...dataToUpdate,
    }));

    if (!isReadOnly) {
      try {
        if (isEdit) {
          setInProgress(true);
          const response = await handleUpdatePatient(patientId, {
            ...data,
            ...dataToUpdate,
          });
          if (response === true) {
            setSuccessMsg("Data is successfully updated.");
            setErrorMsg("");
          } else {
            setErrorMsg("Error while updating data. Please try again.");
            setSuccessMsg("");
          }
        } else {
          await axios.post(`${BASE_API_URL}/v1/patient`, {
            ...data,
            ...dataToUpdate,
          });
          setSuccessMsg("Data is successfully saved.");
          setErrorMsg("");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        setSuccessMsg("");
        setErrorMsg("Error while saving data. Please try again.");
      } finally {
        setInProgress(false);
      }
    }
  };

  const handlePreviousClick = () => {
    navigate("/step-five");
  };

  return (
    <div>
      <Header />
      <Stepper step={step} />
      <div className="step-form container step-three">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <h4 className="form-heading">Follow-Up Appointments</h4>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>Follow-Up Appointment Made</Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="baby-gender"
                      controlId="isAppointmentTaken"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="Yes"
                        {...register("isAppointmentTaken", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="No"
                        {...register("isAppointmentTaken", {
                          required: true,
                        })}
                      />
                      {errors.isAppointmentTaken && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your appointment's date"
                  {...register("appointmentDate", {
                    required: true,
                  })}
                  disabled={isReadOnly}
                />
                {errors.appointmentDate && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Health Care Provider</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              className="address"
              {...register("healthCare", {})}
              disabled={isReadOnly}
            />
          </Form.Group>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>Well-Child Visit Appointment Made</Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3 baby-gender"
                      controlId="childFollowupAppointment"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="Yes"
                        {...register(
                          "childFollowupAppointment_isAppointmentTaken",
                          {
                            required: true,
                          }
                        )}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="No"
                        {...register(
                          "childFollowupAppointment_isAppointmentTaken",
                          {
                            required: true,
                          }
                        )}
                      />
                      {errors.childFollowupAppointment_isAppointmentTaken && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your appointment's date"
                  {...register("childFollowupAppointment_appointmentDate", {
                    required: true,
                  })}
                  disabled={isReadOnly}
                />
                {errors.childFollowupAppointment_appointmentDate && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Health Care Provider</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              className="address"
              {...register("childFollowupAppointment_healthCare", {})}
              disabled={isReadOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3 buttons">
            <Button type="button" onClick={handlePreviousClick}>
              {PREVIOUS_BUTTON_TEXT}
            </Button>
            {!isReadOnly && (
              <Button type="submit" className="btn" disabled={inProgress}>
                {isEdit ? UPDATE_BUTTON_TEXT : SUBMIT}
              </Button>
            )}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default StepSix;
