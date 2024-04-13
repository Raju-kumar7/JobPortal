const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');




// import routes
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/jobsRoutes');
const jobTypeRoute = require('./Routes/jobTypeRoute');
const jobRoute = require('./Routes/jobsRoutes');

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const { connection } = require("./db");

//database connection


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());


//ROUTES MIDDLEWARE
// app.get('/', (req, res) => {
//     res.send("Hello from Node Js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);

// error middleware
app.use(errorHandler);

//port
const port = process.env.PORT

mongoose.connect(process.env.mongoURL, {})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});