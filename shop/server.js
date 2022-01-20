const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { viewAllItems, addItem, editItem, deleteItem, downloadCSV } = require("./handlers/inventory.js");

const port = 5000;
const dbURI = "mongodb+srv://user:passWE12345@cluster0.nzkq6.mongodb.net/inventory?retryWrites=true&w=majority";

// Connect to database
mongoose
    .connect(dbURI)
    .then((result) => app.listen(port, () => console.log(`db connected, listening at http://localhost:${port}`)))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", viewAllItems);
app.post("/add", addItem);
app.patch("/:name", editItem);
app.delete("/:name", deleteItem);
app.get("/downloadcsv", downloadCSV);
