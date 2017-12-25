import {genKeyFromTplStr, genStrFromTplAndVars} from "../../src/helpers.scs";
describe('helpers', function() {
  test('genKeyFromTplStr()', function () {
    const id = 1;
    expect( genKeyFromTplStr`Entry with id=${id} is not found` ).toBe('Entry with id=${.} is not found');
  });

  test('genStrFromTplAndVars()',()=>{
    expect(genStrFromTplAndVars('Раз ${a}, два ${b}', {a:'Сто', b:200})).toBe('Раз Сто, два 200');
  });
});

