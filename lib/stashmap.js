/**
 * Stashmap
 * This implementation should run on Node.js as well as in the browser.
 */

/**
 * A very basic Stashmap implementation
 */
var Stashmap = module.exports = function Stashmap(hash){
  if(!(this instanceof Stashmap)){
    return new Stashmap(hash);
  }

  this.wipe();
  this.length = 0;

  // Create a Stashmap from an existing object
  if(typeof hash === 'object' && hash !== null){
    var keys = Object.keys(hash);
    for(var i = 0; i < keys.length; i++){
      this.set(keys[i], hash[keys[i]]);
    }
  }

};

/**
 * Wipe out the map
 */
Stashmap.prototype.wipe = function() {
  this._hash = {};
  this.keys = [];
  this.length = 0;
};

/**
 * Add a key value pair
 *
 * @param {mixed} key
 * @param {mixed} value
 * @return {Stashmap} for chaining
 */
Stashmap.prototype.set = function(key, value){
  if(!this.has(key)){
    this.length++;
    this.keys.push(key);
  }
  this._hash[key] = value;
  return this;
};

/**
 * A synonym for `Stashmap#set`
 *
 * @param {mixed} key
 * @param {mixed} value
 * @return {Stashmap} for chaining
 */
Stashmap.prototype.add = Stashmap.prototype.set;

/**
 * Remove a Stashmap entry with the given key
 *
 * @param {mixed} key
 * @return {Boolean} true if entry was removed, false otherwise
 */
Stashmap.prototype.remove = function(key){
  if(typeof this._hash[key] !== 'undefined'){
    this.length--;
    delete this._hash[key];
    this.keys.splice(this.keys.indexOf(key), 1);
    return true;
  }
  return false;
};

/**
 * Get the value for the given key
 *
 * @param {mixed} key
 * @return {mixed} the value for the key
 */
Stashmap.prototype.get = function(key){
  return this._hash[key];
};

/**
 * Get the value for a given position
 *
 * @param {number} position
 * @return {mixed} the value for the position
 */
Stashmap.prototype.getAt = function(pos){
  return this._hash[this.keys[pos]];
};

/**
 * Check if the given key is available in the Stashmap and return exact boolean
 *
 * @param {mixed} key
 * @return {Boolean} 
 */
Stashmap.prototype.has = function(key){
  return typeof this._hash[key] !== 'undefined';
};

/**
 * Get an array that contains all keys from this map.
 * 
 * @return {Array} A copy of the keys array.
 */
Stashmap.prototype.getKeys = function(){
  return this.keys.slice(0);
};

/**
 * Get an array that contains all values stored by this map.
 * 
 * @return {Array} A new array holding all values stored by this container.
 */
Stashmap.prototype.getValues = function(){
  var result = [];
  
  for(var i = 0; i < this.keys.length; ++i) {
    result.push(this.get(this.keys[i]));
  }
  
  return result;
};

/**
 * Iterate over Stashmap entries, invoking the give function for each entry
 *
 * @param {Function} fn Will get two arguments "key" and "value"
 */
Stashmap.prototype.forEach = function(fn, context){
  for(var i = 0; i < this.keys.length; i++) {
    if(typeof this.keys[i] !== 'undefined'){
      if(fn.call(context, this._hash[this.keys[i]], this.keys[i]) === false){
        break;
      }
    }
  }
};

/**
 * Map values
 *
 * @param {Function} fn Will get two arguments "key" and "value"
 */
Stashmap.prototype.map = function(fn, context){
  var map = [];
  for(var i = 0; i < this.keys.length; i++) {
    if(typeof this.keys[i] !== 'undefined'){
      var result = fn.call(context, this._hash[this.keys[i]], this.keys[i]);
      if(result){
        map.push(result);
      }
    }
  }
  return map;
};

/**
 * Merge the key/values of another instance onto this one
 * 
 * @param {Stashmap} instance Another Stashmap instance to merge with this one
 * @return {Stashmap} This instance for chaining
 */
Stashmap.prototype.merge = function(instance, fn){
  if(typeof fn !== 'function') {
    for(var i = 0; i < instance.keys.length; i++) {
      if(typeof instance.keys[i] !== 'undefined'){
        this.set(instance.keys[i], instance._hash[instance.keys[i]]);
      }
    }
  } else {
    for(var i = 0; i < instance.keys.length; i++) {
      this.set(instance.keys[i], fn(
        this._hash[instance.keys[i]], 
        instance._hash[instance.keys[i]],
        instance.keys[i]
      ));
    }
  }

  return this;
};

/**
 * Get a string representation of the key/value pairs in this map
 */
Stashmap.prototype.toString = function() {
  return 'Stashmap Object (' + this.keys.length + ') [' + this.keys.join(', ') + ']';
};