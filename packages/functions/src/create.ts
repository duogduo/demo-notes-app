import * as uuid from "uuid";
import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    content: "",
    attachment: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
     userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      //userId: "123", // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // "testcontent4",//Parsed from request body
      attachment: data.attachment, // "testAttach4",//Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});