export const mock = {
  send: async () => ({})
};
export class DynamoDBClient {
  constructor(config) { this.config = config; }
  async send(cmd) { return mock.send(cmd); }
}
export class PutItemCommand { constructor(input){ this.input = input; } }
export class GetItemCommand { constructor(input){ this.input = input; } }
export class UpdateItemCommand { constructor(input){ this.input = input; } }
export class DeleteItemCommand { constructor(input){ this.input = input; } }
export class ScanCommand { constructor(input){ this.input = input; } }
