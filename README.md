# Blog Application

## Team Contributions

- **Mohammad**: (full stack) sort and search feature and pipelines - 30%.
- **Baaizeed**: (full stack) User commenting and ReadMe/settup - 30%.
- **Saleha**: (full stack) User Auth feature and testing - 40%.

## Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/) (version 14 or higher recommended).
- Ensure [SQLite3](https://www.sqlite.org/) is installed on your system.
- Clone the repository from the version control platform.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/blog-application.git
   cd blog-application
   ```

2. **Install Dependencies**:
   Install all necessary Node.js packages using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables and configure them as needed:
     ```env
     PORT=3000
     SESSION_SECRET=your_secret_key
     ```

4. **Initialize the Database**:
   - Run the application once to automatically initialize the SQLite database:
     ```bash
     npm start
     ```
   - Alternatively, use a SQLite client to ensure `database.sqlite` is correctly created in the project directory.

5. **Run the Application**:
   Start the application server:
   ```bash
   npm start
   ```
   The application will be accessible at:
   - `http://localhost:3000` (default port)

6. **Testing the Application**:
   - **Manual Testing**: Navigate through the application and interact with features like user registration, blog creation, and commenting.
   - **Automated Testing**: Run any available test scripts using:
     ```bash
     npm test
     ```

### Troubleshooting

- **Common Issues**:
  - If the database does not initialize, check for write permissions in the project directory.
  - Ensure Node.js and SQLite3 are properly installed and accessible in your PATH.

- **Logs**:
  - The server logs all incoming requests and errors for debugging. Check the terminal for detailed information.

For any additional assistance contact the development team.

## Features

### Core Features
- **User Authentication**:
  - Secure registration and login with session-based authentication.
  - Password hashing using bcrypt.

- **Blog Post Management**:
  - Create, view, edit, and delete blog posts.

- **Commenting System**:
  - Add, edit, delete, and reply to comments.
  - Support for nested comment threads.

- **Search and Sort**:
  - Search posts by title or author.
  - Sort posts by newest, oldest, or alphabetical order.

### Advanced Features
- **Statistics Dashboard**:
  - View detailed statistics on post lengths (average, median, max, and min).

- **Error Handling**:
  - Comprehensive error pages (e.g., 500 Internal Server Error).

## Challenges and Solutions

1. **Nested Comments**:
   - **Challenge**: Efficiently implementing parent-child relationships.
   - **Solution**: Designed a database schema to handle nesting and used recursive logic in templates.

2. **Password Security**:
   - **Challenge**: Validating and securing user passwords.
   - **Solution**: Implemented regex validation and bcrypt hashing.

3. **Search and Sort Functionality**:
   - **Challenge**: Building dynamic, performant queries.
   - **Solution**: Used Sequelize ORM to construct flexible query conditions.

4. **Database Optimization**:
   - **Challenge**: Handling large datasets efficiently.
   - **Solution**: Indexed key fields and minimized query overhead.

## Evidence for Marking Criteria

### Functionality

1. **Authentication**:
   - **Code**: [`userController.js`](./userController.js), [`ensureAuth.js`](./ensureAuth.js).
   - **Templates**: [`register.pug`](./register.pug), [`login.pug`](./login.pug).
   - **Details**: Users can register, log in, and manage sessions securely.

2. **Blog Management**:
   - **Code**: [`blogController.js`](./blogController.js), [`index.js`](./index.js).
   - **Templates**: [`create.pug`](./create.pug), [`edit.pug`](./edit.pug), [`post.pug`](./post.pug).
   - **Details**: CRUD operations on blog posts.

3. **Comments**:
   - **Code**: [`commentController.js`](./commentController.js), [`comment.js`](./comment.js).
   - **Templates**: [`post.pug`](./post.pug).
   - **Details**: Comments can be added, edited, deleted, and replied to.

### Usability

1. **User Interface**:
   - **Templates**: [`index.pug`](./index.pug), [`layout.pug`](./layout.pug), [`500.pug`](./500.pug).
   - **Details**: Clean, responsive, and intuitive design.

2. **Search and Sort**:
   - **Code**: [`blogController.js`](./blogController.js).
   - **Templates**: [`index.pug`](./index.pug).
   - **Details**: Filters and sorts posts dynamically.

### Technical Robustness

1. **Secure Password Handling**:
   - **Code**: [`userController.js`](./userController.js), [`ensureAuth.js`](./ensureAuth.js).
   - **Details**: Passwords are hashed and stored securely.

2. **Error Handling**:
   - **Code**: [`blogController.js`](./blogController.js), [`500.pug`](./500.pug).
   - **Details**: User-friendly error messages and robust logging.

### Advanced Features

1. **Statistics**:
   - **Code**: [`blogController.js`](./blogController.js), [`stats.pug`](./stats.pug).
   - **Details**: Provides insights into post statistics.

2. **Nested Comments**:
   - **Code**: [`commentController.js`](./commentController.js), [`comment.js`](./comment.js).
   - **Templates**: [`post.pug`](./post.pug).
   - **Details**: Supports hierarchical comments.

## Additional Resources

- **Demo Video**: [Insert Link]
- **Screenshots**: [Insert Links]

Thank you for evaluating our project. Feel free to reach out with any questions or feedback!