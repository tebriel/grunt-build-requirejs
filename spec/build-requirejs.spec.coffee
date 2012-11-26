build_requirejs = require('../lib/build-requirejs.js')

describe "RequireJsBuilder", ->
    builder = null
    beforeEach ->
        builder = new build_requirejs.RequireJsBuilder
    afterEach ->
        builder = null

    it "should make a builder", ->
        expect(builder).not.toBeNull()
