var fs = require('fs');

desc('Executes the application tests. Use test FILE to execute a subset of tests.');
task('build-web', function(file) {
  var browserify = require('browserify');
  var b = browserify();
  b.add('./web/web.js');
  b.bundle().pipe(fs.createWriteStream('./web/json-formatter.js'))
}, { async: true });
