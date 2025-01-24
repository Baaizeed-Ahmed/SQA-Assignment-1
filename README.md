# Blog Application

## Project Overview
This project involves the development of an Express-based blog application, focusing on posting and reading blog entries. The primary objective was to apply Software Quality Assurance (SQA) principles to enhance and refine the application, ensuring it is robust, secure, and thoroughly tested. This was achieved by expanding its features, reinforcing security measures, and implementing comprehensive testing protocols.

## Team Contributions

- **Mohammad**: Responsible for implementing sort and search features, as well as setting up the CI/CD pipeline - 30%.
- **Baaizeed**: Developed the commenting functionality and contributed to writing this README and setup instructions - 30%.
- **Saleha**:  Focused on user authentication features, including testing and contributions to pipeline setup - 40%.

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

## Implemented Features

### Core Features

1. **User Authentication**:
   - Login and Registration functionality.
   - Security measures including password hashing, session-based authentication, and user role management.

2. **Blog Post Management**:
   - Capability to create, edit, and delete blog posts.
   - Advanced search and sorting options for blog posts based on date, title, or keywords.

3. **Commenting System**:
   - Users can add, delete, and reply to comments on individual blog posts.
   - Supports nested comment threads.

4. **Statistics Dashboard**:
   - Displays various blog post statistics, such as average, median, max, and min post lengths.

### Advanced Features

- **Security Enhancements**:
  - Password Hashing: Implemented using bcrypt for secure storage.
  - Input Sanitization: Measures to prevent XSS and SQL injection attacks.
  - CSRF Protection: Added via middleware integration.

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

4. **Branch Management and Conflicts**:
   - **Challenge**: Conflicts arose when updating branches with the main branch.
   - **Solution**: Improved communication on push schedules and frequently committed and pulled updates to minimize conflicts. Received guidance from Josh which streamlined the conflict resolution process.

5. **Pipeline Errors**:
   - **Challenge**: Repeated errors in the CI/CD pipeline.
   - **Solution**: Researched the error online, with a Stack Overflow solution providing the fix needed to stabilize the pipeline.

## Evidence for Marking Criteria

### Feature Implementation

Thorough implementation of user authentication and blog management features, with robust CRUD operations and additional sorting and searching functionalities.

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

Comprehensive unit and integration tests developed, employing Jest to ensure high code coverage and reliability.

1. **Test Coverage**:
   - Achieved over 85% test coverage.
   - **Tools**: Jest and Supertest for unit and integration tests.

2. **Example Tests**:
   - Unit tests for user authentication logic.
   - Integration tests for end-to-end workflows (e.g., posting a comment).

3. **Evidence**:
   - Test-Driven Development (TDD) Approach:
   In developing our blog application, we employed a Test-Driven Development (TDD) strategy to ensure a robust and reliable codebase. Our approach involved the following steps:
      1. Defining Test Cases Before Development:
        - Prior to writing any functional code, we outlined specific test cases to validate the expected behavior of our features. This included scenarios for both successful operations and edge cases.

      2. Unit and Integration Tests:
        - We created unit tests for our core components, focusing on models and utility functions.
        - Integration tests were designed to simulate end-to-end workflows, covering user interactions such as login, registration, blog creation, and commenting.

      3. Continuous Testing:
        - Tests were run continuously during the development phase, with code only being written to pass pre-defined tests, ensuring that each feature met its requirements before moving forward.

      4. Test Coverage Reports:
        - Utilizing tools like Jest (or another relevant tool), we generated test coverage reports to ensure comprehensive coverage across our application.

      Example Tests:
     
      For example, tests were written to cover scenarios like blog post creation, with assertions checking for successful data handling and storage.
      This rigorous application of TDD helped in identifying issues early in the development cycle and ensured that any changes in the codebase were non-breaking.


   - Test files: [`tests/app.test.js`](./tests/app.test.js), [`tests/models/blog.test.js`](./tests/models/blog.test.js).

### Security Enhancements

Consistently applied security measures across the application, including bcrypt for passwords, CSRF protection, and input sanitization.

1. **Password Hashing**:
   - Used bcrypt to securely hash passwords.
   - **Code**: [`userController.js`](./userController.js).

2. **Input Validation**:
   - Validated and sanitized user inputs.
   - **Code**: [`commentController.js`](./commentController.js).

3. **CSRF Protection**:
   - Implemented using middleware.

### Code Quality and Refactoring

The codebase has been refactored for modularity and maintainability, adhering to coding standards with meaningful documentation throughout the project.

1. **Modularization**:
   - Refactored controllers and models for better separation of concerns.
   - **Code**: [`blogController.js`](./blogController.js), [`commentController.js`](./commentController.js).

2. **Documentation**:
   - Added meaningful inline comments and consistent formatting.

### CI/CD and Git Practices

Effective use of GitHub for collaborative version control. GitHub Actions have been configured to automate testing and code quality checks, with a structured branching strategy and regular, meaningful commits.

1. **GitHub Actions**:
   - Configured CI/CD for automated testing and linting.
   - **Files**: [`.github/workflows/main.yml`](./.github/workflows/main.yml).

2. **Git Practices**:
   - Used feature branches for development.
   - Regular commits with descriptive messages.

Thank you for evaluating our project. Let us know if you have any questions or feedback!
