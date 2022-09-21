import { Link } from "react-router-dom";
import "./stepper.css";

function Stepper(props) {
  const { step } = props;
  return (
    <div>
      <form id="msform">
        <ul id="progressbar">
          <li className={step >= 1 ? "active" : ""} data-count="1">
            <strong>
              <Link to={step >= 1 ? "/step-one" : ""}>Register Patient</Link>
            </strong>
          </li>
          <li className={step >= 2 ? "active" : ""} data-count="2">
            <strong>
              <Link to={step >= 2 ? "/step-two" : ""}>
                List Of Departments
              </Link>
            </strong>
          </li>
          <li className={step >= 3 ? "active " : ""} data-count="3">
            <strong>
              <Link to={step >= 3 ? "/step-three" : ""}>Breastfeeding</Link>
            </strong>
          </li>
          <li className={step >= 4 ? "active " : ""} data-count="4">
            <strong>
              <Link to={step >= 4 ? "/step-four" : ""}>
                Psycho-Social Assessment
              </Link>
            </strong>
          </li>
          <li className={step >= 5 ? "active " : ""} data-count="5">
            <strong>
              <Link to={step >= 5 ? "/step-five" : ""}>
                Educational Discussions
              </Link>
            </strong>
          </li>
          <li className={step >= 6 ? "active " : ""} data-count="6">
            <strong>
              <Link to={step >= 6 ? "/step-six" : ""}>
                Follow-Up Appointments
              </Link>
            </strong>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Stepper;
