const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");

const app = express();
require("./config/passport")(passport);

//Connect to DB
const db = require("./config/keys").MongoURI;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(db)
    .then(() => console.log("How can I get all users hear?"))
    .catch(err => console.log(err));

//EJS 
app.use(expressLayouts);
app.set("view engine","ejs");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Express Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());
//Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error_pass = req.flash("error_pass");
    next();
});


//Routes
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const dashboard = require("./routes/dashboard");
const api = require("./routes/api");

app.use("/",indexRoutes);
app.use("/users",userRoutes);
app.use("/dashboard",dashboard);
app.use("/api",api);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if(err){
        console.log("Something go wrong");
    }
    else{
        console.log(`Server run on port ${PORT}`);
    }
})