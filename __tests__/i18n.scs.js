import I18n from '../i18ns_pl_mock.scs';

let i18n = new I18n({langtag:'ru-RU'});
i18n._dictionaries["ru-RU"] = {
  "bill": "счёт",
  "cow": {
    "few":"быка",
    "many":"быков"
  },
  "pub": {
    "plural": "бары",
    "one": "бар"
  }
};
i18n._dictionaries["en-GB"] = {
  "pub": {
    "plural": "pubs",
    "one": "pub"
  },
  "man": {
    "other"  :"men-GB"
  },
  "bill": {
    "other"  :"bills-GB"
  },
  "cow": {
    "one"   :"cow-GB",
    "other"  :"cows-GB"
  }
};

describe('I18n', () => {
  describe('Простые случаи', function() {
    test('Успешный поиск внутри langtag без параметров, вход - строка', function () {
      expect( i18n.t('bill') ).toBe('счёт');
    });
    test('Успешный поиск внутри langtag без параметров, вход - объект', function () {
      expect( i18n.t({key: 'bill'}) ).toBe('счёт');
    });
    test('Успешный поиск внутри langtag с доп. параметром - count', function () {
      expect( i18n.t('pub', 'plural') ).toBe('бары');
    });
    test('Успешный поиск внутри langtag с доп. параметром - count', function () {
      expect( i18n.t('cow', 2) ).toBe('быка');
    });
    test('Успешный поиск внутри langtag с доп. параметром - count. Параметры передаются объектом', function () {
      expect( i18n.t({key: 'cow', count: 2}) ).toBe('быка');
    });
    test('Успешный поиск внутри langtag с доп. параметром - count', function () {
      expect( i18n.t({key:'pub', isPlural: 'plural'}) ).toBe('бары');
    });
    test('Успешный поиск внутри langtag с доп. параметром - count', function () {
      expect( i18n.t({key:'pub', isPlural: true}) ).toBe('бары');
    });
    test('Успешный поиск внутри langtag с доп. параметрами - count, langtag=en-GB', function () {
      expect( i18n.t({key: 'cow', count: 10, langtag: 'en-GB'}) ).toBe('cows-GB');
    });
    test('Неуспешный поиск внутри langtag без параметров, вход - строка', function () {
      expect(
        i18n.t('noexists')
      ).toBe('noexists');
    });
  });

  describe('Создание функций перевода с параметрами', function() {
    test('TWithParams', function () {
      const en_GB = i18n.createTWithParams({langtag: 'en-GB'});
      expect( en_GB('cow') ).toBe('cow-GB');
      const ru_RU = i18n.createTWithParams({langtag: 'ru-RU'});
      expect( i18n.t({key:'pub', isPlural: true}) ).toBe('бары');
      expect( ru_RU({key:'pub', isPlural: true}) ).toBe('бары');
    });
    test('template TWithParams', function () {
      const en_GBtpl = i18n.createTplTWithParams({langtag: 'en-GB'});
      expect( en_GBtpl`cow` ).toBe('cow-GB');
    });

  });

  describe('setDictionaries - Установка своих словарей', function() {
    const oneDictionary = {"de-DE" : {
      "bill": "Rechnung"
    }};
    const twoDictionaries = {
      "en-US" : {
        "bill": "bill in en-US"
      },
      "en-AU" : {
        "bill": "bill in en-AU"
      }
    };
    test('Ставим один словарь', function () {
      i18n.setDictionaries(oneDictionary);
      expect( i18n.t({key:'bill', langtag:"de-DE"}) ).toBe('Rechnung');
    });

    test('Ставим два словаря', function () {
      i18n.setDictionaries(twoDictionaries);
      expect( i18n.t({key:'bill', langtag:"en-AU"}) ).toBe('bill in en-AU');
      expect( i18n.t({key:'bill', langtag:"en-US"}) ).toBe('bill in en-US');
    });
  });

});
