/*!
 * js-data-localstorage
 * @version 2.0.0-beta.2 - Homepage <http://www.js-data.io/docs/dslocalstorageadapter>
 * @author Jason Dobry <jason.dobry@gmail.com>
 * @copyright (c) 2014-2015 Jason Dobry 
 * @license MIT <https://github.com/js-data/js-data-localstorage/blob/master/LICENSE>
 * 
 * @overview localStorage adapter for js-data.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data"], factory);
	else if(typeof exports === 'object')
		exports["DSLocalStorageAdapter"] = factory(require("js-data"));
	else
		root["DSLocalStorageAdapter"] = factory(root["JSData"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _JSData = __webpack_require__(1);

	var _JSData2 = _interopRequireWildcard(_JSData);

	var _omit = __webpack_require__(2);

	var _omit2 = _interopRequireWildcard(_omit);

	var _keys = __webpack_require__(3);

	var _keys2 = _interopRequireWildcard(_keys);

	var _guid = __webpack_require__(4);

	var _guid2 = _interopRequireWildcard(_guid);

	var emptyStore = new _JSData2['default'].DS();
	var DSUtils = _JSData2['default'].DSUtils;
	var makePath = DSUtils.makePath;
	var deepMixIn = DSUtils.deepMixIn;
	var toJson = DSUtils.toJson;
	var fromJson = DSUtils.fromJson;
	var forEach = DSUtils.forEach;
	var removeCircular = DSUtils.removeCircular;

	var filter = emptyStore.defaults.defaultFilter;

	var Defaults = function Defaults() {
	  _classCallCheck(this, Defaults);
	};

	Defaults.prototype.basePath = '';

	var DSLocalStorageAdapter = (function () {
	  function DSLocalStorageAdapter(options) {
	    _classCallCheck(this, DSLocalStorageAdapter);

	    options = options || {};
	    this.defaults = new Defaults();
	    deepMixIn(this.defaults, options);
	  }

	  _createClass(DSLocalStorageAdapter, [{
	    key: 'getPath',
	    value: function getPath(resourceConfig, options) {
	      return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.name);
	    }
	  }, {
	    key: 'getIdPath',
	    value: function getIdPath(resourceConfig, options, id) {
	      return makePath(options.basePath || this.defaults.basePath || resourceConfig.basePath, resourceConfig.getEndpoint(id, options), id);
	    }
	  }, {
	    key: 'getIds',
	    value: function getIds(resourceConfig, options) {
	      var ids = undefined;
	      var idsPath = this.getPath(resourceConfig, options);
	      var idsJson = localStorage.getItem(idsPath);
	      if (idsJson) {
	        ids = fromJson(idsJson);
	      } else {
	        localStorage.setItem(idsPath, toJson({}));
	        ids = {};
	      }
	      return ids;
	    }
	  }, {
	    key: 'saveKeys',
	    value: function saveKeys(ids, resourceConfig, options) {
	      localStorage.setItem(this.getPath(resourceConfig, options), toJson(ids));
	    }
	  }, {
	    key: 'ensureId',
	    value: function ensureId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      ids[id] = 1;
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'removeId',
	    value: function removeId(id, resourceConfig, options) {
	      var ids = this.getIds(resourceConfig, options);
	      delete ids[id];
	      this.saveKeys(ids, resourceConfig, options);
	    }
	  }, {
	    key: 'GET',
	    value: function GET(key) {
	      return new DSUtils.Promise(function (resolve) {
	        var item = localStorage.getItem(key);
	        resolve(item ? fromJson(item) : undefined);
	      });
	    }
	  }, {
	    key: 'PUT',
	    value: function PUT(key, value) {
	      var DSLocalStorageAdapter = this;
	      return DSLocalStorageAdapter.GET(key).then(function (item) {
	        if (item) {
	          deepMixIn(item, removeCircular(value));
	        }
	        localStorage.setItem(key, toJson(item || value));
	        return DSLocalStorageAdapter.GET(key);
	      });
	    }
	  }, {
	    key: 'DEL',
	    value: function DEL(key) {
	      return new DSUtils.Promise(function (resolve) {
	        localStorage.removeItem(key);
	        resolve();
	      });
	    }
	  }, {
	    key: 'find',
	    value: function find(resourceConfig, id, options) {
	      return this.GET(this.getIdPath(resourceConfig, options || {}, id)).then(function (item) {
	        return !item ? DSUtils.Promise.reject(new Error('Not Found!')) : item;
	      });
	    }
	  }, {
	    key: 'findAll',
	    value: function findAll(resourceConfig, params, options) {
	      var _this = this;
	      return new DSUtils.Promise(function (resolve) {
	        options = options || {};
	        if (!('allowSimpleWhere' in options)) {
	          options.allowSimpleWhere = true;
	        }
	        var items = [];
	        var ids = _keys2['default'](_this.getIds(resourceConfig, options));
	        forEach(ids, function (id) {
	          var itemJson = localStorage.getItem(_this.getIdPath(resourceConfig, options, id));
	          if (itemJson) {
	            items.push(fromJson(itemJson));
	          }
	        });
	        resolve(filter.call(emptyStore, items, resourceConfig.name, params, options));
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(resourceConfig, attrs, options) {
	      var _this = this;
	      attrs[resourceConfig.idAttribute] = attrs[resourceConfig.idAttribute] || _guid2['default']();
	      options = options || {};
	      return _this.PUT(makePath(_this.getIdPath(resourceConfig, options, attrs[resourceConfig.idAttribute])), _omit2['default'](attrs, resourceConfig.relationFields || [])).then(function (item) {
	        _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	        return item;
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(resourceConfig, id, attrs, options) {
	      var _this = this;
	      options = options || {};
	      return _this.PUT(_this.getIdPath(resourceConfig, options, id), _omit2['default'](attrs, resourceConfig.relationFields || [])).then(function (item) {
	        _this.ensureId(item[resourceConfig.idAttribute], resourceConfig, options);
	        return item;
	      });
	    }
	  }, {
	    key: 'updateAll',
	    value: function updateAll(resourceConfig, attrs, params, options) {
	      var _this = this;
	      return _this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        forEach(items, function (item) {
	          return tasks.push(_this.update(resourceConfig, item[resourceConfig.idAttribute], _omit2['default'](attrs, resourceConfig.relationFields || []), options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(resourceConfig, id, options) {
	      var _this = this;
	      options = options || {};
	      return _this.DEL(_this.getIdPath(resourceConfig, options, id)).then(function () {
	        return _this.removeId(id, resourceConfig.name, options);
	      });
	    }
	  }, {
	    key: 'destroyAll',
	    value: function destroyAll(resourceConfig, params, options) {
	      var _this = this;
	      return _this.findAll(resourceConfig, params, options).then(function (items) {
	        var tasks = [];
	        forEach(items, function (item) {
	          return tasks.push(_this.destroy(resourceConfig, item[resourceConfig.idAttribute], options));
	        });
	        return DSUtils.Promise.all(tasks);
	      });
	    }
	  }]);

	  return DSLocalStorageAdapter;
	})();

	exports['default'] = DSLocalStorageAdapter;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var slice = __webpack_require__(5);
	var contains = __webpack_require__(6);

	    /**
	     * Return a copy of the object, filtered to only contain properties except the blacklisted keys.
	     */
	    function omit(obj, var_keys){
	        var keys = typeof arguments[1] !== 'string'? arguments[1] : slice(arguments, 1),
	            out = {};

	        for (var property in obj) {
	            if (obj.hasOwnProperty(property) && !contains(keys, property)) {
	                out[property] = obj[property];
	            }
	        }
	        return out;
	    }

	    module.exports = omit;




