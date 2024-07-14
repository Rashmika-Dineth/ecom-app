import Item from "./Component/Card";
import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import { useContext } from "react";
import { UserContext } from "../App";

function Product() {
  const [data, setData] = useState();
  const { uid } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/getproducts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) return <div>Loading</div>;
  else {
    return (
      <div>
        <ImageList cols={4} rowHeight={200} style={{ margin: "20px" }}>
          {data.map((x) => (
            <Item Item={x} key={x._id} uid={uid} />
          ))}
        </ImageList>
      </div>
    );
  }
}

export default Product;
