/** @module helpers */

import {DefaultTplStrValuesReplacer, DefaultTplVariableLeftBorder, DefaultTplVariableRightBorder} from "./Constants.scs";

const DefaultTplVariableWithBordersReplacer = DefaultTplVariableLeftBorder + DefaultTplStrValuesReplacer + DefaultTplVariableRightBorder;

/**
 * @todo /1/ То ли эта функция не доделана, то ли не знаю что... Она же УЖЕ используется в I18n. Для чего?
 * Функция шаблонизации для генерации key для шаблонной строки в файле перевода без названий и значений переменных.
 * Зачем это нужно? Чтобы программист мог менять названия переменных как хочет, но в файл перевода при этом не лез
 * @param strings - стандартный параметр функции шаблонизации
 * @returns {*}
 */
export function genKeyFromTplStr(strings, TplVariableWithBordersReplacer = DefaultTplVariableWithBordersReplacer){
  return strings.reduce((previousValue, currentItem) => previousValue + TplVariableWithBordersReplacer + currentItem);
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
export function genStrFromTplAndVars(messageTpl = '', messageVariables = {}, TplVariableLeftBorder = DefaultTplVariableLeftBorder, TplVariableRightBorder = DefaultTplVariableRightBorder){
  for (let key in messageVariables) messageTpl = messageTpl.replace(TplVariableLeftBorder+key+TplVariableRightBorder, messageVariables[key]);
  return messageTpl;
}