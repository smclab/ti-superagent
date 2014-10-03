
exports.HOST = 'http://localhost:3000';

try {
  if (Ti.Platform.osname === 'android') {
    // Genymotion configuration
    exports.HOST = 'http://10.0.3.2:3000';
  }
}
catch (e) {
  //
}
