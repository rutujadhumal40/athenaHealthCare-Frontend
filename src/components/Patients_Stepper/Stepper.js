import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DataContext from "../../context/DataContext";
import "./stepper.css";
import { AiFillHome, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

function PatientStepper(props) {
  const { step } = props;
  const { setStep } = useContext(DataContext);

  const location = useLocation();

  const filterParams = location.pathname;
  console.log("filterParams", filterParams);

  useEffect(() => {
    const filterParams = location.pathname;
    console.log("filterParams", filterParams);
    if (filterParams === "/basicInfo") {
      setStep(1);
    } else if (filterParams === "/step-two") {
      setStep(2);
    } else if (filterParams === "/step-three") {
      setStep(3);
    } else if (filterParams === "/step-four") {
      setStep(4);
    } else if (filterParams === "/step-five") {
      setStep(5);
    } else if (filterParams === "/step-six") {
      setStep(6);
    }
  }, [location.pathname, setStep]);
  console.log("step", step);
  return (
    <>
      <div>
        <Link to={step >= 1 ? "/" : ""}>
          <AiFillHome color="#5A84C3" size={30} className="home" />
        </Link>
        <form id="msform">
          <ul id="progressbar">
            {/* <li className={step >= 1 ? "active" : ""} data-count="1">
            <strong>
              <Link to={step >= 1 ? "/" : ""}>Home</Link>
            </strong>
          </li> */}
            <li className={step >= 1 ? "active" : ""} data-count="1">
              <strong>
                <Link to={step >= 1 ? "/basicInfo" : ""}>Basic Info</Link>
              </strong>
            </li>
            <li className={step >= 2 ? "active" : ""} data-count="2">
              <strong>
                <Link to={step >= 2 ? "/appointments" : ""}>
                  List Of Appointments
                </Link>
              </strong>
            </li>
            {/* <li className={step >= 3 ? "active " : ""} data-count="4">
            <strong>
              <Link to={step >= 3 ? "/step-three" : ""}>
                Appointment Details
              </Link>
            </strong>
          </li>
          <li className={step >= 4 ? "active " : ""} data-count="5">
            <strong>
              <Link to={step >= 4 ? "/step-four" : ""}>Insurance Details</Link>
            </strong>
          </li> */}
          </ul>
        </form>
      </div>
    </>
  );
}

export default PatientStepper;
