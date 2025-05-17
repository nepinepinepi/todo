.PHONY: bootstrap up start-api test

bootstrap:
npm ci
cd frontend && npm ci

up:
docker compose up -d

start-api:
sam local start-api --template infra/template.yaml

test:
cd backend && npm run build && npm test
cd ../frontend && npm run test
