chrome.browserAction.onClicked.addListener(function(tab) {
  browser.tabs.create({'url': browser.extension.getURL('data/rested.html')});
});

