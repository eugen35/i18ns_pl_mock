/**
 * @type {{debug: boolean, langtag: string, isPlural: undefined, count: number, countType: string}}
 */
import plural from 'plurals-cldr';

import {ru_RU} from '../data/translations/ru-RU.scs';
import {en_GB} from '../data/translations/en-GB.scs';
import {genKeyFromTplStr} from "./helpers.scs";
import {DefaultTplStrValuesReplacer} from "./Constants.scs";

const InitOpts = {
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
export default class I18n {
  /**
   * Конструктор
   * @param {Object} params - Опции. Данные опции перетирают опции, установленные по умолчанию @see {@link InitOpts}
   */
  constructor (params){
    //Непубличные свойства
    this._opts = Object.assign({}, InitOpts, params);
    this._dictionaries = {'ru-RU': ru_RU, 'en-GB': en_GB};
  }

  /**
   * Установка опций
   * @param params
   * @returns {I18n}
   */
  setOpts(params){ Object.assign(this._opts, params); return this;}
  //Принимает или объект с параметрами или одну строку (key) или две строки (key, count в виде числа или в виде count в виде строки 'plural'). Возвращает перевод
  //@todo Очень очень отдалённое %Стиль кода% Вроде бы как count используется только для количественного (т.е. цифра), потому isPlural и выделен отдельно... А на входе мы допускаем такое смешение для удобства использования api. Отсюда при передаче объекта вместо строки, люди могут начать путаться и писать в count 'plural' вместо указания isPlural=true. Или ничего с этим не делать?

  /**
   * Внимание! Данного метода нет в i18ns_pl
   * @param dictionariesWithKeys
   * @returns {I18n}
   */
  setDictionaries(dictionariesWithKeys){ Object.assign(this._dictionaries, dictionariesWithKeys); return this; }

  /**
   * Собственно, метод, выполняющий перевод
   * @param firstParam
   * @param sendedCount
   * @returns {*}
   */
  t (firstParam, sendedCount) {
    //--->Обрабатываем входные параметры функции. В частности _argsToParams(firstParam, sendedCount) приводит входные параметры к виду объекта (см. комментарий к данной функции)
    const { key, langtag, isPlural, count, countType } = Object.assign({}, this._opts, _argsToParams(firstParam, sendedCount)); //Получили все опции, если их не было, взяли дефолтовские
    //--->Окончили обрабатывать входные параметры функции
    let translateResult;
    try {
      //---> Работа с _dictionaries
      const keyNode = this._dictionaries[langtag][key];
      translateResult = 'string' == typeof keyNode ?
        keyNode
        :
        (undefined == isPlural) ?
          keyNode[ _plural({primLangtag: langtag.split('-')[0], count, countType}) ]
          :
          keyNode.hasOwnProperty('plural') ?  // т.е. нужно множественное число в именительном падеже, например, - "Проекты". Но если оно совпадает по форме с формой other, то ищем там
            keyNode.plural
            :
            keyNode.other;
      //---> Окончили работу с _dictionaries
      if ( undefined != translateResult ) { //Перевод найден
        return translateResult;
      } else { //Перевод не найден
        if ( this._opts.debug ) console.warn(`Warning! Translation not found! \nStart parameters: ${JSON.stringify({key, langtag, isPlural, count, countType}, null, '\t')}`);
      }
    } catch(err) {
      if ( this._opts.debug ) console.warn('Не загружен такой языковой файл ', langtag, ' или в файле не найден ключ ', key);
    }
    return key; // Если не нашли перевод (даже с поиском по фаллбакам), - возвращаем key
  }

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
  tTplStr (strings, ...values) {
    // Даже если (genKeyFromTplStr(strings)===this.t(genKeyFromTplStr(strings))),
    // т.е. перевод не нашёлся.
    // чтобы вернуть изначальную строку, алгоритм все равно нужно запустить
    const translateArr = this.t(genKeyFromTplStr(strings)).split(DefaultTplStrValuesReplacer);
    let translateResult='';
    translateArr.forEach((el,index) => {
      if (el) translateResult += el;
      if (values[index]) translateResult+=values[index];
    });
    return translateResult;
  }

  /**
   * Фабрика по созданию функций перевода t() с предустановленными оциями.
   * При этом, данные функции также могут принять опции объектом, а не только key в виде строки. За это отвечает _argsToParams(firstParam, sendedCount)
   * @param params
   * @returns {function(*=, *=): *}
   */
  createTWithParams (params) {
    return (firstParam, sendedCount) => this.t( Object.assign({}, params, _argsToParams(firstParam, sendedCount) ) )
  }

  /**
   * @todo /6/API/ Возможно, нужно смотреть состав параметров и если параметр объект (или пусть он первым будет? или пусть поименованным будет), - то воспринимать его как добавку к params (сейчас мы всё воспринимаем как добавку)
   * @param params
   * @returns {function(*, *=): *}
   */
  createTplTWithParams (params) { //Фабрика по созданию функций перевода t() с предустановленными оциями. При этом создаются функции ШАБЛОНИЗАЦИИ.
    return (strings, values) => this.t( Object.assign(
      {}, params, {key: strings[0]}, (undefined == values ? {} : values)
    ))
  }

}



/**
 * ВНИМАНИЕ! Данная функция полностью идентична ей же в i18ns_pl.
 * @param primLangtag
 * @param count
 * @param countType
 * @returns {*}
 * @private
 */
function _plural({ primLangtag, count, countType }) {
  if ('ordinal' == countType) {
    return plural.ordinal(primLangtag, count)
  } else {
    return plural(primLangtag, count) //Для cardinal
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
function _argsToParams(firstParam, sendedCount){
  if ('string' == typeof firstParam) { //Это если строку посылаем или строку и число
    if (undefined == sendedCount) {
      return { key: firstParam }
    } else {
      if ('string' == typeof sendedCount) {
        //необходимость в 'singular' пока в программе вроде бы не используется (берётся вид множественного числа 'one', он же, кстати, стоит по умолчанию)
        return { key: firstParam, isPlural: 'plural' == sendedCount ? true : undefined }
      } else {
        return { key: firstParam, count: sendedCount }
      }
    }
  }
  return firstParam; //Если это объект, - его и высылаем
}