import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { UserContext } from "../../App";

function Item(props) {
  const { count, setCount } = useContext(UserContext);

  function AddToCart() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: props.uid,
        product_id: props.Item._id,
        price: props.Item.price,
      }),
    };
    fetch("/api/addToCart", requestOptions).then((response) =>
      response.json().then(() => {
        console.log("Product ", props.Item.name, "Added to cart successfully");
        setCount(count + 1);
      })
    );
  }

  return (
    <Card style={{ width: "18rem", margin: "50px" }} key={props.Item.id}>
      <Card.Img variant="top" src={props.Item.url} />
      <Card.Body>
        <Card.Title>{props.Item.name}</Card.Title>
        <Card.Text>{props.Item.description}</Card.Text>
        <h1>Price : {props.Item.price}</h1>
        <Button
          onClick={AddToCart}
          variant="primary"
          disabled={props.uid === ""}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
