var self = require("sdk/self");
const { getMostRecentBrowserWindow } = require('sdk/window/utils');

function main(options, callbacks) {
  var window = getMostRecentBrowserWindow();
  var win = window.open(self.data.url('window.html'), "_blank",
                        "chrome,dialog=no,width=300,height=300,titlebar=no");

  function waitForWin(callback) {
    if (win.wrappedJSObject.communicate) {
      callback(win.wrappedJSObject.communicate);
    } else {
      // There must be a better way to do this...
      window.setTimeout(() => waitForWin(callback), 0);
    }
  }

  waitForWin(communicate => {
    communicate("This is some text from the opener.");
  });
}

exports.main = main;