(function() {
  "use strict";

  var RequireJsBuilder, fs, readFile;

  fs = require('fs');

  readFile = function(fileName) {
    return fs.readFileSync(fileName, 'utf-8');
  };

  RequireJsBuilder = (function() {

    function RequireJsBuilder(baseDir) {}

    return RequireJsBuilder;

  })();

  module.exports = {
    RequireJsBuilder: RequireJsBuilder
  };

}).call(this);
