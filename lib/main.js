const buttons = require('sdk/ui/button/action');
const tabs = require('sdk/tabs');
const Request = require('sdk/request').Request;
const self = require('sdk/self');

const button = buttons.ActionButton({
  id: 'app-link',
  label: 'RESTED',
  icon: {
    '16': './img/favicon/favicon-16x16.png',
    '32': './img/favicon/favicon-32x32.png',
    '64': './img/favicon/favicon-64x64.png'
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open({
    url: 'chrome://rested/content/rested.html',
    inBackground: false
  });
}
