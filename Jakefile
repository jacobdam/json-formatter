var fs = require('fs');
var fsutil = require('fsutil');

function emptyFolder(path, excludePattern) {
  var files = fs.readdirSync(path);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (excludePattern && excludePattern.test(file))
      continue;

    var filepath = path + '/' + file;
    fsutil.rm_rf(filepath)
  }
}

desc('Executes the application tests. Use test FILE to execute a subset of tests.');
task('build-web', function() {
  // prepare build web folder
  var buildWebDir = './build/web';
  fsutil.mkdir_p(buildWebDir);
  emptyFolder(buildWebDir, /^\.git$/)

  // build json-formatter.js
  var browserify = require('browserify');
  var b = browserify();
  b.add('./web/web.js');
  b.bundle().pipe(fs.createWriteStream(buildWebDir + '/json-formatter.js'))

  // build html
  fsutil.cp('./web/index.html', buildWebDir + '/index.html');
}, { async: true });
