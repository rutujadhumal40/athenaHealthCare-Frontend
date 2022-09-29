import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { initialState } from "../../utils/initialstate";
import Header from "../header/Header";
import PatientsList from "../patients-list/PatientsList";
import "./home.css";

const Home = () => {
  const {
    setStep,
    setData,
    setIsReadOnly,
    setIsEdit,
    filteredData,
    setFilteredData,
    patientId,
    setBalance,
    setShowTable,
    departments,
    setDepartments,
    setIsExistingPatient,
    setIsView,
  } = useContext(DataContext);
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: details } = await axios.get(
          `http://localhost:5000/getData`
        );
        setUserData(details);
      } catch (error) {
      } finally {
      }
    };

    const getDeptData = async () => {
      try {
        const { data: details } = await axios.get(
          `http://localhost:5000/getDepartments`
        );
        setDepartments(details);
      } catch (error) {
      } finally {
      }
    };
    getUserData();
    getDeptData();
  }, []);

  const handleOnChange = (event) => {
    const text = event.target.value.trim();
    setSearchText(text);
    if (text !== "") {
      setFilteredData(
        userData.filter(
          (patient) =>
            patient?.firstname.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
            patient?.lastname.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
      setShowTable(true);
    } else {
      setFilteredData(filteredData);
    }
  };

  const handleRegister = () => {
    setStep(1);
    setIsReadOnly(false);
    setIsEdit(false);
    setData(initialState);
    navigate("/step-one");
    setIsExistingPatient(false);
    setIsView(false);
  };

  return (
    <>
      <Header />
      <div className="home-page container">
        <div className="header-section">
          <Form.Group className="search-box">
            <Form.Control
              type="search"
              placeholder="Find Patients"
              value={searchText}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Button onClick={() => handleRegister()}>Register Patient</Button>
        </div>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <PatientsList
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        )}
      </div>
    </>
  );
};

export default Home;
