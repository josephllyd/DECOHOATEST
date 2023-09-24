/*import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation
import * as User from './models/User.js';


import propertiesRoutes from './routes/properties.js';
import generalRoutes from './routes/general.js';
import membersRoutes from './routes/members.js';
import updatesRoutes from './routes/updates.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/general', generalRoutes);
app.use('/properties', propertiesRoutes);
app.use('/members', membersRoutes);
app.use('/updates', updatesRoutes);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to database! Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
*/

import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/userDetails.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
dotenv.config();

app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://dbUser:255-2636@cluster0.rhrq2pl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  app.listen(5001, () => {
    console.log("Server Started");
  });

  app.get("/", (req, res) => {
    res.json("Hello");
  })


/*
const { MONGO_URL, JWT_SECRET } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server Started");
}); */

  
  app.post("/post", async(req, res) => {
    console.log(req.body);
    const {data} = req.body;

    try {
      if (data == 'adash') {
        res.send({status:"ok"});
      } else {
        res.send({status :"User not found"})
      }
    } catch (error) {
      res.send({status: "Something went wrong try again"})
    }
  })


  const User = mongoose.model('UserInfo');

  app.post("/signup", async (req, res) => {
    const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

  export default app;

 /*
app.post('/signup', async (req, res) => {
  const {fname, lname, email, password, userType } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: 'User Exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      userType,
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: 'User Not found' });
  }
  if (await bcrypt.compare(password, user.password)) {
    // Define your JWT_SECRET variable, which is missing in your code
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '15m',
    });

    // You should return the token as a response
    return res.json({ status: 'ok', data: token });
  }
  res.json({ status: 'error', error: 'Invalid Password' });
});


 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://dbUser:255-2636@cluster0.rhrq2pl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
require("./imageDetails");

const User = mongoose.model("UserInfo");
const Images = mongoose.model("ImageDetails");
app.post("/signup", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});



app.listen(5000, () => {
  console.log("Server Started");
});

*/