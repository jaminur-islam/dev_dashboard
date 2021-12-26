const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

// database connect
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y5fsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db("devWear");
    const productCollection = database.collection("products");

    // get all products
    app.get("/data", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
    //  await client.close()
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hi server ");
});

app.listen(port, () => {
  console.log(port);
});
