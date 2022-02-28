const express = require("express");
const cors = require("cors");
const { dynamo, getAllItems, addUpdateItem, deleteItem } = require("./dynamo");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});

app.post("/add", async (req, res) => {
    const item = req.body;
    try {
        const newItem = await addUpdateItem(item);
        res.json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});

app.patch("/:id", async (req, res) => {
    const item = req.body;
    const { id } = req.params;
    item.id = id;
    try {
        const newItem = await addUpdateItem(item);
        res.json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteItem(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});

app.get("/downloadcsv", async (req, res) => {
    try {
        const results = await getAllItems();
        var { Parser } = require("json2csv");
        const fields = [
            {
                label: "Product Name",
                value: "id",
            },
            {
                label: "Inventory Count",
                value: "inventoryCount",
            }
        ];
        const parser = new Parser({ fields });
        const csv = parser.parse(results.Items);
        res.attachment("inventory.csv");
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Something went wrong" });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port`, port);
});
