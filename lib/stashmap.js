/**
 * Stashmap
 * This implementation should run on Node.js as well as in the browser.
 */

/**
 * A very basic Map implementation
 */
var Map = module.exports = function(){
  // TODO: Create a Stashmap from an existing object

  this.wipe();
  this.length = 0;
};

/**
 * Wipe out the map
 */
Map.prototype.wipe = function() {
  this.map = {};
  this.keys = [];
  this.length = 0;
};

/**
 * Add a key value pair
 *
 * @param {mixed} key
 * @param {mixed} value
 * @return {Map} for chaining
 */
Map.prototype.set = function(key, value){
  if(!this.has(key)){
    this.length++;
    this.keys.push(key);
  }
  this.map[key] = value;
  return this;
};

/**
 * A synonym for `Stashmap#set`
 *
 * @param {mixed} key
 * @param {mixed} value
 * @return {Map} for chaining
 */
Map.prototype.add = Map.prototype.set;

/**
 * Remove a Map entry with the given key
 *
 * @param {mixed} key
 * @return {Boolean} true if entry was removed, false otherwise
 */
Map.prototype.remove = function(key){
  if(typeof this.map[key] !== 'undefined'){
    this.length--;
    delete this.map[key];
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
Map.prototype.get = function(key){
  return this.map[key];
};

/**
 * Get the value for a given position
 *
 * @param {number} position
 * @return {mixed} the value for the position
 */
Map.prototype.getAt = function(pos){
  return this.map[this.keys[pos]];
};

/**
 * Check if the given key is available in the Map and return exact boolean
 *
 * @param {mixed} key
 * @return {Boolean} 
 */
Map.prototype.has = function(key){
  return typeof this.map[key] !== 'undefined';
};

/**
 * Get an array that contains all keys from this map.
 * 
 * @return {Array} A copy of the keys array.
 */
Map.prototype.getKeys = function(){
  return this.keys.slice(0);
};

/**
 * Get an array that contains all values stored by this map.
 * 
 * @return {Array} A new array holding all values stored by this container.
 */
Map.prototype.getValues = function(){
  var result = [];
  
  for(var i = 0; i < this.keys.length; ++i) {
    result.push(this.get(this.keys[i]));
  }
  
  return result;
};

/**
 * Iterate over Map entries, invoking the give function for each entry
 *
 * @param {Function} fn Will get two arguments "key" and "value"
 */
Map.prototype.forEach = function(fn, context){
  for(var i = 0; i < this.keys.length; i++) {
    if(typeof this.keys[i] !== 'undefined'){
      fn.call(context, this.map[this.keys[i]], this.keys[i]);
    }
  }
};

/**
 * Get a string representation of the key/value pairs in this map
 */
Map.prototype.toString = function() {
  return 'Map Object (' + this.keys.length + ') [' + this.keys.join(', ') + ']';
};