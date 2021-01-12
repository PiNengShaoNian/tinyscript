import { iterableToGenerator } from '../../common/iterableToGenerator'
import { Lexer } from '../../lexer/Lexer'
import { AssignStmt } from '../ast/AssignStmt'
import { DeclareStmt } from '../ast/DeclareStmt'
import { IfStmt } from '../ast/IfStmt'
import { ParserUtils } from '../util/ParserUtils'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import path from 'path'
import { FunctionDeclareStmt } from '../ast/FunctionDeclareStmt'
import { parseStmt } from '../parseStmt'
import { ReturnStmt } from '../ast/ReturnStmt'

describe('Stmt', () => {
  test('declare', () => {
    const lexer = new Lexer()

    const it = new PeekTokenIterator(
      iterableToGenerator(lexer.analyse(iterableToGenerator('var i = 100 * 2')))
    )

    const stmt = DeclareStmt.parse(it)
    expect(ParserUtils.toPostfixExpression(stmt)).toBe('i 100 2 * declare')
  })

  test('assign', () => {
    const lexer = new Lexer()

    const it = new PeekTokenIterator(
      iterableToGenerator(lexer.analyse(iterableToGenerator('i = 100 * 2')))
    )

    const stmt = AssignStmt.parse(it)
    expect(ParserUtils.toPostfixExpression(stmt)).toBe('i 100 2 * assign')
  })

  test('if', () => {
    const lexer = new Lexer()
    const it = new PeekTokenIterator(
      iterableToGenerator(
        lexer.analyse(
          iterableToGenerator(`if(a){
            a = 1
        }`)
        )
      )
    )

    const stmt = IfStmt.parse(it)!
    const expr = stmt.getChild(0)
    const block = stmt.getChild(1)
    const assignStmt = block.getChild(0)

    expect(expr.getLexeme()!.getValue()).toBe('a')
    expect(assignStmt.getLexeme()!.getValue()).toBe('=')
  })

  test('if else', () => {
    const lexer = new Lexer()
    const it = new PeekTokenIterator(
      iterableToGenerator(
        lexer.analyse(
          iterableToGenerator(`if(a){
            a = 1
        } else {
            a = 2
            a = a * 3
        }`)
        )
      )
    )

    const stmt = IfStmt.parse(it)!
    const expr = stmt.getChild(0)
    const block = stmt.getChild(1)
    const assignStmt = block.getChild(0)
    const elseBlock = stmt.getChild(2)
    const assignStmt2 = elseBlock.getChild(0)

    expect(expr.getLexeme()!.getValue()).toBe('a')
    expect(assignStmt.getLexeme()!.getValue()).toBe('=')
    expect(assignStmt2.getLexeme()!.getValue()).toBe('=')
    expect(elseBlock.getChildren().length).toBe(2)
  })

  test('function', () => {
    const tokens = Lexer.fromFile(
      path.join(__dirname, '../../../example/function.tiny')
    )
    const it = new PeekTokenIterator(iterableToGenerator(tokens))

    const functionStmt = parseStmt(it) as FunctionDeclareStmt

    const args = functionStmt.getArgs()

    expect(args.getChild(0).getLexeme()!.getValue()).toBe('a')
    expect(args.getChild(1).getLexeme()!.getValue()).toBe('b')

    const block = functionStmt.getBlock()

    expect(block.getChild(0)).toBeInstanceOf(ReturnStmt)
  })

  test('recursion function', () => {
    const tokens = Lexer.fromFile(
      path.join(__dirname, '../../../example/recursion.tiny')
    )
    const it = new PeekTokenIterator(iterableToGenerator(tokens))

    const functionStmt = parseStmt(it) as FunctionDeclareStmt

    const args = functionStmt.getArgs()

    expect(args.getChild(0).getLexeme()!.getValue()).toBe('n')

    const block = functionStmt.getBlock()

    expect(block.getChild(0)).toBeInstanceOf(IfStmt)
    expect(block.getChild(1)).toBeInstanceOf(ReturnStmt)
  })
})
