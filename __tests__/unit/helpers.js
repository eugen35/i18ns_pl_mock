import {genKeyFromTplStr, tTplStr} from "../../src/helpers.scs";
describe('helpers', function() {
  test('genKeyFromTplStr()', function () {
    const id = 1;
    expect( genKeyFromTplStr`Entry with id=${id} is not found` ).toBe('Entry with id=${.} is not found');
  });
});
