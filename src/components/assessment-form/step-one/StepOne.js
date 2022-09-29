import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import { REQUIRED_ERROR_MSG } from "../../../utils/constants";
import Stepper from "../../stepper/Stepper";
import Header from "../form-header/Header";
import "./stepone.css";
import axios from "axios";

const StepOne = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("fruit");

  const navigate = useNavigate();
  const {
    setStep,
    step,
    isReadOnly,
    isEdit,
    departments,
    deptId,
    setDeptId,
    setpatientIdforAppt,
  } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleFormSubmit = async (values) => {
    values = { ...values, department_id: deptId };
    try {
      setLoading(true);
      const resData = await axios.post(
        `http://localhost:5000/addPatientAthena`,
        { values }
      );
      setpatientIdforAppt(resData.data.patient_id);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    navigate("/step-two");
    setStep(2);
  };

  const handleChange = (event) => {
    const data = departments.filter(
      (item) => item.department_name === event.target.value
    );
    setDeptId(data[0].department_id);
    setValue(event.target.value);
  };

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select
          style={{ marginLeft: "78px" }}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.department_name}
              </option>
            );
          })}
        </select>
      </label>
    );
  };
  return loading ? (
    <div class="d-flex justify-content-center">
      <div className="spinner-border m-5" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  ) : (
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
                <Form.Label>First Name</Form.Label>
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
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  {...register("state", {
                    required: true,
                  })}
                  disabled={isReadOnly || isEdit}
                />
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
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Row>
            <Col>
              <fieldset disabled={isReadOnly || isEdit}>
                <Form.Group className="mb-3" controlId="department_id">
                  <Dropdown
                    label="Department Name"
                    options={departments}
                    value={value}
                    onChange={handleChange}
                  />
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
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Button type="submit" className="btn">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StepOne;
