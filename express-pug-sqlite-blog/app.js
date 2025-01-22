const express = require('express');
const path = require('path');
const session = require('express-session');
const { sequelize, BlogPost } = require('./models');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const checkAuth = require('./middleware/ensureAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', userRoutes);
app.use('/', checkAuth, blogRoutes);

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500', { title: 'Internal Server Error' });
});

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to synchronize the database:', err);
  });