/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var forOwn = __webpack_require__(9);

	    /**
	     * Get object keys
	     */
	     var keys = Object.keys || function (obj) {
	            var keys = [];
	            forOwn(obj, function(val, key){
	                keys.push(key);
	            });
	            return keys;
	        };

	    module.exports = keys;




/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var randHex = __webpack_require__(7);
	var choice = __webpack_require__(8);

	  /**
	   * Returns pseudo-random guid (UUID v4)
	   * IMPORTANT: it's not totally "safe" since randHex/choice uses Math.random
	   * by default and sequences can be predicted in some cases. See the
	   * "random/random" documentation for more info about it and how to replace
	   * the default PRNG.
	   */
	  function guid() {
	    return (
	        randHex(8)+'-'+
	        randHex(4)+'-'+
	        // v4 UUID always contain "4" at this position to specify it was
	        // randomly generated
	        '4' + randHex(3) +'-'+
	        // v4 UUID always contain chars [a,b,8,9] at this position
	        choice(8, 9, 'a', 'b') + randHex(3)+'-'+
	        randHex(12)
	    );
	  }
	  module.exports = guid;



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Create slice of source array or array-like object
	     */
	    function slice(arr, start, end){
	        var len = arr.length;

	        if (start == null) {
	            start = 0;
	        } else if (start < 0) {
	            start = Math.max(len + start, 0);
	        } else {
	            start = Math.min(start, len);
	        }

	        if (end == null) {
	            end = len;
	        } else if (end < 0) {
	            end = Math.max(len + end, 0);
	        } else {
	            end = Math.min(end, len);
	        }

	        var result = [];
	        while (start < end) {
	            result.push(arr[start++]);
	        }

	        return result;
	    }

	    module.exports = slice;




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var indexOf = __webpack_require__(10);

	    /**
	     * If array contains values.
	     */
	    function contains(arr, val) {
	        return indexOf(arr, val) !== -1;
	    }
	    module.exports = contains;



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var choice = __webpack_require__(8);

	    var _chars = '0123456789abcdef'.split('');

	    /**
	     * Returns a random hexadecimal string
	     */
	    function randHex(size){
	        size = size && size > 0? size : 6;
	        var str = '';
	        while (size--) {
	            str += choice(_chars);
	        }
	        return str;
	    }

	    module.exports = randHex;




