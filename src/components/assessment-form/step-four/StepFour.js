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
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "../step-one/stepone.css";

const StepFour = () => {
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
      relationWithBaby_isComfortable:
        data?.patientPsychoSocialAssess?.relationWithBaby?.isComfortable ===
        true
          ? "true"
          : "false",
      relationWithBaby_details:
        data?.patientPsychoSocialAssess?.relationWithBaby?.details,
      houseMemberStatus_isAdjusted:
        data?.patientPsychoSocialAssess?.houseMemberStatus?.isAdjusted === true
          ? "true"
          : "false",
      fatherStatus:
        (data?.patientPsychoSocialAssess?.fatherStatus?.isHappy === true &&
          "happy") ||
        (data?.patientPsychoSocialAssess?.fatherStatus?.isAngry === true &&
          "angry") ||
        (data?.patientPsychoSocialAssess?.fatherStatus?.isInvolved === true &&
          "isInvolved") ||
        (data?.patientPsychoSocialAssess?.fatherStatus?.isSure === true &&
          "isSure") ||
        "",
      houseMemberStatus_details:
        data?.patientPsychoSocialAssess?.houseMemberStatus?.details,
      fatherStatus_isSupportive:
        data?.patientPsychoSocialAssess?.fatherStatus?.isSupportive === true
          ? "true"
          : "false",
      fatherStatus_details:
        data?.patientPsychoSocialAssess?.fatherStatus?.detail,
      safety_isSafe:
        data?.patientPsychoSocialAssess?.safety?.isSafe === true
          ? "true"
          : "false",
      safety_details: data?.patientPsychoSocialAssess?.safety?.details,
      unsafeRelationStatus_isRelationThreat:
        data?.patientPsychoSocialAssess?.unsafeRelationStatus
          ?.isRelationThreat === true
          ? "true"
          : "false",
      unsafeRelationStatus_details:
        data?.patientPsychoSocialAssess?.unsafeRelationStatus?.details,
      resourceStatus_isEnoughResources:
        data?.patientPsychoSocialAssess?.resourceStatus?.isEnoughResources ===
        true
          ? "true"
          : "false",
      resourceStatus_details:
        data?.patientPsychoSocialAssess?.resourceStatus?.details,
      resourceStatus: getSelectedValue(
        data?.patientPsychoSocialAssess?.resourceStatus
      ),
    },
  });

  const showNextButton = isUpdated || (!isReadOnly && !isEdit) || isReadOnly;

  const handleFormSubmit = async (values) => {
    const {
      relationWithBaby_isComfortable,
      relationWithBaby_details,
      houseMemberStatus_isAdjusted,
      houseMemberStatus_details,
      fatherStatus_isSupportive,
      fatherStatus_details,
      fatherStatus,
      safety_isSafe,
      safety_details,
      unsafeRelationStatus_isRelationThreat,
      unsafeRelationStatus_details,
      resourceStatus_isEnoughResources,
      resourceStatus_details,
      resourceStatus,
    } = values;

    const dataToUpdate = {
      patientPsychoSocialAssess: {
        relationWithBaby: {
          isComfortable:
            relationWithBaby_isComfortable === "true" ? true : false,
          details: relationWithBaby_details,
        },
        houseMemberStatus: {
          isAdjusted: houseMemberStatus_isAdjusted === "true" ? true : false,
          details: houseMemberStatus_details,
        },
        fatherStatus: {
          isSupportive: fatherStatus_isSupportive === "true" ? true : false,
          detail: fatherStatus_details,
          isHappy: fatherStatus === "happy" ? true : false,
          isAngry: fatherStatus === "angry" ? true : false,
          isInvolved: fatherStatus === "isInvolved" ? true : false,
          isSure: fatherStatus === "isSure" ? true : false,
        },
        safety: {
          isSafe: safety_isSafe === "true" ? true : false,
          details: safety_details,
        },
        unsafeRelationStatus: {
          isRelationThreat:
            unsafeRelationStatus_isRelationThreat === "true" ? true : false,
          details: unsafeRelationStatus_details,
        },
        resourceStatus: {
          isEnoughResources:
            resourceStatus_isEnoughResources === "true" ? true : false,
          details: resourceStatus_details,
          isHousingAvailable: resourceStatus.includes("isHousingAvailable")
            ? true
            : false,
          isFinanceAvailable: resourceStatus.includes("isFinanceAvailable")
            ? true
            : false,
          isFoodAvailable: resourceStatus.includes("isFoodAvailable")
            ? true
            : false,
          isFamilyAvailable: resourceStatus.includes("isFamilyAvailable")
            ? true
            : false,
          isAny: resourceStatus.includes("isAny") ? true : false,
        },
      },
    };

    setData((prev) => ({
      ...prev,
      ...dataToUpdate,
    }));

    if (showNextButton) {
      setSuccessMsg("");
      setErrorMsg("");
      navigate("/step-five");
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
    navigate("/step-three");
  };

  return (
    <div>
      <Header />
      <Stepper step={step} />
      <div className="step-form container step-four">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <h4 className="form-heading">Psycho-Social Assessment</h4>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Do you feel comfortable in your relationship with your baby?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3"
                      controlId="relationWithBaby_isComfortable"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("relationWithBaby_isComfortable", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("relationWithBaby_isComfortable", {
                          required: true,
                        })}
                      />
                      {errors.relationWithBaby_isComfortable && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="relationWithBaby_details">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("relationWithBaby_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Have your household members adjusted to your baby?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3"
                      controlId="houseMemberStatus_isAdjusted"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("houseMemberStatus_isAdjusted", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("houseMemberStatus_isAdjusted", {
                          required: true,
                        })}
                      />
                      {errors.houseMemberStatus_isAdjusted && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="houseMemberStatus_details"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("houseMemberStatus_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Is the baby's father supportive and/or involved with the
                    baby?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3"
                      controlId="fatherStatus_isSupportive"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("fatherStatus_isSupportive", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("fatherStatus_isSupportive", {
                          required: true,
                        })}
                      />
                      {errors.fatherStatus_isSupportive && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="fatherStatus_details">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("fatherStatus_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>
                How does your partner feel about the baby?
              </Form.Label>
            </Col>
            <Col>
              <fieldset disabled={isReadOnly}>
                <Form.Group className="mb-3" controlId="fatherStatus">
                  <Form.Check
                    type="radio"
                    label="Happy"
                    value="happy"
                    {...register("fatherStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="radio"
                    label="Angry"
                    value="angry"
                    {...register("fatherStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="radio"
                    label="Refused to be involved"
                    value="isInvolved"
                    {...register("fatherStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="radio"
                    label="Not sure"
                    value="isSure"
                    {...register("fatherStatus", {
                      required: true,
                    })}
                  />
                  {errors.fatherStatus && (
                    <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                  )}
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Do you feel safe at home, school and work?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group className="mb-3" controlId="safety_isSafe">
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("safety_isSafe", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("safety_isSafe", {
                          required: true,
                        })}
                      />
                      {errors.safety_isSafe && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="safety_details">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("safety_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Are you in relationship with someone who threatens you or
                    hurts you?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3"
                      controlId="unsafeRelationStatus_isRelationThreat"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("unsafeRelationStatus_isRelationThreat", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("unsafeRelationStatus_isRelationThreat", {
                          required: true,
                        })}
                      />
                      {errors.unsafeRelationStatus_isRelationThreat && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="unsafeRelationStatus_details"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("unsafeRelationStatus_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Form.Label>
                    Do you have the resources to keep yourself and your baby
                    healthy?
                  </Form.Label>
                </Col>
                <Col>
                  <fieldset disabled={isReadOnly}>
                    <Form.Group
                      className="mb-3"
                      controlId="resourceStatus_isEnoughResources"
                    >
                      <Form.Check
                        type="radio"
                        label="Yes"
                        value="true"
                        {...register("resourceStatus_isEnoughResources", {
                          required: true,
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        value="false"
                        {...register("resourceStatus_isEnoughResources", {
                          required: true,
                        })}
                      />
                      {errors.resourceStatus_isEnoughResources && (
                        <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                      )}
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="resourceStatus_details">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter details"
                  {...register("resourceStatus_details")}
                  disabled={isReadOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>If no, what needs exist?</Form.Label>
            </Col>
            <Col>
              <fieldset disabled={isReadOnly}>
                <Form.Group className="mb-3" controlId="resourceStatus">
                  <Form.Check
                    type="checkbox"
                    label="Housing"
                    value="isHousingAvailable"
                    {...register("resourceStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Financial"
                    value="isFinanceAvailable"
                    {...register("resourceStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Food"
                    value="isFoodAvailable"
                    {...register("resourceStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Family"
                    value="isFamilyAvailable"
                    {...register("resourceStatus", {
                      required: true,
                    })}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Other"
                    value="isAny"
                    {...register("resourceStatus", {
                      required: true,
                    })}
                  />
                  {errors.resourceStatus && (
                    <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
                  )}
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
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

export default StepFour;
