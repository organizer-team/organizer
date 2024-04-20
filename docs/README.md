# MERN Stack Application

## Packages

The application built on the MERN stack.

The client part of the application is built on:

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces. It's used to build the components of the application.

- **[React Router DOM](https://reactrouter.com/web/guides/quick-start)**: A collection of navigational components that used for routing in the application.

- **[React Icons](https://react-icons.github.io/react-icons/)**: A library that provides popular icons.

- **[Vite](https://vitejs.dev/)**: A build tool that aims to provide a faster and leaner development experience for modern web projects. It's used for building the application and for local development.

- **[Testing Library](https://testing-library.com/)**: A set of helpers that let you test React components without relying on their implementation details. This project uses `@testing-library/react` for React component testing, `@testing-library/user-event` for simulating user events, and `@testing-library/jest-dom` for custom jest matchers.

- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework. It's used to style the application.

- **[Babel](https://babeljs.io/)** used to compile the application.

- **[Autoprefixer](https://github.com/postcss/autoprefixer)**: A tool to parse CSS and add vendor prefixes to CSS rules. It's used to ensure the application's CSS works on all browsers.

The server part of the application is built on:

- **[Express](https://expressjs.com/)**: A fast, unopinionated, and minimalist web framework for Node.js. It's used to build the server for the application.

- **[Mongoose](https://mongoosejs.com/)**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It's used to model the application data.

- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)**: A library to hash and check passwords in Node.js. It's used for password hashing.

- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: An implementation of JSON Web Tokens. It's used for user authentication.

- **[validator](https://www.npmjs.com/package/validator)**: A library of string validators and sanitizers. It's used for data validation.

- **[cors](https://www.npmjs.com/package/cors)**: A package for providing a Connect/Express middleware that can be used to enable CORS with various options. It's used to handle Cross-Origin Resource Sharing.

- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: A middleware which parses cookies attached to the client request object. It's used to handle cookies.

- **[dotenv](https://www.npmjs.com/package/dotenv)**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. It's used to handle environment variables.

- **[Supertest](https://www.npmjs.com/package/supertest)**: A high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by super-agent. It's used for testing HTTP assertions.

- **[Node.js](https://nodejs.org/)**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used to run the server for the application.

- **[Nodemon](https://www.npmjs.com/package/nodemon)**: A utility that will monitor for any changes in your source and automatically restart your server. It's used for development to automatically restart the server when file changes in the directory are detected.

- **[mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)**: Spins up a real MongoDB Server programmatically from node for testing or mocking during development. It's used for testing database operations.

Technologies also used in the project:

- **[Jest](https://jestjs.io/)**: A JavaScript testing framework. It's used to write tests for the application.

- **[Airbnb's ESLint configuration](https://www.npmjs.com/package/eslint-config-airbnb)**: A widely used ESLint configuration that follows Airbnb's JavaScript style guide. It's used to enforce a consistent style in the codebase.

- **[Concurrently](https://www.npmjs.com/package/concurrently)**: A utility to run multiple commands concurrently. It's used to run the client and server parts of the application simultaneously.

## Code Formatting with Husky, ESLint, and Prettier

This project uses [Husky](https://typicode.github.io/husky/#/), [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/) to enforce a consistent code style and catch potential issues.

In short, the `pre-commit` script is a hook that runs before each commit, triggering the `lint` and `autofix` scripts to ensure that your code is formatted correctly and free of linting errors.

- **[Husky](https://typicode.github.io/husky/)** is used to set up Git hooks that automatically format your code and check for linting errors before each commit. It helps to catch issues before they are committed to the repository. You can customize Husky's behavior in the `.husky/` directory.
- **[ESLint](https://eslint.org/)** is a tool for identifying and reporting on patterns in JavaScript. It helps to maintain code quality and ensure code consistency. You can customize ESLint's rules in the `.eslintrc.cjs` file.
- **[Prettier](https://prettier.io/)** is a code formatter. It enforces a consistent style by parsing your code and reprinting it with its own rules. You can customize Prettier's rules in the `.prettierrc.json` file.

To manually run these tools, use the following npm scripts:

- `npm run code-style-check`: Run Prettier to check that your code is formatted correctly.
- `npm run lint`: Run ESLint to check for code issues.
- `npm run autofix`: Run Prettier and ESLint with the `--fix` option to automatically fix issues.

Remember to run `npm run setup` to ensure that Husky, ESLint, and Prettier are installed and set up correctly.

### Configured Rules

The configuration files contain the following rules:

- `"trailingComma": "es5"`: In ES5, trailing commas are allowed in array literals and object literals, but not in function calls and declarations.

- `"singleQuote": true"`: This rule enforces the use of single quotes in JavaScript code. Note that this rule does not apply to JSX, where double quotes are preferred.

- `"jsxSingleQuote": false"`: This rule enforces the use of double quotes in JSX. This is a common convention in the React community and helps distinguish JavaScript code from JSX.

- `"arrowParens": "always"`: This rule enforces the use of parentheses around the argument in arrow functions, regardless of the number of arguments. For example, `(x) => x` instead of `x => x`.
