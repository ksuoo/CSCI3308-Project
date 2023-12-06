// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************


app.set('view engine', 'ejs'); // set the view engine to EJS
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

app.use(express.static('public'));

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here

app.get("/", (req, res) => {
    res.redirect("/home");
  });

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

// Register
app.get("/register", (req, res) => {
    res.render("pages/register");
  });

app.post("/register", async (req, res) => {
    //hash the password using bcrypt library
    const hash = await bcrypt.hash(req.body.password, 10);
    const username = req.body.name;
    if (username === ''){
      res.json({ status: 'Invalid input', message: 'Invalid input'});
      return;
    }
    const query = 'insert into users(username, password) values ($1, $2);';
  
    // To-DO: Insert username and hashed password into 'users' table
    db.query(query, [username, hash])
    .then(() => {
      res.redirect("/login");
      // res.json({ status: 'Success', message: 'Success'});

    })
    .catch((error) => {
      res.render("pages/register", {
        message: "Username already exists.",
      });
      // res.json({ status: 'Invalid input', message: 'Invalid input'});
    });
  });

app.get("/login", (req, res) => {
    res.render("pages/login");
  });

app.post("/login", async (req, res) => {
  const username = req.body.name;
  const query = 'select * from users where username = $1';

  try{
    const data = await db.query(query, username);
    
    if(data.length === 0){
      return res.render("pages/login", {
        message: "Account not found.",
      });
      // return res.json({ status: 'Invalid input', message: 'Invalid input'});
    }
    user = data[0];
    // check if password from request matches with password in DB
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match){
      return res.render("pages/login", {
        message: "Incorrect username or passord.",
      });
      // return res.json({ status: 'Invalid input', message: 'Invalid input'});
      
    }
    //save user details in session like in lab 8
    req.session.user = user;
    req.session.save();
    res.redirect("/home");
    // res.json({ status: 'Success', message: 'Success'});
  } 
  catch(error){
    res.render("pages/register", {
      message: "Database request failed.",
    });
    // res.json({ status: 'Invalid input', message: 'Invalid input'});
  }
  });

app.get("/about", (req, res) => {
    res.render("pages/about");
  });

// Authentication Middleware.
const auth = (req, res, next) => {
    if (!req.session.user) {
      // Default to login page.
      return res.redirect('/login');
    }
    next();
  };

// Authentication Required
app.use(auth);

app.get("/home", (req, res) => {
  res.render("pages/home");
});

app.get("/profile", (req, res) => {
  res.render("pages/profile");
});

app.get("/discover", (req, res) => {
  axios({
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=a3d9272b711946149fef322a71c8343f`,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Accept-Encoding': 'application/json',
    },
    params: {
      apikey: process.env.API_KEY,
      query: req.query.query,
      cuisine: req.query.cuisine,
      type: req.query.type,
      diet: req.query.diet,
      number: 12 // you can choose the number of events you would like to return
    },
  })
    .then(results => {
      console.log(results.data.results); // the results will be displayed on the terminal if the docker containers are running // Send some parameters
      res.render("pages/filter",{
        results : results.data.results
      });
    })
    .catch(error => {
      // Handle errors
      res.render("pages/filter",{
        message: "No recipes matched your search",
        results: [],
      });
    });
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/login", {
    message: "Logged out Successfully",
  });
});


// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');