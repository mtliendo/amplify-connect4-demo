/* Amplify Params - DO NOT EDIT
	API_C4TALK_GRAPHQLAPIIDOUTPUT
	API_C4TALK_PLAYERTABLE_ARN
	API_C4TALK_PLAYERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
})

exports.handler = async (event, context) => {
  let date = new Date()

  let params = {
    TableName: process.env.API_C4TALK_PLAYERTABLE_NAME,
    Item: {
      id: event.request.userAttributes.sub,
      __typename: 'Player',
      username: event.userName,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      owner: event.userName,
    },
  }

  await docClient
    .put(params)
    .promise()
    .catch(e => {
      context.done(e, null)
    })

  console.log('Success: Everything executed correctly')
  context.done(null, event)
}
