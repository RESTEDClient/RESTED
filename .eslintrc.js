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
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
