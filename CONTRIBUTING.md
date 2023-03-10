# Contributing to SikhiToTheMax

First of all, thank you for taking the time to contribute!

The following is a set of guidelines for contributing to SikhiToTheMax and its packages, which are hosted in the [Khalis Foundation organization](https://github.com/khalisfoundation) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Recommendation
* Always write code using functional components (hooks based) following latest react standards.
* Refactor existing class-based components to hooks based functional components in typescript.

## Env variables
All the environment variables are documented in the .env.default file. Ask for their values to [gurjit](https://github.com/gurjit03), [amansingh](https://github.com/saintsoldierx).

## Styleguides

### Git Commit Messages

* We are currently following [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/#specification) style
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit description

## JavaScript Styleguide

All JavaScript must adhere to our [ESLint](.eslintrc) and [Prettier](package.json) rules. We recommend using [VSCode](https://code.visualstudio.com/) with [Prettier](https://prettier.io/) [plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installed to avoid linting errors. We anyway lint the code before pushing to repo.

## CSS Styleguide

All CSS must adhere to [Stylelint Config Standard](https://github.com/stylelint/stylelint-config-standard) with properties listed in alphabetical order.

## HTML Styleguide

See [.htmlhintrc](.htmlhintrc) for the HTMLHint rules.
