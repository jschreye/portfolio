#!/bin/bash

npm run typeorm migration:generate -- db/migrations/new_migrations

npm run typeorm migration:run

npm run start