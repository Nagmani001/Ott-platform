#!/usr/bin/env bash

docker compose up -d
echo '🟡 - Waiting for database to be ready...'
./wait-for-it.sh "postgresql://postgres:nagmani@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
prisma migrate dev --name init
npm run test
docker compose down
