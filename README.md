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
// если локаль (словарь) у нас в виде js-константы (см. ниже пример)
import {ruRU} from './configs/commercialProposal/locales/ru/ru-RU';
import {enEN} from './configs/commercialProposal/locales/en/en-EN';

let i18n = new I18n({langtag:'ru-RU'}); //Ставим русский язык по умолчанию
i18n.setDictionaries({'ru-RU': ruRU, 'en-EN': enEN});

console.log(i18n.t('signout')); // напечатает: "выйти"
```
Более подробно - см. папку \__tests__.

См. также раздел "Генерация автодокументации" ниже.

# Немного об опциях i18n.t()
## isPlural = undefined
//true, если хотим получить множественное число в именительном падеже, например, - "Проекты" (count тогда вне зависимости от его указания НЕ ПРИНИМАЕТСЯ ВО ВНИМАНИЕ).
## count = 1
## countType = 'cardinal'
// Ещё возможный вариант - 'ordinal'

# Локали (словари)
## Общие положения
Словарь нужно писать как json-объект и хранить его в json-файле:
```
{
    "signin"      : "войти",
    "signout"     : "выйти",
    "project"     : {
      "plural"    : "проекты",
      "one"       : "проект",
      "few"       : "проекта",
      "many"      : "проектов",
      "other"     : "проекта"
    }    
}
```
Но для упрощения его импорта можно сделать как константу javascript. 
```
export const ruRU = {  
     "signin"      : "войти",
     "signout"     : "выйти",
     "project"     : {
       "plural"    : "проекты",
       "one"       : "проект",
       "few"       : "проекта",
       "many"      : "проектов",
       "other"     : "проекта"
     }    
}
```
### По поводу правил, связанных с выбором множественного числа слова
- http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
- В частности для русского: http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#ru

## Рекомендуемая структура папок, где размещаются локали (словари) 
locales\ - папка с локалями

    en\ - папка с локалями en
    
    ru\ - папка с локалями ru
    
    ...

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
