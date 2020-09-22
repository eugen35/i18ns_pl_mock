**i18ns_pl_mock**

# О пакете
Это очень упрощённая версия пакета i18ns_pl от \_meugen\_. Но с некоторыми вставками.
Работает в синхронном режиме.

В данном пакете используется пакет: https://www.npmjs.com/package/plurals-cldr

# Установка
Включите в файл package.json в раздел "dependencies" следующую строчку:
```
"dependencies": {    
    "i18ns_pl_mock": "git+https://github.com/eugen35/i18ns_pl_mock.git"
  }
```
Затем напишите в командной строке: `npm i`

# Пример использования
```
import I18n from 'i18ns_pl_mock';
import {ruRU} from './configs/commercialProposal/ru-RU';

let i18n = new I18n({langtag:'ru-RU'}); //Ставим русский язык по умолчанию
i18n.setDictionaries(ruRU);

console.log(i18n.t('bill')); // напечатает: "счёт"
```
Более подробно - см. папку \__tests__.

См. также раздел "Генерация автодокументации" ниже.

# Немного об опциях t
## isPlural = undefined
//true, если хотим получить множественное число в именительном падеже, например, - "Проекты" (count тогда вне зависимости от его указания НЕ ПРИНИМАЕТСЯ ВО ВНИМАНИЕ).
## count = 1
## countType = 'cardinal'
// Ещё возможный вариант - 'ordinal'

# Создание словаря
## Общие положения
Словарь лучше писать как строгий json-объект. Но для упрощения его импорта можно сделать как константу javascript. 
```
export const ruRU = {"ru-RU" : {  
  "purchased product": "покупное комплектующее изделие",
  "bill": "счёт",
  "cow": {
    "few":"быка",
    "many":"быков"
  },
  "pub": {
    "plural": "бары",
    "one": "бар"
  }
}}
```
## По поводу правил, связанных с выбором множественного числа слова
- http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
- В частности для русского: http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#ru





# todos
/1/ По идее, нужно ещё опцию акроним сделать или отдельным пакетом это сделать
/2/ По идее, нужно переделать функцию i18n.setDictionaries - чтобы порядок добавления пакетов играл роль фаллбэка ТОЖЕ (типа от фалбэк от словаря конфигруации к словарю платформы?)


# Генерация автодокументации
`````npm run doc`````
# Запуск тестов
`````npm run test`````

`````npm run test:watch`````
# Сборка пакета
`````npm run build`````

`````npm run build:watch`````
