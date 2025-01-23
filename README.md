# Blog Application

## Team Contributions

- **Mohammad**: (full stack) sort and search feature and pipelines - 30%.
- **Baaizeed**: (full stack) User commenting and ReadMe/settup - 30%.
- **Saleha**: (full stack) User Auth feature and testing - 40%.

### Prerequisites

1. **Required Software**:
   - Install [Node.js](https://nodejs.org/) (version 14 or higher recommended).
   - Install [SQLite3](https://www.sqlite.org/).
   
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/blog-application.git
   cd blog-application
   ```

### Steps to Run

1. **Install Dependencies**:
   Install the required Node.js packages:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   SESSION_SECRET=your_secret_key
   ```

3. **Initialize the Database**:
   - Run the application to initialize the SQLite database:
     ```bash
     npm start
     ```

4. **Start the Application**:
   Launch the server with:
   ```bash
   npm start
   ```
   The application will run at `http://localhost:3000` by default.

5. **Run Tests**:
   To execute the test suite:
   ```bash
   npx test
   ```
   Check the generated test coverage report to ensure thorough testing.

### Troubleshooting

- **Common Issues**:
  - Database not initializing: Ensure write permissions in the project directory.
  - Missing dependencies: Re-run `npm install`.

- **Logs**:
  - Check the terminal output for server logs and error messages.
For any additional assistance contact the development team.
## Features

### Core Features

1. **User Authentication**:
   - Secure registration and login.
   - Session-based authentication with bcrypt-hashed passwords.

2. **Blog Post Management**:
   - Create, read, update, and delete blog posts.
   - Sort and search blog posts by date, alphabetical order, or keywords.

3. **Commenting System**:
   - Add, edit, delete, and reply to comments.
   - Supports nested comment threads.

4. **Statistics Dashboard**:
   - Displays average, median, max, and min blog post lengths.

### Advanced Features

- **Security Enhancements**:
  - Password hashing with bcrypt.
  - Input sanitization to prevent XSS and SQL injection.
  - CSRF protection using middleware.

- **Error Handling**:
  - User-friendly error messages and dedicated error pages.

## Challenges and Solutions

1. **Nested Comments**:
   - **Challenge**: Managing parent-child relationships.
   - **Solution**: Implemented a flexible database schema and recursive rendering logic in Pug templates.

2. **Password Security**:
   - **Challenge**: Ensuring robust password protection.
   - **Solution**: Validated password strength with regex and used bcrypt for secure hashing.

3. **Testing and Coverage**:
   - **Challenge**: Achieving comprehensive test coverage.
   - **Solution**: Developed unit and integration tests covering happy paths and edge cases.

## Evidence for Marking Criteria

### Feature Implementation

1. **User Authentication**:
   - **Code**: [`userController.js`](./userController.js), [`ensureAuth.js`](./ensureAuth.js).
   - **Templates**: [`register.pug`](./register.pug), [`login.pug`](./login.pug).

2. **Blog Management**:
   - **Code**: [`blogController.js`](./blogController.js), [`index.js`](./index.js).
   - **Templates**: [`create.pug`](./create.pug), [`edit.pug`](./edit.pug), [`post.pug`](./post.pug).

3. **Comments**:
   - **Code**: [`commentController.js`](./commentController.js), [`comment.js`](./comment.js).
   - **Templates**: [`post.pug`](./post.pug).

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

### Testing

1. **Test Coverage**:
   - Achieved over 85% test coverage.
   - **Tools**: Jest and Supertest for unit and integration tests.

2. **Example Tests**:
   - Unit tests for user authentication logic.
   - Integration tests for end-to-end workflows (e.g., posting a comment).

3. **Evidence**:
   - Test files: [`tests/auth.test.js`](./tests/auth.test.js), [`tests/blog.test.js`](./tests/blog.test.js).
   - Coverage reports included in `/coverage` folder.

### Security Enhancements

1. **Password Hashing**:
   - Used bcrypt to securely hash passwords.
   - **Code**: [`userController.js`](./userController.js).

2. **Input Validation**:
   - Validated and sanitized user inputs.
   - **Code**: [`commentController.js`](./commentController.js).

3. **CSRF Protection**:
   - Implemented using middleware.

### Code Quality and Refactoring

1. **Modularization**:
   - Refactored controllers and models for better separation of concerns.
   - **Code**: [`blogController.js`](./blogController.js), [`commentController.js`](./commentController.js).

2. **Documentation**:
   - Added meaningful inline comments and consistent formatting.

### CI/CD and Git Practices

1. **GitHub Actions**:
   - Configured CI/CD for automated testing and linting.
   - **Files**: [`.github/workflows/main.yml`](./.github/workflows/main.yml).

2. **Git Practices**:
   - Used feature branches for development.
   - Regular commits with descriptive messages.

## Additional Resources

- **Demo Video**: [Insert Link]
- **Screenshots**: [Insert Links]

Thank you for evaluating our project. Let us know if you have any questions or feedback!