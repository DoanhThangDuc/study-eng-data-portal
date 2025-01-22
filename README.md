
## Set up database

1. Login into PostgreSQL
```bash
psql -U postgres
```

2. Create user 
```bash
CREATE USER "postgres" WITH PASSWORD 'Password';
ALTER ROLE "auth-server" WITH SUPERUSER;
```

3. Create Database
```bash
CREATE DATABASE study_eng;
```

4. Access to database
```bash
psql -U postgres -d study_eng;
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode development
$ npm run dev
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

## Test
```bash
# integration all tests
$ npm run test:integration

# integration for specific test
$ npm run test:integration:<name>
Example: npm run test:integration:user
```

## Semantic Commit Messages

See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

References:

- https://www.conventionalcommits.org/
- https://seesparkbox.com/foundry/semantic_commit_messages
- http://karma-runner.github.io/1.0/dev/git-commit-msg.html

## License

Nest is [MIT licensed](LICENSE).
Nest is [MIT licensed](LICENSE).
