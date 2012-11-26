"use strict"
fs = require 'fs'
path = require 'path'

readFile = (fileName) ->
    fs.readFileSync fileName, 'utf-8'

class RequireJsBuilder
    constructor: (@baseDir, @outputFile) ->
        @files = []
        if @baseDir.charAt(@baseDir.length - 1) == path.sep
            @baseDir = @baseDir.substring(0, @baseDir.length - 1)
        @readFiles @baseDir
        #Iterate over the base dir and get a list of files
        #
    readFiles: (baseDir) ->
        fileList = fs.readdirSync baseDir
        for file in fileList
            if fs.statSync(path.join baseDir, file).isDirectory()
                @readFiles(path.join baseDir, file)
            else
                filePath = path.join(baseDir, file).replace(@baseDir + path.sep, '')
                @files.push filePath

    writeFile: (fileName) ->
        fileHash = {}
        for file in @files
            newPath = path.join path.dirname(file), path.basename(file, '.js')
            fileHash[path.basename file, '.js'] = newPath
        output =
            baseUrl:@baseDir + path.sep
            paths:fileHash
        output = "require(\n" + JSON.stringify(output) + "\n), ['app']);\n"
        fs.writeFileSync @outputFile, output, 'utf-8'

module.exports = {
    RequireJsBuilder
}
