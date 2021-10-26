'use strict';

const AWS = require('aws-sdk');

// const options = process.env.LOCAL
//   ? { region: 'localhost', endpoint: 'http://localhost:8000' }
//   : {};

// const dynamo = new AWS.DynamoDB.DocumentClient(options);
const dynamo = new AWS.DynamoDB.DocumentClient();

// const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;

module.exports.getAll = async () => {
  const params = {
    TableName: tableName
  };

  try {
    const result = await dynamo.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
      return {
        statusCode: error.statusCode,
        body: error.message
      };
  }
};

module.exports.getRoom = async event => {
  const { RoomId } = event.queryStringParameters;

  const params = {
    TableName: tableName,
    Key: {
      "RoomId": RoomId,
    }
  };

  try {
    const result = await dynamo.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }
};

module.exports.createRoom = async event => {
  const { RoomName, UserName } = JSON.parse(event.body);
  const { v4: uuidv4 } = require('uuid');
  const RoomId = uuidv4();

  const params = {
    TableName: tableName,
    Item: {
      "UserName": UserName,
      "RoomName": RoomName,
      "RoomId": RoomId
    }
  }

  try {
    const result = await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }
};

module.exports.test = async event => {
  const { RoomName, UserName } = JSON.parse(event.body);
  // const UserName = event.body.UserName;
  // const resultUserName = event.body.UserName;
  const params = {
    "RoomName": RoomName,
    "UserName": UserName
  }
  return {
    statusCode: 200,
    body: JSON.stringify(params)
  };
};
