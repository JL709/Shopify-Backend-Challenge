const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "test";

const getAllItems = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    return await dynamo.scan(params).promise();
}

const addUpdateItem = async (item) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    }
    return await dynamo.put(params).promise();
}


const deleteItem = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }
    return await dynamo.delete(params).promise();
}

module.exports = {
    dynamo,
    getAllItems,
    addUpdateItem,
    deleteItem
}
