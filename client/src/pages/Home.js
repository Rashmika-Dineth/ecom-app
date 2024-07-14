import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { useContext } from "react";
import { UserContext } from "../App";
import CarosalComponent from "./Component/CarosalComponent";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

function Home() {
  const user = useContext(UserContext);
  const [data, setData] = React.useState(null);
  const [name, setName] = React.useState(null);
  // console.log(user);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setName(data.name);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <>
        <span className="d-block p-2 text-white">
          <MDBContainer className="container-fluid">
            <MDBRow>
              <CarosalComponent />
            </MDBRow>
          </MDBContainer>
        </span>
        <span className="d-block p-2 bg-dark text-white">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>{!data ? "Loading..." : data}</p>
              <h1>Welcome {name}</h1>
            </header>
          </div>
        </span>
      </>
    </div>
  );
}

export default Home;
