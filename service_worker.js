// chrome.runtime.onInstalled.addListener(function () {
//   console.log('Autofill Loaded');
// });

chrome.action.onClicked.addListener(function (tab) {
  console.log('Hello from service worker');
  chrome.tabs.query(
    {active: true, windowType: 'normal', currentWindow: true},
    function (d) {
      console.debug(d[0].id);
      chrome.tabs.sendMessage(d[0].id, {message: 'begin_fill'});
    }
  );
});
