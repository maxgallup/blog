const app = require('express')();
app.set('view engine', 'ejs');

const fs = require('fs');
let postsDir = 'views/partials/posts';

app.get('/', (req, res) => {
    res.render('index', {view:'home'});
});

app.get('/posts', (req, res) => {
    res.render('index', {view:'posts'});
});

app.get('/posts/:name', (req, res) => {
    let filenames = fs.readdirSync(postsDir);
    if(filenames.includes(req.params.name.split('.')[0] + '.ejs')){
        res.render('index', {view: 'posts/' + req.params.name});
    } else {
        res.render('index', {view: '404'});
    }

});

app.get('/about', (req, res) => {
    res.render('index', {view:'about'});
});

app.get('/*', (req, res) => {
    res.render('index', {view:'404'});
});



app.listen(8080, console.log("webserver on 8080"));