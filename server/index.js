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
import "./models/properties.js";
import "./models/finance.js";
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
import multer from 'multer';


app.use(cors({
    origin:["https://decohoatest-client.vercel.app", 
      "http://localhost:3000"
    ],
    methods:["POST", "GET", "DELETE", "PUT"],
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
      expiresIn: "1d",
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
    if (!verify) {
      return res.send("Token expired or Not Verified");
    }
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
    if (!verify) {
      return res.json({ status: "Token expired or invalid" });
    }
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
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.error(error);
    res.json("Something Went Wrong");
  }
});

// Import your Property model
const Property = mongoose.model('Properties');
const upload = multer({ dest: 'uploads/' });

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
app.post("/addProperty", authenticateUser, upload.single('image'), async (req, res) => {
  const { name, price, description, category, token } = req.body;
  const image = req.file; // Extract the image from the request

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
      image: image.path, // Store the file path in the database
      owner: user._id,
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

app.delete("/deleteProperty/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ status: "Property not found" });
    }
    res.status(200).json({ status: "ok", property: deletedProperty });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});



app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ status: "No users found or Token expired!" });
    }
    res.status(200).json({ status: "ok", users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


app.get("/searchProperties", async (req, res) => {
  try {
    const { category } = req.query; // Get the category from the query parameters

    // Use Mongoose to find properties that match the category
    const properties = await Property.find({ category });

    // Return the results as JSON
    res.status(200).json({ status: "ok", properties });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

app.put("/editProperty/:propertyId", authenticateUser, async (req, res) => {
  const { propertyId } = req.params;
  const { name, price, description, category, token } = req.body;

  try {
    // Verify the user's token to get their email
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email });

    // Find the property by ID and owner
    const property = await Property.findOne({ _id: propertyId, owner: user._id });

    if (!property) {
      return res.status(404).json({ status: "Property not found" });
    }

    // Update the property details
    property.name = name;
    property.price = price;
    property.description = description;
    property.category = category;

    // Save the updated property
    await property.save();

    // Send a response indicating success
    res.status(200).json({ status: "ok", property });
  } catch (error) {
    // Handle errors
    res.status(500).json({ status: "error", error: error.message });
  }
});

const Finance = mongoose.model('Finance');

app.post("/addFinance", authenticateUser, async (req, res) => {
  const { user, property, amount, paymentType, date, receipt } = req.body;
  console.log("Incoming request data:", req.body);
  try {
    const { email } = jwt.verify(req.body.token, JWT_SECRET);
    const foundUser = await User.findOne({ email });
   
    const finance = await Finance.create({
      user, // Store the user's ID
      property,
      amount,
      paymentType,
      date,
      receipt,
      token: req.body.token,
    });
    console.log("Finance data added:", finance);

    res.status(201).json({ status: "ok", finance });
  } catch (error) {
    console.error("Error adding finance:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});


export default app;

 