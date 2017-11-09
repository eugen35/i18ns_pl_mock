import {genKeyFromTplStr, tTplStr} from "../../src/helpers.scs";
describe('helpers', function() {
  test.skip('genKeyFromTplStr()', function () {
    const id = 1;
    expect( genKeyFromTplStr`Entry with id=${id} is not found` ).toBe('Запись с id=${.} не найдена');
  });
  test('tTplStr()', function () {
    const id = 100, a=23, b='репа';
    expect( tTplStr`Entry with id=${id} is not found` ).toBe('Запись с id=100 не найдена');
    expect( tTplStr`I love ${id}` ).toBe('Люблю 100');
    expect( tTplStr`${id} is cool` ).toBe('100 - это круто');
    expect( tTplStr`${a} translated ${b}` ).toBe('23 переведено репа');
    expect( tTplStr`One ${id} two ${a} three` ).toBe('Один 100 два 23 три');
    expect( tTplStr`${id}` ).toBe('100');
    expect( tTplStr`Repa` ).toBe('Репа');
  });
});
