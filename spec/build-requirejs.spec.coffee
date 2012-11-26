build_requirejs = require('../lib/build-requirejs.js')
path = require('path')

describe "RequireJsBuilder", ->
    builder = null
    beforeEach ->
        builder = new build_requirejs.RequireJsBuilder "testLib", "tmp/output.js"
    afterEach ->
        builder = null

    it "should make a builder", ->
        expect(builder).not.toBeNull()

    it "should list the files in the testLib", ->
        expect(builder.files.length).toEqual 16

    it "should write out a file with the filenames", ->
        builder.writeFile()

    it "Shouldn't append a path sep", ->
        expect(builder.baseDir).toEqual "testLib"

    it "Should get rid of the trailing path sep", ->
        builder = new build_requirejs.RequireJsBuilder "testLib#{path.sep}", "tmp/output.js"
        expect(builder.baseDir).toEqual "testLib"
