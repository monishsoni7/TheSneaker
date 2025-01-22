const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/index');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

app.use(express.json());
app.use(cookieparser());
app.use(session({
     resave: false,
     saveUninitialized: false,
     secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(process.env.PORT);
