const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const blogRoutes = require('./routes/blog');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', blogRoutes);

// Handle 404 (Not Found) errors
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Handle 500 (Internal Server) errors
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).render('500', { title: 'Internal Server Error' });
});

sequelize.sync({ force: false }) // Use force: false in production environments
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to synchronize the database:', err);
  });