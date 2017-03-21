Пока ничего не написано.

Используется библиотека: https://www.npmjs.com/package/plurals-cldr

Немного об опциях t
  isPlural: undefined, //true, если хотим получить множественное число в именительном падеже, например, - "Проекты" (count тогда вне зависимости от его указания НЕ ПРИНИМАЕТСЯ ВО ВНИМАНИЕ).
  count: 1,
  countType: 'cardinal' // Ещё возможный вариант - ordinal})

По поводу правил:
http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
В частности для русского: http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html#ru