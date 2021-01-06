import { AlphabetHelper } from '../AlphabetHelper'

test('AlphabetHelper', () => {
  expect(AlphabetHelper.isLetter('a')).toBeTruthy()
  expect(AlphabetHelper.isLetter('3')).toBeFalsy()

  expect(AlphabetHelper.isNumber('3')).toBeTruthy()
  expect(AlphabetHelper.isNumber('a')).toBeFalsy()

  expect(AlphabetHelper.isNumber('+')).toBeFalsy()
  expect(AlphabetHelper.isNumber('-')).toBeFalsy()
  expect(AlphabetHelper.isNumber('*')).toBeFalsy()
  expect(AlphabetHelper.isNumber('/')).toBeFalsy()

  expect(AlphabetHelper.isOperator('+')).toBeTruthy()
  expect(AlphabetHelper.isOperator('-')).toBeTruthy()
  expect(AlphabetHelper.isOperator('*')).toBeTruthy()
  expect(AlphabetHelper.isOperator('/')).toBeTruthy()
  expect(AlphabetHelper.isOperator('&')).toBeTruthy()

  expect(AlphabetHelper.isLiteral('/')).toBeFalsy()
  expect(AlphabetHelper.isLiteral('a')).toBeTruthy()
  expect(AlphabetHelper.isLiteral('_')).toBeTruthy()
})
