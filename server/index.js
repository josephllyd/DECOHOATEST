import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './models/userDetails.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import nodemailer from "nodemailer";
dotenv.config();
import "./models/properties.js"
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));



app.use(cors({
    origin:["https://decohoatest-client.vercel.app", 
      "http://localhost:3000"
    ],
    methods:["POST", "GET"],
    credentials: true
  }
));

app.use(express.json());
const { MONGO_URL, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 5000; 

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.listen(PORT, () => { 
  console.log(`Server Started on port ${PORT}`);
});


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
      expiresIn: "60m",
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
        return "Token expired";
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

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id }, 
      secret, {
        expiresIn: "10m",
    });

     /* const currentHostname = window.location.hostname;
    const link = "";
    if (currentHostname === "localhost") {
      link =  `http://localhost:5000/reset-password/${oldUser._id}/${token}`; // Local environment
    } else {
      link =  `https://decohoatest-server.vercel.app/reset-password/${oldUser._id}/${token}` ; // Vercel environment
    }  
    
    
     
    const vercelEnvironment = 'https://decohoatest-server.vercel.app';
    const localEnvironment = 'http://localhost:5000';
    const link =
      currentHostname === "localhost"
        ? `${localEnvironment}/reset-password/${oldUser._id}/${token}`
        : `${vercelEnvironment}/reset-password/${oldUser._id}/${token}`;  
  

        const currentHostname = req.headers.host; // Use the request's host header to determine the environment
        const isLocalhost = currentHostname === "localhost";
        const baseUrl = isLocalhost
          ? "http://localhost:5000" // Local environment
          : "https://decohoatest-server.vercel.app"; // Vercel environment
    
        const link = `${baseUrl}/reset-password/${oldUser._id}/${token}`;
  */
        const vercelEnvironment = 'https://decohoatest-server.vercel.app';
        const localEnvironment = 'http://localhost:5000';
        const link =
          process.env.NODE_ENV === 'production'
            ? `${vercelEnvironment}/reset-password/${oldUser._id}/${token}`
            : `${localEnvironment}/reset-password/${oldUser._id}/${token}`;
    //const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marumasjoseph@gmail.com",
        pass: "hxbfrsiprvwyzeqv",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "DecoHOA Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }); 
    console.log(link);
  } catch (error) { }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Token expired or Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    //res.json({status: "Password Updated"})
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.error(error);
    res.json(  "Something Went Wrong" );
  }
});




// Import your Property model
const Property = mongoose.model('Properties');
// Middleware to extract user information from JWT
const authenticateUser = (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Token expired or invalid" });
      }
      // Attach user information to the request
      req.user = decodedToken;
      next();
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
};

// Apply the middleware to the /addProperty route
app.post("/addProperty", authenticateUser, async (req, res) => {
  const { name, price, description, category, token } = req.body;
  try {
    // Verify the user's token to get their email
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email });

    // Create a new property with the owner ID from the user
    const property = await Property.create({
      name,
      price,
      description,
      category,
      owner: user._id, // Use user._id to get the user's ObjectId
    });

    // Send a response indicating success
    res.status(201).json({ status: "ok", property });
  } catch (error) {
    // Handle errors
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.get("/getProperties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ status: "ok", properties });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "ok", users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default app;

 