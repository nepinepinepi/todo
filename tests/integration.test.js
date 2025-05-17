import { createTodo, listTodos } from '../backend/src/handlers.js';
import { mock } from '../backend/src/stubs/aws-sdk-client-dynamodb.js';
import { test, expect } from '../test-runner.js';

test('integration create and list', async () => {
  mock.send = async (cmd) => {
    if (cmd.constructor.name === 'ScanCommand') {
      return { Items: [{ id: { S: '1' }, text: { S: 'a' } }] };
    }
    return {};
  };
  await createTodo({ body: JSON.stringify({ text: 'a' }) });
  const res = await listTodos();
  expect(res.statusCode).toBe(200);
});
