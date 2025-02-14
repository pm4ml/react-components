# @pm4ml/react-components

A collection of React components for the frontend apps.

<p style="text-align:center;"><img src="./theme.svg"/></p>

To install the module run `yarn add @pm4ml/react-components`.

Documentation is available at [https://github.com/pm4ml/react-components](https://github.com/pm4ml/react-components)

### Development

First install the dependencies with `yarn install`.

It is suggested to configure your editor/IDE to use ESLint plugins so that you'll be able to see warnings and errors while coding.

### Testing

The library uses Jest for testing. Tests should be written in .ts files, post with _.spec_ eg `html.spec.ts`.

Use `yarn test` to launch the test runner.

### Coding standards

The project uses ESLint extending Airbnb, Prettier, Typescript recommended rules.

Use `yarn lint` to run ESLint across the source files.


### Building the library

You can use the command `yarn build` to launch `rollup` locally. 

While this is not a necessary step while developing, it can be useful when you want to test the library locally with `yarn link`.

### Documentation

The project uses Storybook to generate documentation.

Use `yarn storybook` to run storybook on the codebase.






