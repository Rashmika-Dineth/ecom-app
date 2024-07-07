import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { useContext } from "react";
import { UserContext } from "../App";

function Home() {
  const user = useContext(UserContext);
  const [data, setData] = React.useState(null);
  const [name,setName] = React.useState(null);
  console.log(user)
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setName(data.name)
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <h1>Welcome {name}</h1>
      </header>
    </div>
  );
}

export default Home;