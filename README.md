# organizer

## Project Description

Will be soon

## Code Formatting with Husky, ESLint, and Prettier

This project uses [Husky](https://typicode.github.io/husky/#/), [ESLint](https://eslint.org/), and [Prettier](https://prettier.io/) to enforce a consistent code style and catch potential issues.

In short, the `pre-commit` script is a hook that runs before each commit, triggering the `lint` and `autofix` scripts to ensure that your code is formatted correctly and free of linting errors.

- **Husky** is used to set up Git hooks that automatically format your code and check for linting errors before each commit. It helps to catch issues before they are committed to the repository. You can customize Husky's behavior in the `.husky/` directory.
- **ESLint** is a tool for identifying and reporting on patterns in JavaScript. It helps to maintain code quality and ensure code consistency. You can customize ESLint's rules in the `.eslintrc.cjs` file.
- **Prettier** is a code formatter. It enforces a consistent style by parsing your code and reprinting it with its own rules. You can customize Prettier's rules in the `.prettierrc.json` file.

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
