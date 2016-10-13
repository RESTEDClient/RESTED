module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb",
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "globals": {
    'ENV': false,
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    /*
     * We use package.json files in component folders to avoid having to name
     * the files `index.js`. eslint reads this file and expects the component's
     * package.json to have the dependencies in it.
     */
    "import/no-extraneous-dependencies": 0,
  }
};
