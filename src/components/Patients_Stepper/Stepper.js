import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { AiFillHome } from "react-icons/ai";

import "./stepper.css";

function PatientStepper(props) {
  const { step } = props;
  const { setStep } = useContext(DataContext);

  const location = useLocation();

  const filterParams = location.pathname;

  useEffect(() => {
    const filterParams = location.pathname;
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
          </ul>
        </form>
      </div>
    </>
  );
}

export default PatientStepper;
