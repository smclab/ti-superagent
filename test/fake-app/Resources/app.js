var stresstest = require('stresstest');
var timeouttest = require('timeouttest');

var win = Ti.UI.createWindow({});

var list = Ti.UI.createScrollView({
  width: Ti.UI.SIZE,
  height: Ti.UI.SIZE,
  layout: 'vertical'
});

win.add(list);

[
  {
    title: 'Execute Stress Test',
    handle: stresstest
  },
  {
    title: 'Timeout test',
    handle: timeouttest
  }
].forEach(function (action) {
  var button = Ti.UI.createButton({
    title: action.title
  });

  var running = false;

  button.addEventListener('click', function () {
    running = true;
    button.enabled = false;
    button.disabled = true;

    action.handle(function (err) {
      running = false;
      button.enabled = true;
      button.disabled = false;

      if (err) {
        throw err;
      }
      else {
        alert('Done');
      }
    });
  });

  list.add(button);
});

win.open();
