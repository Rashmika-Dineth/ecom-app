const express = require("express");

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "myProject";

let resResult = "";

async function getData() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  resResult = findResult;
  console.log("Connected to ", dbName);
  return "done.";
}

async function getProducts() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("products");

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  resResult = findResult;
  console.log("Connected to ", dbName);
  return "done.";
}

async function GetOrder() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("orders");

  // the following code examples can be pasted here...
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  resResult = findResult;
  return findResult;
}

async function postData(name, id) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("documents");

  // the following code examples can be pasted here...
  var myobj = { name, id };
  const insertResult = await collection.insertOne(myobj);
  console.log("Inserted documents =>", insertResult);
}

async function postProduct(name, id, price, description, url) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("products");

  // the following code examples can be pasted here...
  var myobj = { name, id, price, description, url };
  const insertResult = await collection.insertOne(myobj);
  console.log("Inserted documents =>", insertResult);
}

async function AddtoOrders(uid, pid, price) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("orders");

  // the following code examples can be pasted here...
  var myobj = { uid, pid, price };
  const insertResult = await collection.insertOne(myobj);
  console.log("Inserted documents =>", insertResult);
}

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "NODEJS API PROJECT", name: "Rashmika" });
});

app.get("/api/getdata", (req, res) => {
  getData()
    .then()
    .catch(console.error)
    .finally(() => {
      res.json(resResult);
      client.close();
    });
});

app.get("/api/getproducts", (req, res) => {
  getProducts()
    .then()
    .catch(console.error)
    .finally(() => {
      res.json(resResult);
      client.close();
    });
});

app.get("/api/getordercount", (req, res) => {
  GetOrder()
    .then()
    .catch(console.error)
    .finally(() => {
      res.json(resResult.length);
      client.close();
    });
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  postData(req.body.name, req.body.id)
    .then()
    .catch(console.error)
    .finally(() => {
      res.json("Success");
      client.close();
    });
});

app.post("/api/post_product", (req, res) => {
  console.log(req.body);
  postProduct(
    req.body.name,
    req.body.id,
    req.body.price,
    req.body.description,
    req.body.url
  )
    .then()
    .catch(console.error)
    .finally(() => {
      res.json("Success");
      client.close();
    });
});

app.post("/api/addToCart", (req, res) => {
  console.log(req.body);
  AddtoOrders(req.body.uid, req.body.product_id, req.body.price)
    .then()
    .catch(console.error)
    .finally(() => {
      res.json("Success");
      client.close();
    });
});
