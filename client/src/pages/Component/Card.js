import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Item(props) {
  return (
    <Card style={{ width: "18rem", margin: "50px" }} key={props.Item.id}>
      <Card.Img variant="top" src={props.Item.url} />
      <Card.Body>
        <Card.Title>{props.Item.name}</Card.Title>
        <Card.Text>{props.Item.description}</Card.Text>
        <h1>Price : {props.Item.price}</h1>
        <Button variant="primary" disabled={props.disabled}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
