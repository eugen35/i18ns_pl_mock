import I18n from '../../utils/i18n/i18ns_pl_mock.scs';

let i18n = new I18n({langtag:'ru-RU'});
i18n._translations["ru-RU"] = {
  "bill": "счёт",
  "cow": {
    "few":"быка",
    "many":"быков"
  }
};
i18n._translations["en-GB"] = {
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
      expect( i18n.t('bill') ).toBe('счёт')
    });
    test('Успешный поиск внутри langtag без параметров, вход - объект', function () {
      expect( i18n.t({key: 'bill'}) ).toBe('счёт')
    });
    test('Успешный поиск внутри langtag с доп. параметром - count', function () {
      expect( i18n.t('cow', 2) ).toBe('быка')
    });
    test('Успешный поиск внутри langtag с доп. параметром - count. Параметры передаются объектом', function () {
      expect( i18n.t({key: 'cow', count: 2}) ).toBe('быка')
    });
    test('Успешный поиск внутри langtag с доп. параметрами - count, langtag=en-GB', function () {
      expect( i18n.t({key: 'cow', count: 10, langtag: 'en-GB'}) ).toBe('cows-GB');
    });
    test('Неуспешный поиск внутри langtag без параметров, вход - строка', function () {
      expect(
        i18n.t('noexists')
      ).toBe('noexists')
    });
  });


  describe.skip('Создание функций перевода с параметрами', function() {

    test('TWithParams', function () {
      const en_GB = i18n.createTWithParams({langtag: 'en-GB'});
      expect( en_GB('cow') ).toBe('cow-GB');
    });

    test('template TWithParams', function () {
      const en_GBtpl = i18n.createTplTWithParams({langtag: 'en-GB'});
      expect( en_GBtpl`cow` ).toBe('cow-GB');
    });

  })

});
