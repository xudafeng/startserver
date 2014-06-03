"use strict";

var util = require('util');
/**
 * noop
 */

function _noop(){
  var arg = arguments;
  return function(){
    return arg;
  };

};

/**
 * create
 */

function _create(o){
  if (Object.create) {
    return Object.create(o);
  } else {
    var F = function(){};
    F.prototype = o;
    return new F();
  }
};

/**
 * merge
 */

function _merge(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * escape
 */

function _escape(c){
  return String(c)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * md5
 */

function _md5(){

};

/**
 * each
 */

function _each(object, fn) {
  if(!object){
    return {};
  }
  for(var i in object){
    if(object.hasOwnProperty(i)){
      fn.call(this,object[i],i);
    }
  }
  return object;
};

/**
 * augment
 */

function _augment(r,s){
  _each(s,function(v,k){
    r.prototype[k]= v;
  });
};

/**
 * slice
 */

var _slice = Array.prototype.slice;

/**
 * indexOf
 */

function _indexOf(arr, val) {
  if (arr.indexOf) {
    return arr.indexOf(val);
  }
  var i, len = arr.length;
  for (i = 0; i < len; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
};

/**
 * type
 */

function _type(c){
  if (c === null || typeof c === "undefined") {
    return String(c);
  } else {
    return Object.prototype.toString.call(c).replace(/\[object |\]/g, '').toLowerCase();
  }
};

/**
 * single partten
 */

var Util = {
  create: _create,
  merge: _merge,
  noop: _noop,
  escape: _escape,
  md5: _md5,
  each: _each,
  augment: _augment,
  slice: _slice,
  indexOf: _indexOf,
  type: _type
};

_merge(util,Util);

module.exports = util;
