import { iterableToGenerator } from '../../common/iterableToGenerator'
import { Lexer } from '../../lexer/Lexer'
import { AssignStmt } from '../ast/AssignStmt'
import { DeclareStmt } from '../ast/DeclareStmt'
import { ParserUtils } from '../util/ParserUtils'
import { PeekTokenIterator } from '../util/PeekTokenIterator'

describe('Stmt', () => {
  test('declare', () => {
    const lexer = new Lexer()

    const it = new PeekTokenIterator(
      iterableToGenerator(lexer.analyse(iterableToGenerator('var i = 100 * 2')))
    )

    const stmt = DeclareStmt.parse(null, it)
    expect(ParserUtils.toPostfixExpression(stmt)).toBe('i 100 2 * declare')
  })

  test('assign', () => {
    const lexer = new Lexer()

    const it = new PeekTokenIterator(
      iterableToGenerator(lexer.analyse(iterableToGenerator('i = 100 * 2')))
    )

    const stmt = AssignStmt.parse(null, it)
    expect(ParserUtils.toPostfixExpression(stmt)).toBe('i 100 2 * assign')
  })
})
