## Concepts of WebGL (also using babel and webpack)
### Babel and Webpack configuration
To install babel, use `yarn add @babel/core @babel/cli @babel/preset-env -D`
To install webpack, use `yarn add webpack webpack-cli -D`
Install babel loader `yarn add babel-loader`
install `yarn add style-loader css loader`
css-loader will interpretate imports inside css files
style-loader will inject the css inside the html

Now just configure the babel.config.json and webpack.config.js the way you want.

To configure the webpack dev server, install it using `yarn add webpack-dev-server -D`
After properly configurating the webpack file, create a script to use easier the dev-server.

### Executing the program
- use `yarn` or `npm install`
- `yarn dev` or `npm dev`
