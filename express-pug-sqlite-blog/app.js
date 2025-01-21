const express = require('express');
const path = require('path');
const session = require('express-session');
const { sequelize } = require('./models');
const { BlogPost } = require('./models/index')
const blogRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret value
  resave: false,
  saveUninitialized: true, // Consider true for development and false for production if cookie consent needed
  cookie: { secure: false } // Ensure is set to true in production with HTTPS
}));

// Middleware to check if user is authenticated
function checkAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Define routes
app.use('/', userRoutes);
app.use('/home', checkAuth, blogRoutes);

app.get('/home', checkAuth, async (req, res) => {
  try {
    const posts = await BlogPost.findAll(); // Fetches all blog posts
    res.render('home', { posts, sortBy: req.query.sortBy || '' }); // Pass posts to template
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).render('500', { title: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

app.get('/create', checkAuth, (req, res) => {
  res.render('create');
});

app.post('/create', checkAuth, async (req, res) => {
  const { title, author, content } = req.body;

  try {
    console.log('Initiating post creation...');
    const newPost = await BlogPost.create({ title, author, content });
    console.log('Post created with ID:', newPost.id);
    res.redirect('/home');
  } catch (err) {
    console.error('Error creating post:', err.stack); // Log full error stack for further investigation
    res.status(500).render('500', { title: 'Internal Server Error' });
  }
});

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