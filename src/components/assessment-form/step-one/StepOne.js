import { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import {
  ATLEAST_ONE_SELECT,
  NEXT_BUTTON_TEXT,
  REQUIRED_ERROR_MSG,
  VALID_PHONE_NUMBER,
} from "../../../utils/constants";
import { getConvertedDate } from "../../../utils/functions";
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "./stepone.css";
import axios from "axios";

const StepOne = () => {
  const navigate = useNavigate();
  const { data, setData, step, isReadOnly, isEdit } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      suffix: data?.patientBasicInfo?.suffix,
      first_name: data?.patientBasicInfo?.first_name,
      last_name: data?.patientBasicInfo?.last_name,
      country_code: data?.patientBasicInfo?.country_code,
      zip: data?.patientBasicInfo?.zip,
      dob: data?.patientBasicInfo?.dob,
      department_id: data?.patientBasicInfo?.department_id,
      status: data?.patientBasicInfo?.status,
    },
  });

  const handleFormSubmit = async (values) => {
    console.log("VALUES", values);
    //values = { ...values, patient_id: "41590" };
    await axios.post(`http://localhost:5000/addPatientAthena`, {
      values,
    });
    // setData((prev) => ({
    //   ...prev,
    //   patientBasicInfo: {
    //     ...values,
    //   },
    // }));
    navigate("/step-two");
  };
  console.log("DATA", data);
  return (
    <div>
      <Header />
      <Stepper step={step} />
      <div className="step-form container step-one">
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Form.Group className="mb-3" controlId="motherName">
            <Form.Label>Suffix</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Suffix"
              {...register("suffix", {
                required: true,
              })}
              disabled={isReadOnly || isEdit}
            />
            {errors.suffix && <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="babyName">
                <Form.Label>Baby's Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  {...register("first_name", {
                    required: true,
                  })}
                  disabled={isReadOnly || isEdit}
                />
                {errors.first_name && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="babyDOB">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  {...register("last_name", {
                    required: true,
                  })}
                  disabled={isReadOnly || isEdit}
                />
                {errors.last_name && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  type="text"
                  rows={2}
                  className="country_code"
                  {...register("country_code", {
                    required: true,
                  })}
                  disabled={isReadOnly || isEdit}
                />
                {errors.country_code && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="babyDOB">
                <Form.Label>state</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  {...register("state", {
                    required: true,
                  })}
                  disabled={isReadOnly || isEdit}
                />
                {/* {errors.state && (
                  <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                )} */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <fieldset disabled={isReadOnly || isEdit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Zip Code"
                    {...register("zip", {
                      required: true,
                    })}
                  />
                  {/* {errors.zip && (
                    <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                  )} */}
                </Form.Group>
              </fieldset>
            </Col>
            <Col>
              <fieldset disabled={isReadOnly || isEdit}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter your DOB"
                    {...register("dob", {
                      required: true,
                    })}
                  />
                  {errors.dob && (
                    <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                  )}
                  {/* {errors.phone && errors.phone.type === "pattern" && (
                    <p className="errorMsg">{VALID_PHONE_NUMBER}</p>
                  )} */}
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Row>
            <Col>
              <fieldset disabled={isReadOnly || isEdit}>
                <Form.Group className="mb-3" controlId="department_id">
                  <Form.Label>Department ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter department_id"
                    {...register("department_id", {
                      required: true,
                    })}
                  />
                  {/* {errors.department_id && (
                    <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                  )} */}
                </Form.Group>
              </fieldset>
            </Col>
            <Col>
              <fieldset disabled={isReadOnly || isEdit}>
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Status"
                    {...register("status", {
                      required: true,
                    })}
                  />
                  {/* {errors.status && (
                    <p className="errorMsg">{REQUIRED_ERROR_MSG}</p>
                  )} */}
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
          {/* <fieldset disabled={isReadOnly || isEdit}>
            <Form.Group className="mb-3 baby-gender" controlId="babyGender">
              <Form.Label>Baby's Gender</Form.Label>
              <Form.Check
                type="radio"
                label="M"
                value="M"
                {...register("babyGender", {
                  required: true,
                })}
              />
              <Form.Check
                type="radio"
                label="F"
                value="F"
                {...register("babyGender", { required: true })}
              />
              {errors.babyGender && (
                <p className="errorMsg">{ATLEAST_ONE_SELECT}</p>
              )}
            </Form.Group>
          </fieldset> */}
          <Button type="submit" className="btn">
            {NEXT_BUTTON_TEXT}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StepOne;