/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var randInt = __webpack_require__(11);
	var isArray = __webpack_require__(12);

	    /**
	     * Returns a random element from the supplied arguments
	     * or from the array (if single argument is an array).
	     */
	    function choice(items) {
	        var target = (arguments.length === 1 && isArray(items))? items : arguments;
	        return target[ randInt(0, target.length - 1) ];
	    }

	    module.exports = choice;




/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(13);
	var forIn = __webpack_require__(14);

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forOwn(obj, fn, thisObj){
	        forIn(obj, function(val, key){
	            if (hasOwn(obj, key)) {
	                return fn.call(thisObj, obj[key], key, obj);
	            }
	        });
	    }

	    module.exports = forOwn;




/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Array.indexOf
	     */
	    function indexOf(arr, item, fromIndex) {
	        fromIndex = fromIndex || 0;
	        if (arr == null) {
	            return -1;
	        }

	        var len = arr.length,
	            i = fromIndex < 0 ? len + fromIndex : fromIndex;
	        while (i < len) {
	            // we iterate over sparse items since there is no way to make it
	            // work properly on IE 7-8. see #64
	            if (arr[i] === item) {
	                return i;
	            }

	            i++;
	        }

	        return -1;
	    }

	    module.exports = indexOf;



/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var MIN_INT = __webpack_require__(16);
	var MAX_INT = __webpack_require__(15);
	var rand = __webpack_require__(17);

	    /**
	     * Gets random integer inside range or snap to min/max values.
	     */
	    function randInt(min, max){
	        min = min == null? MIN_INT : ~~min;
	        max = max == null? MAX_INT : ~~max;
	        // can't be max + 0.5 otherwise it will round up if `rand`
	        // returns `max` causing it to overflow range.
	        // -0.5 and + 0.49 are required to avoid bias caused by rounding
	        return Math.round( rand(min - 0.5, max + 0.499999999999) );
	    }

	    module.exports = randInt;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isKind = __webpack_require__(18);
	    /**
	     */
	    var isArray = Array.isArray || function (val) {
	        return isKind(val, 'Array');
	    };
	    module.exports = isArray;



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Safer Object.hasOwnProperty
	     */
	     function hasOwn(obj, prop){
	         return Object.prototype.hasOwnProperty.call(obj, prop);
	     }

	     module.exports = hasOwn;




