import { useContext } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import useAlert from "../../../custom-hooks/useAlert";
import {
  ATLEAST_ONE_SELECT,
  NEXT_BUTTON_TEXT,
  PREVIOUS_BUTTON_TEXT,
  UPDATE_BUTTON_TEXT,
  UPDATE_PROGRESS_BUTTON_TEXT,
} from "../../../utils/constants";
import { getSelectedValue } from "../../../utils/functions";
import { educationalDiscussionData } from "../../../utils/labels/stepFiveLabels";
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "../step-one/stepone.css";

const StepFive = () => {
  const navigate = useNavigate();
  const {
    data,
    setData,
    step,
    isReadOnly,
    isEdit,
    handleUpdatePatient,
    patientId,
  } = useContext(DataContext);

  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    isUpdated,
    setIsUpdated,
    inProgress,
    setInProgress,
  } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      depressionScreening: getSelectedValue(
        data?.patientEducationalMaterial?.depressionScreening
      ),
      contraceptionMethod: getSelectedValue(
        data?.patientEducationalMaterial?.contraceptionMethod
      ),
      peripheralBloodGlucose: getSelectedValue(
        data?.patientEducationalMaterial?.peripheralBloodGlucose
      ),
      doctorAppointment: getSelectedValue(
        data?.patientEducationalMaterial?.doctorAppointment
      ),
      carSeatSafety: getSelectedValue(
        data?.patientEducationalMaterial?.carSeatSafety
      ),
      immunizationSchedule: getSelectedValue(
        data?.patientEducationalMaterial?.immunizationSchedule
      ),
      breastFeeding: getSelectedValue(
        data?.patientEducationalMaterial?.breastFeeding
      ),
      familyPlanning: getSelectedValue(
        data?.patientEducationalMaterial?.familyPlanning
      ),
      infantSafety: getSelectedValue(
        data?.patientEducationalMaterial?.infantSafety
      ),
      details: data?.patientEducationalMaterial?.details,
      checkups: getSelectedValue(data?.patientEducationalMaterial?.checkups),
    },
  });

  const showNextButton = isUpdated || (!isReadOnly && !isEdit) || isReadOnly;

  const handleFormSubmit = async (values) => {
    const {
      depressionScreening,
      contraceptionMethod,
      peripheralBloodGlucose,
      doctorAppointment,
      carSeatSafety,
      immunizationSchedule,
      breastFeeding,
      familyPlanning,
      infantSafety,
      details,
      checkups,
    } = values;

    const dataToUpdate = {
      patientEducationalMaterial: {
        depressionScreening: {
          educationProvided: depressionScreening.includes("educationProvided"),
          referred: depressionScreening.includes("referred"),
          declined: depressionScreening.includes("declined"),
        },
        contraceptionMethod: {
          educationProvided: contraceptionMethod.includes("educationProvided"),
          referred: contraceptionMethod.includes("referred"),
          declined: contraceptionMethod.includes("declined"),
        },
        peripheralBloodGlucose: {
          educationProvided:
            peripheralBloodGlucose.includes("educationProvided"),
          referred: peripheralBloodGlucose.includes("referred"),
          declined: peripheralBloodGlucose.includes("declined"),
        },
        doctorAppointment: {
          educationProvided: doctorAppointment.includes("educationProvided"),
          referred: doctorAppointment.includes("referred"),
          declined: doctorAppointment.includes("declined"),
        },
        carSeatSafety: {
          educationProvided: carSeatSafety.includes("educationProvided"),
          referred: carSeatSafety.includes("referred"),
          declined: carSeatSafety.includes("declined"),
        },
        immunizationSchedule: {
          educationProvided: immunizationSchedule.includes("educationProvided"),
          referred: immunizationSchedule.includes("referred"),

          declined: immunizationSchedule.includes("declined"),
        },
        breastFeeding: {
          educationProvided: breastFeeding.includes("educationProvided"),
          referred: breastFeeding.includes("referred"),
          declined: breastFeeding.includes("declined"),
        },
        infantSafety: {
          educationProvided: infantSafety.includes("educationProvided"),
          referred: infantSafety.includes("referred"),
          declined: infantSafety.includes("declined"),
        },
        familyPlanning: {
          educationProvided: familyPlanning.includes("educationProvided"),
          referred: familyPlanning.includes("referred"),
          declined: familyPlanning.includes("declined"),
        },
        checkups: {
          educationProvided: checkups.includes("educationProvided"),
          referred: checkups.includes("referred"),
          declined: checkups.includes("declined"),
        },
        details: details,
      },
    };

    setData((prev) => ({
      ...prev,
      ...dataToUpdate,
    }));

    if (showNextButton) {
      setSuccessMsg("");
      setErrorMsg("");
      navigate("/step-six");
    } else {
      try {
        setInProgress(true);
        const response = await handleUpdatePatient(patientId, {
          ...data,
          ...dataToUpdate,
        });
        if (response === true) {
          setIsUpdated(true);
          setSuccessMsg("Data is successfully updated.");
          setErrorMsg("");
        } else {
          setErrorMsg("Error while updating data. Please try again.");
          setSuccessMsg("");
        }
      } catch (error) {
      } finally {
        setInProgress(false);
      }
    }
  };

  const handlePreviousClick = () => {
    navigate("/step-four");
  };

 

  return (
    <div>
      <Header />
      <Stepper step={step} />
      <div className="step-form container step-one">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <h4 className="form-heading">
            Educational Discussions/Material(s) Provided
          </h4>
          <fieldset disabled={isReadOnly}>
            {educationalDiscussionData.map((item) => {
              return (
                <Row>
                  <Col>
                    <Form.Label>{item.formLabel}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3 baby-gender">
                      <Form.Check
                        type="checkbox"
                        label="Education Provided"
                        value="educationProvided"
                        {...register(`${item.registerLabel}`, {
                          required: true,
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3 baby-gender">
                      <Form.Check
                        type="checkbox"
                        label="Referred"
                        value="referred"
                        {...register(`${item.registerLabel}`, {
                          required: true,
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3 baby-gender">
                      <Form.Check
                        type="checkbox"
                        label="Declined"
                        value="declined"
                        {...register(`${item.registerLabel}`, {
                          required: true,
                        })}
                      />
                    </Form.Group>
                  </Col>

                  {errors[item.registerLabel] && (
                    <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                  )}
                </Row>
              );
            })}
          </fieldset>
          <Form.Group className="mb-3">
            <Form.Label>Comments:</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              className="address"
              {...register("details")}
              disabled={isReadOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3 buttons">
            <Button type="button" onClick={handlePreviousClick}>
              {PREVIOUS_BUTTON_TEXT}
            </Button>
            <Button type="submit" className="btn">
              {showNextButton
                ? NEXT_BUTTON_TEXT
                : inProgress
                ? UPDATE_PROGRESS_BUTTON_TEXT
                : UPDATE_BUTTON_TEXT}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default StepFive;
