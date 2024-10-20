# Pulsar example app

This is a simple example app that demonstrates how to use Pulsar.

It uses hexagonal architecture but it's not a requirement.

The app contains a simple user service that allows you to create, read, update and delete users.

It also uses authentication with GitHub and body validation system.

## Requirements

- Docker, docker-compose
- Bun.js

## Installation

1. Clone the repository
2. Fill `.env`
3. Run `docker-compose up -d`
4. Run `bun install`
5. Run `bun --watch src/index.ts`