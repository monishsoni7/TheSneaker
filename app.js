const express = require('express');
const app = express();
const cookieparser = require('cookie-parser');
const path = require('path');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const db = require('./config/mongoose-connection');

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)


app.listen(3000);
