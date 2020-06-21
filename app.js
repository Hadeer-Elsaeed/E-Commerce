const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const mongoose =require("mongoose");


let authRouter = require('./routes/AuthenticationRouter');

const app = express();

/*------------------------------------------------------ */
//connect to server nodejs
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`app starting listen to post  ${port}....`)
});
//connect to mongoose db
mongoose.connect('mongodb://localhost:27017/ECommerce',{useNewUrlParser: true,
useUnifiedTopology: true  })

    .then((data)=>{
        console.log("connection sucess");
    })
    .catch((err)=>{
        console.log(err +"this is error");

    })
/*----------------------------------------------------*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


