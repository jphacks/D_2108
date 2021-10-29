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
  getRoom
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
  createRoom
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
  addUser
  PUT /users
  既存の部屋にユーザーを追加
*/
module.exports.addUser = async event => {
  const { RoomId, UserName, AttendStatus } = JSON.parse(event.body);

  const newUser = [{
   "UserName": UserName,
   "AttendStatus": AttendStatus, 
   "ConnectStatus": false,
  }]

  const params = {
    TableName: tableName,
    Key: {
      "RoomId": RoomId,
    },
    ExpressionAttributeNames: {
      '#users': 'Users',
    },
    ExpressionAttributeValues: {
      ':newUser': newUser,
      ':RoomId': RoomId
    },
    UpdateExpression: 'SET #users = list_append(#users, :newUser)',
    ConditionExpression: 'RoomId = :RoomId'
  }

  try {
    const result = await dynamo.update(params).promise();
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Controll-Allow-Methods': "PUT",
      'Access-Controll-Allow-Headers': "Content-Type",
      },
      body: JSON.stringify(result)
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
  createConect
  PUT /connect
  接続状態の設定
*/
module.exports.createConnect = async event => {
  const { RoomId, UserId, connectToUserId } = JSON.parse(event.body);
  const users = [UserId, connectToUserId];

  const getUserDataParams = {
    TableName: tableName,
    Key: {
      "RoomId": RoomId
    }
  }

  try {
    const roomData = await dynamo.get(getUserDataParams).promise();
    const params = updateUserData(roomData.Item.Users, users);
    const result = await dynamo.update(params).promise();
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: error.message
    }
  }

  function updateUserData(usersData, users) {
    for(const i of users) {
      const userData = usersData.find(data => data.UserId == i);

      if(userData === undefined) {
        throw '存在しないユーザーです'
      }

      if(userData.ConnectStatus) {
        throw '接続できません'
      }

      userData.ConnectStatus = !userData.ConnectStatus;
      let settingUser = {
       "UserId": i,
       "UserName": userData.UserName,
       "AttendStatus": userData.AttendStatus, 
       "ConnectStatus": userData.ConnectStatus,
      };
      usersData.unshift(settingUser);
    }

    let newUsersData = usersData.filter((element, index, self) =>
                        self.findIndex(e =>
                          e.UserId === element.UserId
                          ) === index
                        );

    const params = {
      TableName: tableName,
      Key: {
        "RoomId": RoomId,
      },
      ExpressionAttributeNames: {
        '#users': 'Users',
      },
      ExpressionAttributeValues: {
        ':newUsersData': newUsersData,
        ':RoomId': RoomId
      },
      UpdateExpression: 'SET #users = :newUsersData',
      ConditionExpression: 'RoomId = :RoomId',
      ReturnValues: 'ALL_NEW'
    }

    return params;
  }
};