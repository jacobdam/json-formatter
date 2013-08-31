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

desc('Generate parser');
task('gen-parser', function() {
  var jison = require('jison');
  var parser = new jison.Parser(require('./lib/grammar.js'));
  var parserSource = parser.generate();
  fsutil.mkdir_p('./lib/generated');
  fs.writeFileSync('./lib/generated/parser.js', parserSource);
});

desc('Build');
task('build', ['gen-parser']);

desc('Build web');
task('build-web', ['build'], function() {
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
});

desc('Test');
task('test', ['build'], function () {
  var reporter = require('nodeunit').reporters.default;
  reporter.run(['test']);
});
