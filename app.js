const express = require('express');
const path = require('path');
const blogRouter = require('./routes/blog');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create Post' });
});

app.use('/', blogRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});