var tabs = require('sdk/tabs');

require("sdk/ui/button/action").ActionButton({
  id: 'rested-link',
  label: 'RESTED',
  icon: {
    '16': './img/favicon/favicon-16x16.png',
    '32': './img/favicon/favicon-32x32.png',
    '64': './img/favicon/favicon-64x64.png'
  },
  onClick: function handleClick() {
    tabs.open({
      url: 'chrome://rested/content/rested.html',
      inBackground: false
    });
  }
});

