var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  	response.render('pages/index');
});

app.get('/post/list', function(request, response) {
  	response.render('pages/post/list');
});

app.get('/post/detail', function(request, response) {
  	response.render('pages/post/detail', request.query);
});

app.get('/post/add', function(request, response) {
  	response.render('pages/post/add');
});

app.listen(app.get('port'), function() {
  	console.log('Node app is running on port', app.get('port'));
});


