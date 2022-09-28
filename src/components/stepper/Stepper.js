import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./stepper.css";
import { AiFillHome } from "react-icons/ai";
import DataContext from "../../context/DataContext";

function Stepper(props) {
  const { step } = props;
  return (
    <div>
      <Link to={step >= 1 ? "/" : ""}>
        <AiFillHome color="#5A84C3" size={30} className="home" />
      </Link>
      <form id="msform">
        <ul id="progressbar">
          <li
            className={step >= 1 ? "active" : ""}
            style={{ width: "50%" }}
            data-count="1"
          >
            <strong>
              <Link to={step >= 1 ? "/step-one" : ""}>Register Patient</Link>
            </strong>
          </li>
          <li
            className={step >= 2 ? "active" : ""}
            style={{ width: "50%" }}
            data-count="2"
          >
            <strong>
              <Link to={step >= 2 ? "/step-two" : ""}>
                Check Open Appointments
              </Link>
            </strong>
          </li>
          {/* <li
            className={step >= 3 ? "active " : ""}
            style={{ width: "30%" }}
            data-count="3"
          >
            <strong>
              <Link to={step >= 3 ? "/step-three" : ""}>Appointment Details</Link>
            </strong>
          </li> */}
        </ul>
      </form>
    </div>
  );
}

export default Stepper;
