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

- using passport user (doing)
  - jwt local to use for specific routes 
  - jwt auth guard use for whole app

- impplement throw error when still have data left after each test (investigating)
- investigate whether database connection is closed after spect tests (investigating)
- investigate connect staging database in vercel (maybe consider using free aws)
- implement refresh token

- implement sign up flow (using JWT)
- implement testing flow instance
- implement global catch custom exception (implement in testing also)

- will learn about mechanism for unique vanity name and user generate id
- leaning about user-pass in postgres