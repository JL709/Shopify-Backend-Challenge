const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
    {
        name: { type: String, required: true },
        inventoryCount: { type: Number, required: true },
    },
    { toJSON: { virtuals: true } }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
