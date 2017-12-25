(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["i18ns_pl_mock"] = factory();
	else
		root["i18ns_pl_mock"] = factory();
})(this, function() {
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.genStrFromTplAndVars = undefined;

	var _i18ns_pl_mock = __webpack_require__(1);

	var _i18ns_pl_mock2 = _interopRequireDefault(_i18ns_pl_mock);

	var _helpers = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _i18ns_pl_mock2.default;
	exports.genStrFromTplAndVars = _helpers.genStrFromTplAndVars;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _pluralsCldr = __webpack_require__(2);

	var _pluralsCldr2 = _interopRequireDefault(_pluralsCldr);

	var _ruRU = __webpack_require__(3);

	var _enGB = __webpack_require__(4);

	var _helpers = __webpack_require__(5);

	var _Constants = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @type {{debug: boolean, langtag: string, isPlural: undefined, count: number, countType: string}}
	                                                                                                                                                           */


	var InitOpts = {
	  debug: false,
	  langtag: 'ru-RU',
	  isPlural: undefined, //true, если хотим получить множественное число в именительном падеже, например, - "Проекты" (count тогда вне зависимости от его указания НЕ ПРИНИМАЕТСЯ ВО ВНИМАНИЕ).
	  count: 1,
	  countType: 'cardinal' // Ещё возможный вариант - ordinal})
	};

	/**
	 * Класс API-заглушка от недописанной мною библиотечки i18ns_pl. Он работает упрощённо, воспроизводя по мере возможности API i18ns_pl.
	 * @todo /1/ Нужно сделать функцию перевода шаблона (но не шаблонной строки ``), берующую то как выделяются переменные (<% %> или ${} и т.п.; ${} - по умолчанию) из opts. При этом значения в шаблон не подставляются
	 */

	var I18n = function () {
	  /**
	   * Конструктор
	   * @param {Object} params - Опции. Данные опции перетирают опции, установленные по умолчанию @see {@link InitOpts}
	   */
	  function I18n(params) {
	    _classCallCheck(this, I18n);

	    //Непубличные свойства
	    this._opts = Object.assign({}, InitOpts, params);
	    this._dictionaries = { 'ru-RU': _ruRU.ru_RU, 'en-GB': _enGB.en_GB };
	  }

	  /**
	   * Установка опций
	   * @param params
	   * @returns {I18n}
	   */


	  I18n.prototype.setOpts = function setOpts(params) {
	    Object.assign(this._opts, params);return this;
	  };
	  //Принимает или объект с параметрами или одну строку (key) или две строки (key, count в виде числа или в виде count в виде строки 'plural'). Возвращает перевод
	  //@todo Очень очень отдалённое %Стиль кода% Вроде бы как count используется только для количественного (т.е. цифра), потому isPlural и выделен отдельно... А на входе мы допускаем такое смешение для удобства использования api. Отсюда при передаче объекта вместо строки, люди могут начать путаться и писать в count 'plural' вместо указания isPlural=true. Или ничего с этим не делать?

	  /**
	   * Внимание! Данного метода нет в i18ns_pl
	   * @param dictionariesWithKeys
	   * @returns {I18n}
	   */


	  I18n.prototype.setDictionaries = function setDictionaries(dictionariesWithKeys) {
	    Object.assign(this._dictionaries, dictionariesWithKeys);return this;
	  };

	  /**
	   * Собственно, метод, выполняющий перевод
	   * @param firstParam
	   * @param sendedCount
	   * @returns {*}
	   */


	  I18n.prototype.t = function t(firstParam, sendedCount) {
	    //--->Обрабатываем входные параметры функции. В частности _argsToParams(firstParam, sendedCount) приводит входные параметры к виду объекта (см. комментарий к данной функции)
	    var _Object$assign = Object.assign({}, this._opts, _argsToParams(firstParam, sendedCount)),
	        key = _Object$assign.key,
	        langtag = _Object$assign.langtag,
	        isPlural = _Object$assign.isPlural,
	        count = _Object$assign.count,
	        countType = _Object$assign.countType; //Получили все опции, если их не было, взяли дефолтовские
	    //--->Окончили обрабатывать входные параметры функции


	    var translateResult = void 0;
	    try {
	      //---> Работа с _dictionaries
	      var keyNode = this._dictionaries[langtag][key];
	      translateResult = 'string' == typeof keyNode ? keyNode : undefined == isPlural ? keyNode[_plural({ primLangtag: langtag.split('-')[0], count: count, countType: countType })] : keyNode.hasOwnProperty('plural') ? // т.е. нужно множественное число в именительном падеже, например, - "Проекты". Но если оно совпадает по форме с формой other, то ищем там
	      keyNode.plural : keyNode.other;
	      //---> Окончили работу с _dictionaries
	      if (undefined != translateResult) {
	        //Перевод найден
	        return translateResult;
	      } else {
	        //Перевод не найден
	        if (this._opts.debug) console.warn('Warning! Translation not found! \nStart parameters: ' + JSON.stringify({ key: key, langtag: langtag, isPlural: isPlural, count: count, countType: countType }, null, '\t'));
	      }
	    } catch (err) {
	      if (this._opts.debug) console.warn('Не загружен такой языковой файл ', langtag, ' или в файле не найден ключ ', key);
	    }
	    return key; // Если не нашли перевод (даже с поиском по фаллбакам), - возвращаем key
	  };

	  /**
	   * Метод-функция шаблонизации для перевода шаблонных строк.
	   * Нужна, поскольку до подстановки значений в строку она не может выступать ключом.
	   * А после подстановки - в зависимости от значений будут разные ключи.
	   * По-другому, шаблонную строку вроде бы как особо никак и не обработать
	   * Примечание - Вроде бы как указание множественного или немножественного числа здесь не актуально, поэтому приём аналогичных параметров
	   * @example
	   * const id = 100;
	   * console.log(tTplStr`${id} is cool`); // '100 - это круто'
	   * @todo /1/ Избавляется от названий переменных, т.е. в шаблоне их можно переименовывать, но при этом теряется возможность их переставлять при переводе. Оставить ли так? Или не избавляться от названий переменных (избавиться придётся, т.к. js вроде бы не передаёт названия переменных)? Можно избавиться от названий переменных, если указывать в переводе вместо ${.} номер индекса в массиве значений (хэш при этом может остаться тот же самый). Например, ${1} - тогда можно будет менять местами переменные в строке-оригинале и в переводе
	   * @param strings - стандартные параметры функции шаблонизации
	   * @param values - стандартные параметры функции шаблонизации
	   * @returns {string}
	   */


	  I18n.prototype.tTplStr = function tTplStr(strings) {
	    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      values[_key - 1] = arguments[_key];
	    }

	    // Даже если (genKeyFromTplStr(strings)===this.t(genKeyFromTplStr(strings))),
	    // т.е. перевод не нашёлся.
	    // чтобы вернуть изначальную строку, алгоритм все равно нужно запустить
	    var translateArr = this.t((0, _helpers.genKeyFromTplStr)(strings)).split(_Constants.TplStrValuesReplacer);
	    var translateResult = '';
	    translateArr.forEach(function (el, index) {
	      if (el) translateResult += el;
	      if (values[index]) translateResult += values[index];
	    });
	    return translateResult;
	  };

	  /**
	   * Фабрика по созданию функций перевода t() с предустановленными оциями.
	   * При этом, данные функции также могут принять опции объектом, а не только key в виде строки. За это отвечает _argsToParams(firstParam, sendedCount)
	   * @param params
	   * @returns {function(*=, *=): *}
	   */


	  I18n.prototype.createTWithParams = function createTWithParams(params) {
	    var _this = this;

	    return function (firstParam, sendedCount) {
	      return _this.t(Object.assign({}, params, _argsToParams(firstParam, sendedCount)));
	    };
	  };

	  /**
	   * @todo /6/API/ Возможно, нужно смотреть состав параметров и если параметр объект (или пусть он первым будет? или пусть поименованным будет), - то воспринимать его как добавку к params (сейчас мы всё воспринимаем как добавку)
	   * @param params
	   * @returns {function(*, *=): *}
	   */


	  I18n.prototype.createTplTWithParams = function createTplTWithParams(params) {
	    var _this2 = this;

	    //Фабрика по созданию функций перевода t() с предустановленными оциями. При этом создаются функции ШАБЛОНИЗАЦИИ.
	    return function (strings, values) {
	      return _this2.t(Object.assign({}, params, { key: strings[0] }, undefined == values ? {} : values));
	    };
	  };

	  return I18n;
	}();

	module.exports = I18n;

	/**
	 * ВНИМАНИЕ! Данная функция полностью идентична ей же в i18ns_pl.
	 * @param primLangtag
	 * @param count
	 * @param countType
	 * @returns {*}
	 * @private
	 */
	function _plural(_ref) {
	  var primLangtag = _ref.primLangtag,
	      count = _ref.count,
	      countType = _ref.countType;

	  if ('ordinal' == countType) {
	    return _pluralsCldr2.default.ordinal(primLangtag, count);
	  } else {
	    return (0, _pluralsCldr2.default)(primLangtag, count); //Для cardinal
	  }
	}

	/**
	 * Обрабатываем входные параметры функции t() и её модификаций
	 * Приводит входные параметры (если это один или два строковых параметра) к виду объекта соответственно { key } или { key, count } или { key, isPlural }.
	 * А если сразу был объект, то возвращает его
	 * ВНИМАНИЕ! Данная функция полностью идентична ей же в i18ns_pl.
	 * @param firstParam
	 * @param sendedCount
	 * @returns {*}
	 * @private
	 */
	function _argsToParams(firstParam, sendedCount) {
	  if ('string' == typeof firstParam) {
	    //Это если строку посылаем или строку и число
	    if (undefined == sendedCount) {
	      return { key: firstParam };
	    } else {
	      if ('string' == typeof sendedCount) {
	        //необходимость в 'singular' пока в программе вроде бы не используется (берётся вид множественного числа 'one', он же, кстати, стоит по умолчанию)
	        return { key: firstParam, isPlural: 'plural' == sendedCount ? true : undefined };
	      } else {
	        return { key: firstParam, count: sendedCount };
	      }
	    }
	  }
	  return firstParam; //Если это объект, - его и высылаем
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*
	 * Plural functions support (cardinal & ordinal forms)
	 *
	 * Autogenerated from CLDR:
	 *
	 *   Version:   30.0.2
	 *   $Revision: 12805 $
	 */

	'use strict';


	// pluralizers cache
	var s = {};

	function normalize(loc) {
	  var l;
	  if (s[loc]) { return loc; }
	  l = loc.toLowerCase().replace('_', '-');
	  if (s[l]) { return l; }
	  l = l.split('-')[0];
	  if (s[l]) { return l; }
	  return null;
	}

	function forms(loc) {
	  var l = normalize(loc);
	  return s[l] ? s[l].c : null;
	}

	function indexOf(loc, value) {
	  var l = normalize(loc);
	  if (!l) {
	    return -1;
	  }

	  if (!s[l].cFn) {
	    return 0;
	  }

	  var sval  = String(value),
	      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
	      v = f.length,
	      n = +value,
	      i = +(sval.split('.')[0]),
	      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

	  return s[l].cFn(n, i, v, +f, t);
	}

	function plural(loc, value) {
	  var l = normalize(loc);
	  if (!l) {
	    return null;
	  }
	  return s[l].c[indexOf(l, value)];
	}


	function o_forms(loc) {
	  var l = normalize(loc);
	  return s[l] ? s[l].o : null;
	}

	function o_indexOf(loc, value) {
	  var l = normalize(loc);
	  if (!l) {
	    return -1;
	  }

	  if (!s[l].oFn) {
	    return 0;
	  }

	  var sval  = String(value),
	      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
	      v = f.length,
	      n = +value,
	      i = +(sval.split('.')[0]),
	      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

	  return s[l].oFn(n, i, v, +f, t);
	}

	function ordinal(loc, value) {
	  var l = normalize(loc);
	  if (!s[l]) {
	    return null;
	  }
	  return s[l].o[o_indexOf(l, value)];
	}

	module.exports                  = plural;
	module.exports.indexOf          = indexOf;
	module.exports.forms            = forms;
	module.exports.ordinal          = ordinal;
	module.exports.ordinal.indexOf  = o_indexOf;
	module.exports.ordinal.forms    = o_forms;


	////////////////////////////////////////////////////////////////////////////////

	var FORMS = [ 'zero', 'one', 'two', 'few', 'many', 'other' ];

	function unpack(i) { return FORMS[i]; }

	// adds given `rule` pluralizer for given `locales` into `storage`
	function add(locales, rule) {
	  var i;

	  rule.c = rule.c ? rule.c.map(unpack) : [ 'other' ];
	  rule.o = rule.o ? rule.o.map(unpack) : [ 'other' ];

	  for (i = 0; i < locales.length; i++) {
	    s[locales[i]] = rule;
	  }
	}

	function B(x, y, val) { return x <= val && val <= y && val % 1 === 0; }
	function IN(set, val) { return set.indexOf(val) >= 0; }


	add([ 'af', 'asa', 'bem', 'bez', 'bg', 'brx', 'ce', 'cgg', 'chr', 'ckb', 'dv', 'ee', 'el', 'eo', 'es', 'eu', 'fo', 'fur', 'gsw', 'ha', 'haw', 'jgo', 'jmc', 'kaj', 'kcg', 'kkj', 'kl', 'ks', 'ksb', 'ku', 'ky', 'lb', 'lg', 'mas', 'mgo', 'ml', 'mn', 'nah', 'nb', 'nd', 'nn', 'nnh', 'no', 'nr', 'ny', 'nyn', 'om', 'or', 'os', 'pap', 'ps', 'rm', 'rof', 'rwk', 'saq', 'sdh', 'seh', 'sn', 'so', 'ss', 'ssy', 'st', 'syr', 'ta', 'te', 'teo', 'tig', 'tk', 'tn', 'tr', 'ts', 'ug', 'uz', 've', 'vo', 'vun', 'wae', 'xh', 'xog' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'ak', 'bh', 'guw', 'ln', 'mg', 'nso', 'pa', 'ti', 'wa' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return B(0, 1, n) ? 0 : 1;
	  }
	});

	add([ 'am', 'fa', 'kn', 'zu' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return i === 0 || n === 1 ? 0 : 1;
	  }
	});

	add([ 'ar', 'ars' ], {
	  c: [ 0, 1, 2, 3, 4, 5 ],
	  cFn: function (n) {
	    var n100 = n % 100;
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : B(3, 10, n100) ? 3 : B(11, 99, n100) ? 4 : 5;
	  }
	});

	add([ 'as', 'bn' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return i === 0 || n === 1 ? 0 : 1;
	  },
	  o: [ 1, 2, 3, 4, 5 ],
	  oFn: function (n) {
	    return IN([ 1, 5, 7, 8, 9, 10 ], n) ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
	  }
	});

	add([ 'ast', 'de', 'et', 'fi', 'fy', 'gl', 'ji', 'nl', 'sw', 'ur', 'yi' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : 1;
	  }
	});

	add([ 'az' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 1, 3, 4, 5 ],
	  oFn: function (n, i) {
	    var i10 = i % 10, i100 = i % 100, i1000 = i % 1000;
	    return IN([ 1, 2, 5, 7, 8 ], i10) || IN([ 20, 50, 70, 80 ], i100) ? 0 : IN([ 3, 4 ], i10) || IN([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i1000) ? 1 : i === 0 || i10 === 6 || IN([ 40, 60, 90 ], i100) ? 2 : 3;
	  }
	});

	add([ 'be' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return n10 === 1 && n100 !== 11 ? 0 : B(2, 4, n10) && !B(12, 14, n100) ? 1 : n10 === 0 || B(5, 9, n10) || B(11, 14, n100) ? 2 : 3;
	  },
	  o: [ 3, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return IN([ 2, 3 ], n10) && !IN([ 12, 13 ], n100) ? 0 : 1;
	  }
	});

	add([ 'bm', 'bo', 'dz', 'id', 'ig', 'ii', 'in', 'ja', 'jbo', 'jv', 'jw', 'kde', 'kea', 'km', 'ko', 'lkt', 'my', 'nqo', 'root', 'sah', 'ses', 'sg', 'th', 'to', 'wo', 'yo', 'yue', 'zh' ], {
	});

	add([ 'br' ], {
	  c: [ 1, 2, 3, 4, 5 ],
	  cFn: function (n) {
	    var n10 = n % 10, n100 = n % 100, n1000000 = n % 1000000;
	    return n10 === 1 && !IN([ 11, 71, 91 ], n100) ? 0 : n10 === 2 && !IN([ 12, 72, 92 ], n100) ? 1 : (B(3, 4, n10) || n10 === 9) && (!B(10, 19, n100) && !B(70, 79, n100) && !B(90, 99, n100)) ? 2 : n !== 0 && n1000000 === 0 ? 3 : 4;
	  }
	});

	add([ 'bs', 'hr', 'sh', 'sr' ], {
	  c: [ 1, 3, 5 ],
	  cFn: function (n, i, v, f) {
	    var i10 = i % 10, i100 = i % 100, f10 = f % 10, f100 = f % 100;
	    return v === 0 && i10 === 1 && i100 !== 11 || f10 === 1 && f100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) || B(2, 4, f10) && !B(12, 14, f100) ? 1 : 2;
	  }
	});

	add([ 'ca' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : 1;
	  },
	  o: [ 1, 2, 3, 5 ],
	  oFn: function (n) {
	    return IN([ 1, 3 ], n) ? 0 : n === 2 ? 1 : n === 4 ? 2 : 3;
	  }
	});

	add([ 'cs', 'sk' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : B(2, 4, i) && v === 0 ? 1 : v !== 0 ? 2 : 3;
	  }
	});

	add([ 'cy' ], {
	  c: [ 0, 1, 2, 3, 4, 5 ],
	  cFn: function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : n === 6 ? 4 : 5;
	  },
	  o: [ 0, 1, 2, 3, 4, 5 ],
	  oFn: function (n) {
	    return IN([ 0, 7, 8, 9 ], n) ? 0 : n === 1 ? 1 : n === 2 ? 2 : IN([ 3, 4 ], n) ? 3 : IN([ 5, 6 ], n) ? 4 : 5;
	  }
	});

	add([ 'da' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v, f, t) {
	    return n === 1 || t !== 0 && IN([ 0, 1 ], i) ? 0 : 1;
	  }
	});

	add([ 'dsb', 'hsb' ], {
	  c: [ 1, 2, 3, 5 ],
	  cFn: function (n, i, v, f) {
	    var i100 = i % 100, f100 = f % 100;
	    return v === 0 && i100 === 1 || f100 === 1 ? 0 : v === 0 && i100 === 2 || f100 === 2 ? 1 : v === 0 && B(3, 4, i100) || B(3, 4, f100) ? 2 : 3;
	  }
	});

	add([ 'en' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : 1;
	  },
	  o: [ 1, 2, 3, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return n10 === 1 && n100 !== 11 ? 0 : n10 === 2 && n100 !== 12 ? 1 : n10 === 3 && n100 !== 13 ? 2 : 3;
	  }
	});

	add([ 'ff', 'kab' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return IN([ 0, 1 ], i) ? 0 : 1;
	  }
	});

	add([ 'fil', 'tl' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v, f) {
	    var i10 = i % 10, f10 = f % 10;
	    return v === 0 && IN([ 1, 2, 3 ], i) || v === 0 && !IN([ 4, 6, 9 ], i10) || v !== 0 && !IN([ 4, 6, 9 ], f10) ? 0 : 1;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'fr', 'hy' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return IN([ 0, 1 ], i) ? 0 : 1;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'ga' ], {
	  c: [ 1, 2, 3, 4, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : n === 2 ? 1 : B(3, 6, n) ? 2 : B(7, 10, n) ? 3 : 4;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'gd' ], {
	  c: [ 1, 2, 3, 5 ],
	  cFn: function (n) {
	    return IN([ 1, 11 ], n) ? 0 : IN([ 2, 12 ], n) ? 1 : (B(3, 10, n) || B(13, 19, n)) ? 2 : 3;
	  }
	});

	add([ 'gu', 'hi' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return i === 0 || n === 1 ? 0 : 1;
	  },
	  o: [ 1, 2, 3, 4, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
	  }
	});

	add([ 'gv' ], {
	  c: [ 1, 2, 3, 4, 5 ],
	  cFn: function (n, i, v) {
	    var i10 = i % 10, i100 = i % 100;
	    return v === 0 && i10 === 1 ? 0 : v === 0 && i10 === 2 ? 1 : v === 0 && IN([ 0, 20, 40, 60, 80 ], i100) ? 2 : v !== 0 ? 3 : 4;
	  }
	});

	add([ 'he', 'iw' ], {
	  c: [ 1, 2, 4, 5 ],
	  cFn: function (n, i, v) {
	    var n10 = n % 10;
	    return i === 1 && v === 0 ? 0 : i === 2 && v === 0 ? 1 : v === 0 && !B(0, 10, n) && n10 === 0 ? 2 : 3;
	  }
	});

	add([ 'hu' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return IN([ 1, 5 ], n) ? 0 : 1;
	  }
	});

	add([ 'is' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v, f, t) {
	    var i10 = i % 10, i100 = i % 100;
	    return t === 0 && i10 === 1 && i100 !== 11 || t !== 0 ? 0 : 1;
	  }
	});

	add([ 'it' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : 1;
	  },
	  o: [ 4, 5 ],
	  oFn: function (n) {
	    return IN([ 11, 8, 80, 800 ], n) ? 0 : 1;
	  }
	});

	add([ 'iu', 'kw', 'naq', 'se', 'sma', 'smi', 'smj', 'smn', 'sms' ], {
	  c: [ 1, 2, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : n === 2 ? 1 : 2;
	  }
	});

	add([ 'ka' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 1, 4, 5 ],
	  oFn: function (n, i) {
	    var i100 = i % 100;
	    return i === 1 ? 0 : i === 0 || (B(2, 20, i100) || i100 === 40 || i100 === 60 || i100 === 80) ? 1 : 2;
	  }
	});

	add([ 'kk' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 4, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10;
	    return n10 === 6 || n10 === 9 || n10 === 0 && n !== 0 ? 0 : 1;
	  }
	});

	add([ 'ksh' ], {
	  c: [ 0, 1, 5 ],
	  cFn: function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : 2;
	  }
	});

	add([ 'lag' ], {
	  c: [ 0, 1, 5 ],
	  cFn: function (n, i) {
	    return n === 0 ? 0 : IN([ 0, 1 ], i) && n !== 0 ? 1 : 2;
	  }
	});

	add([ 'lo', 'ms', 'vi' ], {
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'lt' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n, i, v, f) {
	    var n10 = n % 10, n100 = n % 100;
	    return n10 === 1 && !B(11, 19, n100) ? 0 : B(2, 9, n10) && !B(11, 19, n100) ? 1 : f !== 0 ? 2 : 3;
	  }
	});

	add([ 'lv', 'prg' ], {
	  c: [ 0, 1, 5 ],
	  cFn: function (n, i, v, f) {
	    var n10 = n % 10, n100 = n % 100, f100 = f % 100, f10 = f % 10;
	    return n10 === 0 || B(11, 19, n100) || v === 2 && B(11, 19, f100) ? 0 : n10 === 1 && n100 !== 11 || v === 2 && f10 === 1 && f100 !== 11 || v !== 2 && f10 === 1 ? 1 : 2;
	  }
	});

	add([ 'mk' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v, f) {
	    var i10 = i % 10, f10 = f % 10;
	    return v === 0 && i10 === 1 || f10 === 1 ? 0 : 1;
	  },
	  o: [ 1, 2, 4, 5 ],
	  oFn: function (n, i) {
	    var i10 = i % 10, i100 = i % 100;
	    return i10 === 1 && i100 !== 11 ? 0 : i10 === 2 && i100 !== 12 ? 1 : IN([ 7, 8 ], i10) && !IN([ 17, 18 ], i100) ? 2 : 3;
	  }
	});

	add([ 'mo', 'ro' ], {
	  c: [ 1, 3, 5 ],
	  cFn: function (n, i, v) {
	    var n100 = n % 100;
	    return i === 1 && v === 0 ? 0 : v !== 0 || n === 0 || n !== 1 && B(1, 19, n100) ? 1 : 2;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : 1;
	  }
	});

	add([ 'mr' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i) {
	    return i === 0 || n === 1 ? 0 : 1;
	  },
	  o: [ 1, 2, 3, 5 ],
	  oFn: function (n) {
	    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : 3;
	  }
	});

	add([ 'mt' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n) {
	    var n100 = n % 100;
	    return n === 1 ? 0 : n === 0 || B(2, 10, n100) ? 1 : B(11, 19, n100) ? 2 : 3;
	  }
	});

	add([ 'ne' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    return B(1, 4, n) ? 0 : 1;
	  }
	});

	add([ 'pl' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n, i, v) {
	    var i10 = i % 10, i100 = i % 100;
	    return i === 1 && v === 0 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i !== 1 && B(0, 1, i10) || v === 0 && B(5, 9, i10) || v === 0 && B(12, 14, i100) ? 2 : 3;
	  }
	});

	add([ 'pt' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return B(0, 2, n) && n !== 2 ? 0 : 1;
	  }
	});

	add([ 'pt-pt' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return n === 1 && v === 0 ? 0 : 1;
	  }
	});

	add([ 'ru' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n, i, v) {
	    var i10 = i % 10, i100 = i % 100;
	    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
	  }
	});

	add([ 'shi' ], {
	  c: [ 1, 3, 5 ],
	  cFn: function (n, i) {
	    return i === 0 || n === 1 ? 0 : B(2, 10, n) ? 1 : 2;
	  }
	});

	add([ 'si' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v, f) {
	    return IN([ 0, 1 ], n) || i === 0 && f === 1 ? 0 : 1;
	  }
	});

	add([ 'sl' ], {
	  c: [ 1, 2, 3, 5 ],
	  cFn: function (n, i, v) {
	    var i100 = i % 100;
	    return v === 0 && i100 === 1 ? 0 : v === 0 && i100 === 2 ? 1 : v === 0 && B(3, 4, i100) || v !== 0 ? 2 : 3;
	  }
	});

	add([ 'sq' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return n === 1 ? 0 : 1;
	  },
	  o: [ 1, 4, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return n === 1 ? 0 : n10 === 4 && n100 !== 14 ? 1 : 2;
	  }
	});

	add([ 'sv' ], {
	  c: [ 1, 5 ],
	  cFn: function (n, i, v) {
	    return i === 1 && v === 0 ? 0 : 1;
	  },
	  o: [ 1, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return IN([ 1, 2 ], n10) && !IN([ 11, 12 ], n100) ? 0 : 1;
	  }
	});

	add([ 'tzm' ], {
	  c: [ 1, 5 ],
	  cFn: function (n) {
	    return B(0, 1, n) || B(11, 99, n) ? 0 : 1;
	  }
	});

	add([ 'uk' ], {
	  c: [ 1, 3, 4, 5 ],
	  cFn: function (n, i, v) {
	    var i10 = i % 10, i100 = i % 100;
	    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
	  },
	  o: [ 3, 5 ],
	  oFn: function (n) {
	    var n10 = n % 10, n100 = n % 100;
	    return n10 === 3 && n100 !== 13 ? 0 : 1;
	  }
	});

	////////////////////////////////////////////////////////////////////////////////


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var ru_RU = exports.ru_RU = {
	  "Signin": "Войти",
	  "Signout": "Выйти",
	  "Project": {
	    "plural": "Проекты",
	    "one": "Проект",
	    "few": "Проекта",
	    "many": "Проектов",
	    "other": "Проекта"
	  },
	  "Worker": {
	    "plural": "Работники",
	    "one": "Работник",
	    "few": "Работника",
	    "many": "Работников",
	    "other": "Работника"
	  },
	  "WorkerType": {
	    "plural": "Типы работников",
	    "one": "Тип работника"
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var en_GB = exports.en_GB = {
	  "Signin": "Войти",
	  "Signout": "Выйти",
	  "Project": {
	    "plural": "Проекты",
	    "one": "Проект",
	    "few": "Проекта",
	    "many": "Проектов",
	    "other": "Проекта"
	  },
	  "Worker": {
	    "plural": "Работники",
	    "one": "Работник",
	    "few": "Работника",
	    "many": "Работников",
	    "other": "Работника"
	  },
	  "WorkerType": {
	    "plural": "Типы работников",
	    "one": "Тип работника"
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.genKeyFromTplStr = genKeyFromTplStr;
	exports.genStrFromTplAndVars = genStrFromTplAndVars;

	var _Constants = __webpack_require__(6);

	var DefaultTplVariableWithBordersReplacer = _Constants.DefaultTplVariableLeftBorder + _Constants.DefaultTplStrValuesReplacer + _Constants.DefaultTplVariableRightBorder;

	/**
	 * @todo /1/ То ли эта функция не доделана, то ли не знаю что... Она же УЖЕ используется в I18n. Для чего?
	 * Функция шаблонизации для генерации key для шаблонной строки в файле перевода без названий и значений переменных.
	 * Зачем это нужно? Чтобы программист мог менять названия переменных как хочет, но в файл перевода при этом не лез
	 * @param strings - стандартный параметр функции шаблонизации
	 * @returns {*}
	 */
	/** @module helpers */

	function genKeyFromTplStr(strings) {
	  var TplVariableWithBordersReplacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultTplVariableWithBordersReplacer;

	  return strings.reduce(function (previousValue, currentItem) {
	    return previousValue + TplVariableWithBordersReplacer + currentItem;
	  });
	}

	/* *
	 * @example
	 * // Если заменитель ${.}, то вместо строчки ниже
	 * {'${id} is cool': '${id} крут'}
	 * // нужно будет писать в файле перевода как в key, так и в переводе по данному key строчку ниже
	 * {'${.} is cool': '${.} крут'}
	 *  * @todo /3/ Если TplStrValuesReplacer, TplVariableLeftBorder, TplVariableRightBorder нужно включить в I18n.opts, то genKeyFromTplStr придётся сделать методом класса I18n или что-то в этом роде
	 *  */

	/**
	 * Генерирует строку из шаблона и объекта с переменными
	 * @param messageTpl
	 * @param messageVariables
	 * @returns {string}
	 */
	function genStrFromTplAndVars() {
	  var messageTpl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var messageVariables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var TplVariableLeftBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.DefaultTplVariableLeftBorder;
	  var TplVariableRightBorder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Constants.DefaultTplVariableRightBorder;

	  for (var key in messageVariables) {
	    messageTpl = messageTpl.replace(TplVariableLeftBorder + key + TplVariableRightBorder, messageVariables[key]);
	  }return messageTpl;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/** @module Constants */

	/**
	 * @const
	 * @type {string}
	 */
	var DefaultTplVariableLeftBorder = exports.DefaultTplVariableLeftBorder = '${';
	/**
	 * @const
	 * @type {string}
	 */
	var DefaultTplVariableRightBorder = exports.DefaultTplVariableRightBorder = '}';
	/**
	 * @const
	 * @type {string}
	 */
	var DefaultTplStrValuesReplacer = exports.DefaultTplStrValuesReplacer = '.';

/***/ })
/******/ ])
});
;