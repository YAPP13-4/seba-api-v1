var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playlistsRouter = require('./routes/playlists');
var musicRouter = require('./routes/musics');
var featuredRouter = require('./routes/featured');
var commentRouter = require('./routes/comments');

var dataCreator = require('./models/data-creator');

var sequelize = require('./models').sequelize;

var app = express();
sequelize
  .sync({ force: true })
  .then(() => {
    dataCreator.relationInit();
  })
  .then(() => {
    dataCreator.dataInit();
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/playlists', playlistsRouter);
app.use('/musics', musicRouter);
app.use('/featured', featuredRouter);
app.use('/comments', commentRouter);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOption = require('./swagger');
const swaggerSpec = swaggerJSDoc(swaggerOption);
const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
