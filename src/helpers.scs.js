/** @module helpers */

import {TplStrValuesReplacer} from "./Constants.scs";

/**
 * Функция шаблонизации для генерации key для шаблонной строки в файле перевода без названий и значений переменных.
 * @param strings - стандартный параметр функции шаблонизации
 * @returns {*}
 */
export function genKeyFromTplStr(strings){
  return strings.reduce((previousValue, currentItem) => previousValue + TplStrValuesReplacer + currentItem);
}

