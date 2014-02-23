
var config = require('config');

var win = Ti.UI.createWindow({});

var list = Ti.UI.createScrollView({
  width: Ti.UI.SIZE,
  height: Ti.UI.SIZE,
  layout: 'vertical'
});

win.add(list);

var ACTIONS = [
  {
    title: 'Execute Stress Test',
    handle: require('tests/stress')
  },
  {
    title: 'Timeout test',
    handle: require('tests/timeout')
  },
  {
    title: 'Failure test',
    handle: require('tests/failure')
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
  launch(0, callback);
}

function launch(i, callback) {
  var action = ACTIONS[i];
  if (action && !action.all) action.handle(function (err) {
    if (action.running) callback(new Error("Already running"));
    else if (err) callback(err);
    else launch(i + 1, callback);
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
