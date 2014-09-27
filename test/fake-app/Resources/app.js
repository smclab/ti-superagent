
var config = require('config');

var win = Ti.UI.createWindow({});

var list = Ti.UI.createScrollView({
  width: Ti.UI.SIZE,
  height: Ti.UI.SIZE,
  layout: 'vertical'
});

var bar = Ti.UI.createProgressBar({
  top: 0,
  right: 0,
  left: 0,
  min: 0,
  max: 1,
  value: 0
});

bar.hide();

win.add(list);
win.add(bar);

var ACTIONS = [
  {
    title: 'Errors Test',
    handle: require('tests/errors')
  },
  {
    title: 'Callback Test',
    handle: require('tests/once')
  },
  {
    title: 'Timeout Test',
    handle: require('tests/timeout')
  },
  {
    title: 'Failure Test',
    handle: require('tests/failure')
  },
  {
    title: 'Stress Test',
    handle: require('tests/stress')
  },
  {
    all: true,
    title: '» All «',
    handle: launchAll
  }
];

var BUTTONS = ACTIONS.map(function (action) {

  action.button = Ti.UI.createButton({
    title: action.title
  });

  action.running = false;

  action.button.addEventListener('click', function () {
    if (action.button.disabled) {
      return;
    }

    var buttons;

    if (action.all) {
      buttons = BUTTONS;
    }
    else {
      buttons = [ action.button ];
    }

    action.running = true;
    buttons.forEach(disableButton);
    action.handle(function (err) {
      action.running = false;
      buttons.forEach(enableButton);
      informUser(action.title, err);
    });
  });

  list.add(action.button);

  return action.button;
});

if (config.AUTO_LAUNCH) {
  launchAll(function (err) {
    informUser("Auto launch", err);
  });
}

function informUser(message, err) {
  if (err) {
    alert(message + ": NOT OK\n" + err);
    throw err;
  }
  else {
    alert(message + ": Done");
  }
}

function launchAll(callback) {
  bar.show();
  bar.value = 0;
  launch(0, function () {
    bar.value = 1;
    bar.hide();
    return callback.apply(this, arguments);
  });
}

function launch(i, callback) {
  bar.value = (1 / (ACTIONS.length - 1)) * i;
  var action = ACTIONS[i];
  if (action && !action.all) action.handle(function (err) {
    if (action.running) callback(new Error("Already running"));
    else if (err) callback(err);
    else setTimeout(function () {
      launch(i + 1, callback)
    }, 200);
  });
  else callback();
}

function enableButton(button) {
  button.enabled = true;
  button.disabled = false;
}

function disableButton(button) {
  button.enabled = false;
  button.disabled = true;
}

win.open();
