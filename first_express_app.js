var express = require('express');
var app = express();
var handlebars = require('express3-handlebars');

var element = require('./lib/element');

app.engine('hbs', handlebars({ extname: 'hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.use(require('body-parser')());

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

// check param for showing tests on page (if not in production env)
// ex: localhost:3000?test=1 => show tests
app.use(function (req, res, next) {
  // res.locals - context that will be passed to views
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about', {
    element: element.getElement(),
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', function (req, res) {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
  res.render('tours/request-group-rate');
});

app.get('/newsletter', function (req, res) {
  res.render('newsletter', { csrf: 'CSRF token' });
});

app.post('/process', function (req, res) {
  if(req.xhr || req.accepts('json,html') === 'json') {
    res.send({ success: true });
  } else {
    res.redirect(303, '/thank-you');
  }
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Listening http://localhost:' + app.get('port'));
});