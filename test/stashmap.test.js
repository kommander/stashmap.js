/**
 * Tests
 */
var expect = require('expect.js');
var sinon = require('sinon');

var Stashmap = require('../');

describe('Stashmap', function(){

  //
  //
  describe('#constructor', function(){
    //
    //
    it('should create a map from an existing hash', function(){
      var map = new Stashmap({
        a: 1,
        b: 2
      });
      
      expect(map.get('b')).to.be(2);
    });

  });

  //
  //
  describe('#length', function(){
    //
    //
    it('should have correct length', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      map.set('d', 4);
      map.remove('c');

      expect(map.length).to.be(3);
    });

  });

  //
  //
  describe('#get()', function(){
    //
    //
    it('should return correct value for key', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      map.set('d', 4);
      map.remove('c');

      expect(map.get('b')).to.be(2);
    });

  });

  //
  //
  describe('#getAt()', function(){
    //
    //
    it('should return correct element', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      map.set('d', 4);
      map.remove('c');

      expect(map.getAt(2)).to.be(4);
    });

  });

  //
  //
  describe('#has()', function(){
    //
    //
    it('should return true/false if a given key exists/not exists in the map', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);
      map.set('d', 4);
      map.remove('c');

      expect(map.has('c')).to.be(false);
      expect(map.has('d')).to.be(true);
    });

  });

  //
  //
  describe('#forEach()', function(){
    //
    //
    it('should iterate over key/values');

  });

});
