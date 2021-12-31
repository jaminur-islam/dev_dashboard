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
    const uploadProductCollection = database.collection("upload_products");
    const productCollection = database.collection("products2");

    // get all products
    app.get("/products", async (req, res) => {
      const result = await uploadProductCollection.find({}).toArray();
      res.send(result);
    });
    // get all products TWO
    app.get("/products2", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });

    // get single product
    app.get("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const product = await productCollection.findOne({ _id: id });
      res.send(product);
    });

    // update single product
    app.put("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = await productCollection.findOne({ _id: id });

      const updateDoc = {
        $set: {
          name: updateData.name,
          price: updateData.price,
          slug: updateData.slug,
          availability: updateData.availability,
          description: updateData.description,
        },
      };

      const result = await productCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Delete single product
    app.delete("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: id };
      const result = await productCollection.deleteOne(filter);
      res.send(result);
    });

    // upload products
    app.post("/addProduct", async (req, res) => {
      const uploadedData = req.body;
      const result = await uploadProductCollection.insertOne(uploadedData);
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
