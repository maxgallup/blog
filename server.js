const app = require('express')()

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/profile/:name', (req, res) => {
    res.send("you are viewing: " + req.params.name);
});


app.listen(8080, () => console.log("webserver on 8080"));

