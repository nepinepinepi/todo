import { DynamoDBClient, PutItemCommand, UpdateItemCommand, DeleteItemCommand, ScanCommand } from './stubs/aws-sdk-client-dynamodb.js';
import { v4 as uuid } from './stubs/uuid.js';

export const client = new DynamoDBClient({ endpoint: process.env.DYNAMODB_ENDPOINT || process.env.AWS_ENDPOINT_URL });
const TableName = process.env.TABLE_NAME || 'Todos';

export async function createTodo(event) {
  const body = event.body ? JSON.parse(event.body) : {};
  const id = uuid();
  await client.send(new PutItemCommand({ TableName, Item: { id: { S: id }, text: { S: body.text || '' } } }));
  return { statusCode: 201, body: JSON.stringify({ id, text: body.text }) };
}

export async function listTodos() {
  const data = await client.send(new ScanCommand({ TableName }));
  const items = (data.Items || []).map(i => ({ id: i.id.S, text: i.text.S }));
  return { statusCode: 200, body: JSON.stringify(items) };
}

export async function updateTodo(event) {
  const id = event.pathParameters?.id;
  const body = event.body ? JSON.parse(event.body) : {};
  await client.send(new UpdateItemCommand({
    TableName,
    Key: { id: { S: id } },
    UpdateExpression: 'SET #t = :t',
    ExpressionAttributeNames: { '#t': 'text' },
    ExpressionAttributeValues: { ':t': { S: body.text } }
  }));
  return { statusCode: 200, body: JSON.stringify({ id, text: body.text }) };
}

export async function deleteTodo(event) {
  const id = event.pathParameters?.id;
  await client.send(new DeleteItemCommand({ TableName, Key: { id: { S: id } } }));
  return { statusCode: 204, body: '' };
}