/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = __webpack_require__(13);

	    var _hasDontEnumBug,
	        _dontEnums;

	    function checkDontEnum(){
	        _dontEnums = [
	                'toString',
	                'toLocaleString',
	                'valueOf',
	                'hasOwnProperty',
	                'isPrototypeOf',
	                'propertyIsEnumerable',
	                'constructor'
	            ];

	        _hasDontEnumBug = true;

	        for (var key in {'toString': null}) {
	            _hasDontEnumBug = false;
	        }
	    }

	    /**
	     * Similar to Array/forEach but works over object properties and fixes Don't
	     * Enum bug on IE.
	     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
	     */
	    function forIn(obj, fn, thisObj){
	        var key, i = 0;
	        // no need to check if argument is a real object that way we can use
	        // it for arrays, functions, date, etc.

	        //post-pone check till needed
	        if (_hasDontEnumBug == null) checkDontEnum();

	        for (key in obj) {
	            if (exec(fn, obj, key, thisObj) === false) {
	                break;
	            }
	        }


	        if (_hasDontEnumBug) {
	            var ctor = obj.constructor,
	                isProto = !!ctor && obj === ctor.prototype;

	            while (key = _dontEnums[i++]) {
	                // For constructor, if it is a prototype object the constructor
	                // is always non-enumerable unless defined otherwise (and
	                // enumerated above).  For non-prototype objects, it will have
	                // to be defined on this object, since it cannot be defined on
	                // any prototype objects.
	                //
	                // For other [[DontEnum]] properties, check if the value is
	                // different than Object prototype value.
	                if (
	                    (key !== 'constructor' ||
	                        (!isProto && hasOwn(obj, key))) &&
	                    obj[key] !== Object.prototype[key]
	                ) {
	                    if (exec(fn, obj, key, thisObj) === false) {
	                        break;
	                    }
	                }
	            }
	        }
	    }

	    function exec(fn, obj, key, thisObj){
	        return fn.call(thisObj, obj[key], key, obj);
	    }

	    module.exports = forIn;




/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Maximum 32-bit signed integer value. (2^31 - 1)
	 */

	    module.exports = 2147483647;



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @constant Minimum 32-bit signed integer value (-2^31).
	 */

	    module.exports = -2147483648;



/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var random = __webpack_require__(19);
	var MIN_INT = __webpack_require__(16);
	var MAX_INT = __webpack_require__(15);

	    /**
	     * Returns random number inside range
	     */
	    function rand(min, max){
	        min = min == null? MIN_INT : min;
	        max = max == null? MAX_INT : max;
	        return min + (max - min) * random();
	    }

	    module.exports = rand;



/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var kindOf = __webpack_require__(20);
	    /**
	     * Check if value is from a specific "kind".
	     */
	    function isKind(val, kind){
	        return kindOf(val) === kind;
	    }
	    module.exports = isKind;



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	

	    /**
	     * Just a wrapper to Math.random. No methods inside mout/random should call
	     * Math.random() directly so we can inject the pseudo-random number
	     * generator if needed (ie. in case we need a seeded random or a better
	     * algorithm than the native one)
	     */
	    function random(){
	        return random.get();
	    }

	    // we expose the method so it can be swapped if needed
	    random.get = Math.random;

	    module.exports = random;




/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	

	    var _rKind = /^\[object (.*)\]$/,
	        _toString = Object.prototype.toString,
	        UNDEF;

	    /**
	     * Gets the "kind" of value. (e.g. "String", "Number", etc)
	     */
	    function kindOf(val) {
	        if (val === null) {
	            return 'Null';
	        } else if (val === UNDEF) {
	            return 'Undefined';
	        } else {
	            return _rKind.exec( _toString.call(val) )[1];
	        }
	    }
	    module.exports = kindOf;



/***/ }
/******/ ])
});
;