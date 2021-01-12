import { iterableToGenerator } from '../../common/iterableToGenerator'
import { Lexer } from '../../lexer/Lexer'
import { ASTNode } from '../ast/ASTNode'
import { Expr } from '../ast/Expr'
import { ParserUtils } from '../util/ParserUtils'
import { PeekTokenIterator } from '../util/PeekTokenIterator'

const createExpr = (src: string): ASTNode | null => {
  const lexer = new Lexer()
  const tokens = lexer.analyse(iterableToGenerator(src))
  const it = new PeekTokenIterator(iterableToGenerator(tokens))

  return Expr.parse(it)
}

test('ParseExpr', () => {
  const expr = createExpr('1+1+1')
  expect(ParserUtils.toPostfixExpression(expr)).toBe('1 1 1 + +')

  const expr1 = createExpr('"1" == ""')
  expect(ParserUtils.toPostfixExpression(expr1)).toBe('"1" "" ==')

  const expr2 = createExpr('1+2*3')
  expect(ParserUtils.toPostfixExpression(expr2)).toBe('1 2 3 * +')

  const expr3 = createExpr('1*2+3')
  expect(ParserUtils.toPostfixExpression(expr3)).toBe('1 2 * 3 +')

  const expr4 = createExpr('10 * (7 + 4)')
  expect(ParserUtils.toPostfixExpression(expr4)).toBe('10 7 4 + *')

  const expr5 = createExpr('(1*2!=7) == 3 !=4*5+6')
  expect(ParserUtils.toPostfixExpression(expr5)).toBe(
    '1 2 * 7 != 3 4 5 * 6 + != =='
  )
})
