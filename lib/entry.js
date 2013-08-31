var jsonParser = require('./parser.js')

var TextOutputter = function() {
  this.indentSize = 4;
  this.buffer = []
}

TextOutputter.prototype.writeIndent = function() {
  for (var i = 0; i < this.indentSize; i++) {
    this.buffer.push(' ');
  }
}

TextOutputter.prototype.writeSpace = function() {
  this.buffer.push(' ');
}

TextOutputter.prototype.writeNewLine = function() {
  this.buffer.push("\n");
}

TextOutputter.prototype.writeString = function(stringValue) {
  this.buffer.push(stringValue);
}

TextOutputter.prototype.writeNumber = function(stringValue) {
  this.buffer.push(stringValue);
}

TextOutputter.prototype.writeBoolean = function(stringValue) {
  this.buffer.push(stringValue);
}

TextOutputter.prototype.writeNull = function() {
  this.buffer.push('null');
}

TextOutputter.prototype.writeSymbol = function(stringSymbol) {
  this.buffer.push(stringSymbol);
}

TextOutputter.prototype.getOutput = function() {
  return this.buffer.join('');
}

var Formatter = function(jsonAst) {
  this.jsonAst = jsonAst;
}
Formatter.prototype.format = function() {
  this.indent = 0;
  this.isNewLine = true;
  this.outputter = new TextOutputter();
  this.formatNode(this.jsonAst);
  return this.outputter.getOutput();
}
Formatter.prototype.formatNode = function(node) {
  switch (node.type) {
    case 'null':
    case 'boolean':
    case 'string':
    case 'number':
      this.writeLiteral(node);
      break;
    case 'object':
      this.formatObject(node);
      break;
    case 'array':
      this.formatArray(node);
  }
}
Formatter.prototype.formatObject = function(node) {
  this.writeSymbol('{');
  if (node.items.length == 0) {
    this.outputter.writeSpace();
  } else {
    this.writeNewLine();
    this.indent++;
    for (var i = 0; i < node.items.length; i++) {
      var item = node.items[i];
      this.formatNode(item.name);
      this.writeSymbol(':');
      this.outputter.writeSpace();
      this.formatNode(item.value);
      if (i < node.items.length - 1) {
        this.writeSymbol(',');  
      }
      this.writeNewLine();
    }
    this.indent--;
  }
  this.writeSymbol('}');
}
Formatter.prototype.formatArray = function(node) {
  this.writeSymbol('[');
  if (node.items.length == 0) {
    this.outputter.writeSpace();
  } else {
    this.writeNewLine();
    this.indent++;
    for (var i = 0; i < node.items.length; i++) {
      var item = node.items[i];
      this.formatNode(item);
      if (i < node.items.length - 1) {
        this.writeSymbol(',');  
      }
      this.writeNewLine();
    }
    this.indent--;
  }
  this.writeSymbol(']');
}

Formatter.prototype.writeNewLine = function() {
  this.outputter.writeNewLine();
  this.isNewLine = true;
}
Formatter.prototype.writeIndentsIfNeeded = function() {
  if (this.isNewLine) {
    this.isNewLine = false;
    for (var i = 0; i < this.indent; i++) {
      this.outputter.writeIndent();
    }
  }
}
Formatter.prototype.writeLiteral = function(node) {
  this.writeIndentsIfNeeded();
  switch (node.type) {
    case 'null':
      this.outputter.writeNull();
      break;
    case 'boolean':
      this.outputter.writeBoolean(node.value);
      break;
    case 'number':
      this.outputter.writeNumber(node.value);
      break;
    case 'string':
      this.outputter.writeString(node.value);
      break;
  }
}

Formatter.prototype.writeSymbol = function(stringSymbol) {
  this.writeIndentsIfNeeded();
  this.outputter.writeSymbol(stringSymbol);
}

exports.formatJSON = function(source) {
  var jsonAst = jsonParser.parse(source);
  var formatter = new Formatter(jsonAst);
  return formatter.format();
}
