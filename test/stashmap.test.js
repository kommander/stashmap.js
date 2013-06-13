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

    //
    //
    it('should create a map from an existing complex hash', function(){
      var map = new Stashmap({
        a: { one: 'one' },
        b: { two: 'two' }
      });
      
      var value = map.get('b');
      expect(value).to.be.an('object');
      expect(value).to.have.property('two', 'two');
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
  describe('#map()', function(){
    //
    //
    it('should return an array with mapped values', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 1);
      map.set('d', 2);
      
      var arr = map.map(function(value, key){
        if(value == 1){
          return value;
        }
        return false;
      });

      expect(arr).to.have.property('length', 2);

    });

  });

  //
  //
  describe('#merge()', function(){
    //
    //
    it('should add the key/values of another instance to this one', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 1);
      map.set('d', 2);
      
      var map2 = Stashmap();
      map2.merge(map);

      expect(map2).to.have.property('length', 4);

    });

    //
    //
    it('should merge keys correctly', function(){
      var map = new Stashmap();
      map.set('a', 1);
      map.set('b', 2);
      
      var map2 = Stashmap();
      map2.set('a', 1);
      map2.set('b', 2);
      map2.merge(map);

      expect(map2).to.have.property('length', 2);
      expect(map2.keys).to.have.property('length', 2);
    });

    //
    //
    it('should take a merge function which can return the merge result', function(){
      var map = Stashmap();
      map.set('a', [1]);
      map.set('b', [2]);
      
      var map2 = Stashmap();
      map2.set('a', [2]);
      map2.set('b', [3]);
      
      map.merge(map2, function(left, right) {
        return left.concat(right);
      });

      expect(map).to.have.property('length', 2);
      var val1 = map.get('a');
      expect(val1).to.have.property(0, 1);
      expect(val1).to.have.property(1, 2);
      var val2 = map.get('b');
      expect(val2).to.have.property(0, 2);
      expect(val2).to.have.property(1, 3);
    });

    //
    //
    it('should merge with correct length', function(){
      var map = Stashmap();
      map.set('a', [1]);
      
      var map2 = Stashmap();
      map2.set('b', [2]);
      map2.set('c', [3]);
      
      map.merge(map2);

      expect(map).to.have.property('length', 3);
      
    });

  });

  //
  //
  describe('#forEach()', function(){
    //
    //
    it('should iterate over key/values', function(){
      var map = new Stashmap({
        a: 1,
        b: 2
      });

      var spy = sinon.spy();
      map.forEach(spy);
      
      expect(spy.callCount).to.be(2);
    });

    //
    //
    it('should iterate over key/values from direct object creation', function(){
      var spy = sinon.spy();
      
      var map = new Stashmap({
        a: 1,
        b: 2
      }).forEach(spy);
      
      expect(spy.callCount).to.be(2);
    });

    //
    //
    it('should stop iteration when forEach callback returns false explicitly', function(){
      var spy = sinon.spy();
      
      var map = new Stashmap({
        a: 1,
        b: 2,
        c: 3
      }).forEach(function(value, key){
        if(value > 2) {
          return false;
        }
        spy();
      });
      
      expect(spy.callCount).to.be(2);
    });

  });

});
