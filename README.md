**i18ns_pl_mock**

# О пакете
Это очень упрощённая версия пакета i18ns_pl от \_meugen\_. Но с некоторыми вставками.
Работает в синхронном режиме.

В данном пакете используется пакет: https://www.npmjs.com/package/plurals-cldr

## Генерация автодокументации
`````npm run doc`````
## Запуск тестов
`````npm run test`````

`````npm run test:watch`````

## Сборка пакета
`````npm run build`````

`````npm run build:watch`````

# По поводу правил, связанных с выбором множественного числа слова
- http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
- В частности для русского: http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#ru

# Немного об опциях t
## isPlural = undefined
//true, если хотим получить множественное число в именительном падеже, например, - "Проекты" (count тогда вне зависимости от его указания НЕ ПРИНИМАЕТСЯ ВО ВНИМАНИЕ).
## count = 1
## countType = 'cardinal'
// Ещё возможный вариант - 'ordinal'