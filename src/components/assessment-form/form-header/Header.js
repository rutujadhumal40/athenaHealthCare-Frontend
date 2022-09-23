import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DataContext from "../../../context/DataContext";
import "./header.css";

const Header = () => {
  const { setStep } = useContext(DataContext);
  const location = useLocation();

  useEffect(() => {
    const filterParams = location.pathname;
    console.log('filterParams' ,filterParams);
    if (filterParams === "/step-one") {
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
  return (
    <div className="form-header">
      <h2>
        <Link to="/">Patient Registeration Form</Link>
      </h2>
    </div>
  );
};

export default Header;
