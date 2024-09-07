## Set up database
**Postgres Master** 

1. Login into PostgreSQL
```bash
psql -U postgres
```

2. Create Database
```bash
CREATE DATABASE "study-eng";
```

## Installation

```bash
$ npm install
```

## Migration
1. Create migration file
```bash
knex migrate:make migration_name -x ts
```

2. Run command line to execute migration
```bash
npm run migrate:latest
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
