(function() {
  "use strict";

  var RequireJsBuilder, fs, path, readFile;

  fs = require('fs');

  path = require('path');

  readFile = function(fileName) {
    return fs.readFileSync(fileName, 'utf-8');
  };

  RequireJsBuilder = (function() {

    function RequireJsBuilder(baseDir, outputFile) {
      this.baseDir = baseDir;
      this.outputFile = outputFile;
      this.files = [];
      if (this.baseDir.charAt(this.baseDir.length - 1) === path.sep) {
        this.baseDir = this.baseDir.substring(0, this.baseDir.length - 1);
      }
      this.readFiles(this.baseDir);
    }

    RequireJsBuilder.prototype.readFiles = function(baseDir) {
      var file, fileList, filePath, _i, _len, _results;
      fileList = fs.readdirSync(baseDir);
      _results = [];
      for (_i = 0, _len = fileList.length; _i < _len; _i++) {
        file = fileList[_i];
        if (fs.statSync(path.join(baseDir, file)).isDirectory()) {
          _results.push(this.readFiles(path.join(baseDir, file)));
        } else {
          filePath = path.join(baseDir, file).replace(this.baseDir + path.sep, '');
          _results.push(this.files.push(filePath));
        }
      }
      return _results;
    };

    RequireJsBuilder.prototype.writeFile = function(fileName) {
      var file, fileHash, newPath, output, _i, _len, _ref;
      fileHash = {};
      _ref = this.files;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        newPath = path.join(path.dirname(file), path.basename(file, '.js'));
        fileHash[path.basename(file, '.js')] = newPath;
      }
      output = {
        baseUrl: this.baseDir + path.sep,
        paths: fileHash
      };
      output = "require(\n" + JSON.stringify(output) + "\n), ['app']);\n";
      return fs.writeFileSync(this.outputFile, output, 'utf-8');
    };

    return RequireJsBuilder;

  })();

  module.exports = {
    RequireJsBuilder: RequireJsBuilder
  };

}).call(this);
