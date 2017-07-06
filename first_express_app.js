var express = require('express');
var app = express();
var handlebars = require('express3-handlebars');

var element = require('./lib/element');

app.engine('hbs', handlebars({ extname: 'hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about', { element: element.getElement() });
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