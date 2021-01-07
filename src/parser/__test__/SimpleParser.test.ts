import { iterableToGenerator } from '../../common/iterableToGenerator'
import { Lexer } from '../../lexer/Lexer'
import { SimpleParser } from '../SimpleParser'
import { PeekTokenIterator } from '../util/PeekTokenIterator'

test('SimpleParser', () => {
  const source = '1+2+3+4'
  const lexer = new Lexer()
  const tokensIt = new PeekTokenIterator(
    iterableToGenerator(lexer.analyse(source))
  )
  const expr = SimpleParser.parse(tokensIt)

  expect(expr.getChildren()).toHaveLength(2)

  const v1 = expr.getChild(0)
  expect(v1.getLexeme()!.getValue()).toBe('1')
  expect(expr.getLexeme()!.getValue()).toBe('+')

  const expr2 = expr.getChild(1)
  const v2 = expr2.getChild(0)
  expect(v2.getLexeme()!.getValue()).toBe('2')
  expect(expr2.getLexeme()!.getValue()).toBe('+')

  const expr3 = expr2.getChild(1)
  const v3 = expr3.getChild(0)
  const v4 = expr3.getChild(1)
  expect(v3.getLexeme()!.getValue()).toBe('3')
  expect(v4.getLexeme()!.getValue()).toBe('4')
  expect(expr3.getLexeme()!.getValue()).toBe('+')
})
