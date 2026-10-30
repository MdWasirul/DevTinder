# Node.js & Express Homework

## Tasks

- Create a repository
- Initialize the repository
- Understand `node_modules`, `package.json`, and `package-lock.json`
- Install Express
- Create a server
- Listen on port `7777`
- Write request handlers for:
  - `/test`
  - `/hello`
- Install Nodemon and update scripts inside `package.json`
- What are dependencies?
- What is the use of `-g` while running `npm install`?
- Difference between caret (`^`) and tilde (`~`) in package versions

## Git & GitHub

- Initialize Git
- Create a `.gitignore` file
- Create a remote repository on GitHub
- Push all code to the remote `origin`
- Play with routes and route extension ex. /hello, /, hello/2, /xyz
- Order of the routes matter a lot.
- Install postman app and make workspace/ collection > test API call
- Write a logic to handle GET, POST, PUT, PATCH ,DELETE api calls and test them on Postman.
- Explore routing and use of ?, +, (), \*, in the routes.
- Use of regex in routes /a/, /.\*fly$/
- Reading query params in the routes
- reading the dynamics routes

- Multiple route handlers - Play with the Code
- next()
- next function and errors along with res.send()
- app.use("/route", rH,rH2,rH3,rH4,rH5);
- what is middleware.
- How express JS basically handles request behind the scenes.
- Write a dummy auth middleware for admin.
- Write a dummy auth middlware for all user routes, excepts /user/login

- Create a free cluster on MongoDB official website.
- Install mongoose library.
- Connect your application to the Database. "Connection-url"/devTinder
- Call the connectDB functions and connect to databases before starting application on 7777.
- creating userSchema and user Model.
- Create POST /signup API to add data to database.
- push some documents using API calls from postman.
- Error Handling using try ,catch.

- js object vs JSON (difference).
- add express.json() middleware to the app.
- make a signup API dynamic to recieve data from end user.
- User.findOne() with duplicate email Ids which object returned.
- API - Get user by email
- API - Feed api - GET /feed - get all the users from the database.
- API - Get user by ID
- create a delete user api and delete by userId
- difference between PATCH and PUT.
- API - Update a user.
- Explore the Mongoose Documention for model methods.
- What are the options in a Model.findOneAndUpdate() method, explore more about it.
- API- update the user with email ID.

- Explore the SchemaType options from documentation
- Add required field, min , minLength, unique, lowercase,trim
- Add default value.
- Create a custom validate function for gender.
- Improve the DB schema - PUT all appropriate validations on each field in schema.
- Add timestamps to the userSchema.
- Add API level validation on patch and signup post api.
- Data Sanitization Add api validation for each fields.
- Install validator.js.
- Explore validator library functions and Use Validator func for password, email, photUrl
- NEVER TRUST req.body  as it can inject malicious data also.