var admin = require("firebase-admin");
const ObjectId = require("mongodb").ObjectId;
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

//serviceAccount initialize
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// verify Token [jwt]
const verifyToken = async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const verifyAdmin = await admin.auth().verifyIdToken(token);
      req.verifyAdminEmail = verifyAdmin.email;
    } catch {
      console.log("Error message");
    }
  }
  next();
};

const run = async () => {
  try {
    await client.connect();
    const database = client.db("devWear");
    const uploadProductCollection = database.collection("upload_products");
    const productCollection = database.collection("products2");
    const adminCollection = database.collection("allAdmin");
    const cartCollection = database.collection("cart");

    // =================Demo part ===================//
    // get all products2
    app.get("/products2", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send(result);
    });

    // get single product2
    app.get("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const product = await productCollection.findOne(query);
      console.log(product);
      res.send(product);
    });

    // update single product2
    app.put("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const updateData = req.body;
      const filter = await productCollection.findOne(query);
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

    // Delete single product2
    app.delete("/products2/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(filter);
      res.send(result);
    });
    // =================Main part ====================//

    //========================= start Products API ===================//
    // upload products API
    app.post("/addProduct", async (req, res) => {
      const uploadedData = req.body;
      const result = await uploadProductCollection.insertOne(uploadedData);
      res.send(result);
    });

    // get all products API
    app.get("/products", async (req, res) => {
      const result = await uploadProductCollection.find({}).toArray();
      res.send(result);
    });

    // get all products from cart API
    app.get("/cart", async (req, res) => {
      const result = await cartCollection.find({}).toArray();
      res.send(result);
    });

    //post a product to cart API
    app.post("/postProductToCart", async (req, res) => {
      const product = req.body;
      const result = await cartCollection.insertOne(product);
      res.send(result);
    });
    // get all products from cart API
    app.get("/cart", async (req, res) => {
      const result = await cartCollection.find({}).toArray();
      res.send(result);
    });

    //delete a product from cart API

    //delete a product from cart
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
      console.log(result);
    });
    //========================= end Products API  =========================//

    //========================= start admin API ============================//
    // set Admin  on database API
    app.post("/setUser", async (req, res) => {
      const AdminData = req.body;
      const result = await adminCollection.insertOne(AdminData);
      res.send(result);
    });
    // Update admin on database API
    app.put("/setUser", async (req, res) => {
      const userData = req.body;
      const filter = { email: userData.email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: userData.name,
          email: userData.email,
        },
      };
      const result = await adminCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // get all adminRequest on database API
    app.get("/adminRequest", verifyToken, async (req, res) => {
      if (req?.verifyAdminEmail) {
        const allAdmin = await adminCollection.find({}).toArray();
        res.send(allAdmin);
      } else {
        res.status(403).send(["No permission"]);
      }
    });
    // Put adminRequest API
    app.put("/adminRequest", verifyToken, async (req, res) => {
      const verifyEmail = req?.verifyAdminEmail;
      const options = { upsert: true };

      if (verifyEmail) {
        const filter = { email: verifyEmail };
        const findAdmin = await adminCollection.findOne(filter);

        if (findAdmin.role == "admin") {
          const email = req.body.email;
          const filter = { email: email };
          const updateDoc = {
            $set: {
              role: "admin",
            },
          };
          const result = await adminCollection.updateOne(
            filter,
            updateDoc,
            options
          );
          res.send(result);
        } else {
          res.status(403).send(["No Permission"]);
        }
      }
    });
    // delete admin req API
    app.delete("/adminRequest/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await adminCollection.deleteOne(filter);
      res.send(result);
    });

    // Get admin API [Admin checking API]
    app.get("/admin/:email", verifyToken, async (req, res) => {
      if (req.verifyAdminEmail) {
        const email = req?.params?.email;
        const filter = { email: email };
        const findDetails = await adminCollection.findOne(filter);
        let admin = false;
        if (findDetails?.role == "admin") {
          admin = true;
        } else {
          admin = false;
        }
        res.send(admin);
      } else {
        res.status(403).send(["No permission"]);
      }
      //========================= start admin API ============================//
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
