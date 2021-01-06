import { iterableToGenerator } from '../../common/iterableToGenerator'
import { PeekIterator } from '../../common/PeekIterator'
import { Token } from '../Token'
import { TokenType } from '../TokenType'

describe('Token', () => {
  test('makeVarOrKeyword', () => {
    const it1 = new PeekIterator(iterableToGenerator('if abc'))
    const it2 = new PeekIterator(iterableToGenerator('true abc'))
    const it3 = new PeekIterator(iterableToGenerator('_haha abc'))

    expect(Token.makeVarOrKeyword(it1).getType()).toBe(TokenType.KEYWORD)
    expect(Token.makeVarOrKeyword(it2).getType()).toBe(TokenType.BOOLEAN)
    expect(Token.makeVarOrKeyword(it3).getType()).toBe(TokenType.VARIABLE)
  })

  test('makeString', () => {
    const it1 = new PeekIterator(iterableToGenerator('"sfsdf"'))
    const it2 = new PeekIterator(iterableToGenerator('"sdfsdf"'))
    const it3 = new PeekIterator(iterableToGenerator('"dslfjl'))

    expect(Token.makeString(it1).getType()).toBe(TokenType.STRING)
    expect(Token.makeString(it2).getType()).toBe(TokenType.STRING)

    expect(() => {
      Token.makeString(it3)
    }).toThrow()
  })

  test('makeOp', () => {
    const ops = [
      '+ ',
      '+= ',
      '++ ',
      '- ',
      '-= ',
      '-- ',
      '* ',
      '*= ',
      '/ ',
      '/= ',
      '^ ',
      '^= ',
      '> ',
      '>= ',
      '>> ',
      '< ',
      '<= ',
      '<< ',
      '& ',
      '&& ',
      '&= ',
      '| ',
      '|| ',
      '|= ',
    ]

    for (let i = 0; i < ops.length; ++i) {
      const it = new PeekIterator(iterableToGenerator(ops[i]))

      const token = Token.makeOp(it)
      expect(token.getValue()).toBe(ops[i].trim())
      expect(token.getType()).toBe(TokenType.OPERATOR)
    }
  })

  test('makeNumber', () => {
    const nums = [
      '0 ',
      '000 ',
      '-0 ',
      '+000 ',
      '333 ',
      '6666.66 ',
      '-6666.66 ',
      '+.99832 ',
    ]
    const types = [
      TokenType.INTEGER,
      TokenType.INTEGER,
      TokenType.INTEGER,
      TokenType.INTEGER,
      TokenType.INTEGER,
      TokenType.FLOAT,
      TokenType.FLOAT,
      TokenType.FLOAT,
    ]

    for (let i = 0; i < nums.length; ++i) {
      const it = new PeekIterator(iterableToGenerator(nums[i]))

      const token = Token.makeNumber(it)

      expect(token.getValue()).toBe(nums[i].trim())
      expect(token.getType()).toBe(types[i])
    }
  })
})
