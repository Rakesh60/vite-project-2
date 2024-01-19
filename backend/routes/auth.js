import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const router = express.Router();
import User from "../models/user.js";
import fetchUser from "./middleware/fetchUser.js";

//* Route 1: Create a User using Post /api/auth/signup  . no login required
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All Fields Are Required" });
    }
    //Email Validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    //Find unique user with email
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User alreadt Exists" });
    }
    //salt password
    const salt = await bcrypt.genSalt(10);

    //Hashing Password
    const hashedPassword = await bcrypt.hash(password, salt);

    //*Now For Saving User Data in Database

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);

    res.status(200).json({ success: "Signup Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//*Route 2: Login Route /api/autg/login
router.post("/login", async (req, res) => {
  //Data Coming from body(frontend)
  const { email, password } = req.body;
  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //email validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Enter a valid Email" });
    }
    //find unique user with email
    const user = await User.findOne({ email });
    console.log(user);

    //if user not exists with that email
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    //*Matching user password to hashed password
    const doMatch = await bcrypt.compare(password, user.password);
    console.log(doMatch);

    //if match password then generate token
    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, "" + process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).json({ token,success:'Login Successfull' });
    } else {
      res.status(404).json({ error: "Email and Password not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//* Route 3: for get user /api/auth/getuser
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("get user id", userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
