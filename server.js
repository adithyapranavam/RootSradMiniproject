const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");



const userRouter = require('./route/user');
const adminRouter = require('./route/admin');

// MONGO CONNECTION
const connectDB = require('./Database/db')
connectDB();
dotenv.config({ path: 'config.env' });

// session and cookie
app.use(cookieParser());
// url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: false, 
        cookie: { secure: false },
    })
);

// PORT SETTING
const PORT = process.env.PORT || 1996;

// EJS SETTING
app.set("view engine", "ejs");
app.use('/views',express.static(path.join(__dirname,'./views')));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, private, must-revalidate');
    next();
});



app.use('/', userRouter);
app.use('/admin', adminRouter);



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
