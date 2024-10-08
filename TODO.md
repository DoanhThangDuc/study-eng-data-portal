## Todo list for the project

- set up environment variables (done)
  - fix port (done)
  - implement for testing
    - Investigate why test can not connect to DB (even though database name is set) (done)
    - Implement migration for testing database (done)
    - handle exception filter, validation (done)
- fixing env variables return underfined (done)
- implement reset user after each test (done)
- comment JwtStrategy in infrastructure module then get error -> try to response error to client (done)
- changing current using env to: (this.appConfigs as AppConfigsEnvironment).jwtSecret... (done)

- using passport user (done)
  - jwt local to use for specific routes (done)
  - jwt auth guard use for whole app (done)

- implement sign up flow (using JWT) (done)
- implement sign in flow (using JWT) (done)

- implement refresh token (done)
- check error when calling endpoint sign in postman (done)

- implement global catch custom exception (implement in testing also) (done)
- implement connect Kysely DB in test (done)
- check if there are any credentials keys, just remove and make the project public (done)
- implement testing sigin flow (done)
- investigate whether database connection is closed after spect tests (done)

- impplement throw error when still have data left after each test (investigating)
- investigate connect staging database in vercel (maybe consider using free aws)

- will learn about mechanism for unique vanity name and user generate id
- leaning about user-pass in postgres