'use strict';

const AWS = require('aws-sdk');

// const options = process.env.LOCAL
//   ? { region: 'localhost', endpoint: 'http://localhost:8000' }
//   : {};

// const dynamo = new AWS.DynamoDB.DocumentClient(options);
const dynamo = new AWS.DynamoDB.DocumentClient();

// const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.tableName;



/**
 * 
  getAll
  GET /all
  引数: なし
  返り値: RoomId, RoomName, Users
*/
module.exports.getAll = async () => {
  const params = {
    TableName: tableName
  };

  try {
    const result = await dynamo.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
      return {
        statusCode: error.statusCode,
        body: error.message
      };
  }
};


/**
 * 
  createRoomInfo
  POST /room
  引数: RoomName, UserName
  返り値: RoomId
*/
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
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }
};


/**
 * 
  createRoomInfo
  GET /room
  引数: RoomName, UserName
  返り値: RoomId
*/
module.exports.createRoom = async event => {
  const { RoomName, UserName } = JSON.parse(event.body);
  const { v4: uuidv4 } = require('uuid');
  const RoomId = uuidv4();
  const Users = [{
    "AttendStatus": true,
    "ConnectStatus": false,
    "UserName": UserName
  }];

  const params = {
    TableName: tableName,
    Item: {
      "RoomId": RoomId,
      "RoomName": RoomName,
      "Users" : Users
    }
  }

  try {
    const result = await dynamo.put(params).promise();
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item.RoomId)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }
};


/**
 * 
  getRoomInfo
  GET /info
  引数: RoomId
  返り値: [{UserName, AttendStatus, ConnectStatus}]
*/
module.exports.getRoomInfo = async event => {
  const { RoomId } = event.queryStringParameters;

  const params = {
    TableName: tableName,
    Key: {
      "RoomId": RoomId,
    }
  };

  try {
    const result = await dynamo.get(params).promise();
    // const resultItem = JSON.stringify(result.Item).Users;
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item.Users)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }
};


/**
 * 
  test
  POST /test
  テスト用関数
*/
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