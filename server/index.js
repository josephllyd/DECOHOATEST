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
import "./models/properties.js"

app.use(cors({
    origin:["https://decohoatest-client.vercel.app", "http://localhost:3000"],
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

 