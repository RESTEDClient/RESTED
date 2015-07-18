const buttons = require('sdk/ui/button/action');
const tabs = require('sdk/tabs');
const Request = require('sdk/request').Request;
const self = require('sdk/self');

const button = buttons.ActionButton({
  id: 'app-link',
  label: 'RESTED',
  icon: {
    '16': './rested-logo.png',
    '32': './rested-logo.png',
    '64': './rested-logo.png'
  },
  onClick: handleClick
});



function handleClick(state) {
  tabs.open({
    url: 'chrome://rested/content/index.html', //self.data.url('index.html'),
    inBackground: false
  });
}
