"use strict"
fs = require 'fs'

readFile = (fileName) ->
    fs.readFileSync fileName, 'utf-8'

class RequireJsBuilder
    constructor: (baseDir) ->
        #Iterate over the base dir and get a list of files

module.exports = {
    RequireJsBuilder
}
