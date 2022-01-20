const Item = require("../models/item.js");

// View items in inventory
exports.viewAllItems = (req, res) => {
    Item.find((error, results) => {
        if (error) {
            res.status(400).json({
                error: error,
            });
        } else {
            res.status(200).json(results);
        }
    });
};

// Add new item to inventory
exports.addItem = (req, res) => {
    Item.findOne({ name: req.body.name }, (error, result) => {
        if (error) {
            console.log(error);
        }
        if (result) {
            console.log("Item already exists");
            res.status(200).json({message:"Item already exists"})
        } else {
            // If product with this name doesn't already exist
            const item = new Item({
                name: req.body.name,
                inventoryCount: req.body.inventoryCount,
            });
            item.save()
                .then((savedItem) => {
                    res.status(200).json(savedItem);
                })
                .catch((error) => {
                    res.status(400).json({
                        error: error,
                    });
                });
        }
    });
};

// Edit item in inventory
exports.editItem = (req, res) => {
    Item.updateOne({ name: req.params.name }, { inventoryCount: req.body.inventoryCount })
        .then((savedItem) => {
            res.status(200).json(savedItem);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// Delete item from inventory
exports.deleteItem = (req, res) => {
    Item.deleteOne({ name: req.params.name })
        .then((savedItem) => {
            res.status(200).json(savedItem);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

// Export and download inventory data as CSV
exports.downloadCSV = (req, res) => {
    Item.find((error, results) => {
        if (error) {
            res.status(400).json({
                error: error,
            });
        } else {
            var { Parser } = require("json2csv");
            const fields = [
                {
                    label: "Product Name",
                    value: "name",
                },
                {
                    label: "Inventory Count",
                    value: "inventoryCount",
                },
                {
                    label: "Database ID",
                    value: "id",
                },
            ];
            const parser = new Parser({ fields });
            const csv = parser.parse(results);
            res.attachment("inventory.csv");
            res.status(200).send(csv);
        }
    });
};
