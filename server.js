require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const User = require("./userModel");
const mongoose = require("mongoose");

app.use(bodyParser.json());

//CRUD OPERATIONS FOR PERSON RESOURCE

app.post("/api/user", async (req, res) => {
  try {
    const { name, email, level } = req.body;
    if (!name || !email || !level) {
      return res.status(500).json({
        message: "Please provide name, email, level to create user",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(500).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      level,
    });

    res.status(201).json({
      message: "User successfully created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User could not be created",
    });
    console.log(error);
  }
});

app.get("/api/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "User successfully found",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not successfully found",
    });
    console.log(error);
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const userCount = await User.countDocuments;
    const allUsers = await User.find();

    if (userCount === 0) {
      res.status(404).json({
        message: "No user found in database",
      });
    }
    res.status(200).json({
      message: "Users successfully found",
      allUsers,
      userCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Users not successfully found",
    });
  }
});

app.put("/api/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOneAndUpdate({ _id: user_id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).json({
        message: `No user with ${_id} found in database`,
      });
    }
    res.status(200).json({
      message: "Users successfully found and updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User not successfully updated",
    });
  }
});

app.delete("/api/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findOneAndDelete({ _id: user_id });

    if (!user) {
      return res.status(404).json({
        message: `No user with ${user_id} found in database`,
      });
    }

    return res.status(200).json({
      message: "User successfully deleted",
      user,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
});

//CRUD OPERATIONS END FOR PERSON RESOURCE

//CONNECT TO MONGODB DATABASE
const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Successfully connected to mongoDB database`);
    })
    .catch(() => {
      console.error(`Not connected to mongoDB database`, error);
    });
};

const PORT = 4000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
