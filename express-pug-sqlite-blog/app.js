const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const blogRoutes = require('./routes/blog');
const Usercomments = require('./routes/comments');

const app = express();
const port = process.env.PORT || 3001;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Usercomments);

app.use('/', blogRoutes);

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to synchronize the database:', err);
  });
