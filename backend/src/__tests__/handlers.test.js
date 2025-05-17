import { createTodo, listTodos, client } from '../handlers.js';
import { mock } from '../stubs/aws-sdk-client-dynamodb.js';
import { test, beforeEach, expect } from '../../../test-runner.js';

beforeEach(() => { mock.send = async () => ({ Items: [] }); });

test('createTodo returns 201', async () => {
  mock.send = async () => ({ });
  const res = await createTodo({ body: JSON.stringify({ text: 'a' }) });
  expect(res.statusCode).toBe(201);
});

test('listTodos returns 200', async () => {
  mock.send = async () => ({ Items: [] });
  const res = await listTodos();
  expect(res.statusCode).toBe(200);
});
