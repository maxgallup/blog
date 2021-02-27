var app = require('express')();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {view:'home'});
});

app.get('/posts', (req, res) => {
    res.render('index', {view:'posts'});
});

app.get('/posts/:name', (req, res) => {
    res.render('index', {view: 'posts/' + req.params.name});
});

app.get('/about', (req, res) => {
    res.render('index', {view:'about'});
});

app.get('/*', (req, res) => {
    res.render('index', {view:'404'});
});



app.listen(8080, console.log("webserver on 8080"));