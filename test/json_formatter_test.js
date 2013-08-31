var jsonFormatter = require('../lib/main.js');

module.exports = {
  testFormatJSON: function(test){
    var input = '{"a":[1,2,null,{}],"b":true}';
    var expectedOutput = [
      '{', '\n',
      '    ', '"a"', ':', ' ', '[', '\n',
      '    ', '    ', '1', ',', '\n',
      '    ', '    ', '2', ',', '\n',
      '    ', '    ', 'null', ',', '\n',
      '    ', '    ', '{', ' ', '}', '\n',
      '    ', ']', ',', '\n',
      '    ', '"b"', ':', ' ', 'true', '\n',
      '}'
    ].join('')
    test.equal(jsonFormatter.formatJSON(input), expectedOutput);
    test.done();
  }
};
