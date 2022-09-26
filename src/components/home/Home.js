import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import { BASE_API_URL } from "../../utils/constants";
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
  } = useContext(DataContext);
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        //setLoading(true);
        const { data: details } = await axios.get(
          `http://localhost:5000/getData`
        );
        // const { data: details } = await axios.get(`/patients.json`);
        console.log("Details", details);
        setUserData(details);
        // setFilteredData([            
        //   {
        //     patient_id: "1",
        //     suffix: "Ms.",
        //     firstname: "Rutuja",
        //     lastname: "Dhumal",
        //     countrycode: "US",
        //     state: "NY",
        //     homephone: "123",
        //     mobilephone: "123",
        //     zip: "123",
        //     dob: "12/03/1996",
        //     department_id: "1",
        //     status: "active",
        //   },
        // ]);
      } catch (error) {
      } finally {
        //  setLoading(false);
      }
    };

    // const getBalanceData = async () => {
    //   try {
    //     setLoading(true);
    //     const { data: details } = await axios.get(
    //       `http://localhost:5000/getBalance/${patientId}`
    //     );
    //     // const { data: details } = await axios.get(`/patients.json`);
    //     console.log("BALANCE", details);
    //     setBalance(details);
    //   } catch (error) {
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    getUserData();
    //getBalanceData();
  }, []);

  const handleOnChange = (event) => {
    console.log("filteredData", filteredData);

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

  return (
    <>
      <Header />
      <div className="home-page container">
        <div className="header-section">
          <Form.Group className="search-box">
            <Form.Control
              type="search"
              placeholder="Register Patient"
              value={searchText}
              onChange={handleOnChange}
            />
          </Form.Group>
          <Button
            //variant="primary"
            className="btn bg-warning text-dark"
            onClick={() => {
              setStep(1);
              setIsReadOnly(false);
              setIsEdit(false);
              setData(initialState);
              navigate("/step-one");
            }}
          >
            Register Patient
          </Button>
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
