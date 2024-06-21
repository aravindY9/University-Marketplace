const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();


const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const eventRoutes = require('./routes/eventRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');

 

mongoose.connect(
  "mongodb://127.0.0.1:27017/students-ecom",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: true,
  },
  function () {
    console.log("Mongoose Is Connected");
  }
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


app.use("/*", (req, res, next) => {
    console.log(req.url)
    next();
})

app.use("/", tutorialRoutes);
app.use("/", eventRoutes);
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", chatRoutes);


app.listen(4000, () => {
  console.log("Server Has Started");
});
