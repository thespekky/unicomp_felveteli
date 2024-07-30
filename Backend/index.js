const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Users = require("./Models/userModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/", require("./Routes/routes"));

const uri =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@cluster0.vfvg2lr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  await mongoose.connect(uri, clientOptions);

  await mongoose.connection.db.admin().command({ ping: 1 });

  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Alkalmazás elindítva a http://localhost:${process.env.PORT}`)
);
