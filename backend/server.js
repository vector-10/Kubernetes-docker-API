const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require("./userModel");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();


app.use(bodyParser.json());
// for production 
app.use(express.static("./person-app/dist"))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "person-app", "dist", "index.html"))
});

// cors options for all urls
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));




// //cors policy for front-end access
// const allowedOrigins = "http://localhost:5173";
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Check if the request's origin is in the allowedOrigins array
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );


//CRUD OPERATIONS FOR PERSON RESOURCE
app.get("/", (req, res) => {
  res.json({
    message: "Hello from server"
  })
})

//register functionality
app.post("/api/v1/user/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, password to  user" });
    }
    //email check in database
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(500).json({ message: "Email already exists on database" });
    }
    //hash password with bcrypt
    const hashedPasssword = await bcrypt.hash(password, 10)
    //create a new user
    const user = await User.create({ name, email, password: hashedPasssword  });
    // Generate a JWT for login
    const token = jwt.sign({ userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h" })
    // return the user in json format
    res.status(201).json({ message: "User successfully created", token, user });
  } catch (error) {
    res.status(500).json({ message: "User could not be created" });
    console.log(error);
  }
});

// login functionality
app.post("/api/v1/user/login", async (req, res) => {
  try {
    const { email, password  } = req.body;
    // if and else check  
    if (!email || !password ) {
      return res.status(400).json({ message: "Please provide name and email to login user" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Email does not exist on database" });
    }
    
    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password, please enter correct password" });
    }
    //Generate an JWT token for login
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h"})
    res.status(201).json({ message: "User successfully logged in!!", token, user });
  } catch (error) {
    res.status(500).json({ message: "An error occured, user could not be logged in!!" });
    console.log(error);
  }
});


//CONNECT TO MONGODB DATABASE
const connectDB = async() => {
  try {
   await mongoose.connect(process.env.MONGODB_URI)
   console.log(`Successfully connected to mongoDB database with host ${mongoose.connection.host}`);
  } catch (error) {
   console.error(`Not connected to mongoDB database`, error);
  }
 }
 connectDB();
 
 const PORT = 4000 || process.env.PORT; 
 app.listen(PORT, () => {console.log(`server is listening on PORT ${PORT}`)});
   




// app.get("/api/user/:userid", async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const user = await User.findOne({ _id: user_id });
//     if (!user) {
//       res.status(404).json({
//         message: "user not found",
//       });
//     }
//     res.status(200).json({
//       message: "User successfully found",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "User not successfully found",
//     });
//     console.log(error);
//   }
// });

// app.get("/api/user/allusers", async (req, res) => {
//   try {
//     const userCount = await User.countDocuments;
//     const allUsers = await User.find();

//     if (userCount === 0) {
//       res.status(404).json({
//         message: "No user found in database",
//       });
//     }
//     res.status(200).json({
//       message: "Users successfully found",
//       allUsers,
//       userCount,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Users not successfully found",
//     });
//   }
// });

// app.put("/api/user/:user_id", async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const user = await User.findOneAndUpdate({ _id: user_id }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       res.status(404).json({
//         message: `No user with ${_id} found in database`,
//       });
//     }
//     res.status(200).json({
//       message: "Users successfully found and updated",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "User not successfully updated",
//     });
//   }
// });

// app.delete("/api/user/:userid", async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const user = await User.findOneAndDelete({ _id: user_id });

//     if (!user) {
//       return res.status(404).json({
//         message: `No user with ${user_id} found in database`,
//       });
//     }

//     return res.status(200).json({
//       message: "User successfully deleted",
//       user,
//     });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return res.status(500).json({
//       message: "An error occurred while deleting the user",
//       error: error.message,
//     });
//   }
// });

//CRUD OPERATIONS END FOR PERSON RESOURCE


