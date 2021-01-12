import { Token } from '../../lexer/Token'
import { TokenType } from '../../lexer/TokenType'
import { SymbolTable } from '../symbol/SymbolTable'

describe('SymbolTable', () => {
  test('localSize', () => {
    const symbolTable = new SymbolTable()
    symbolTable.createLabel('L0', new Token(TokenType.VARIABLE, 'foo'))
    symbolTable.createVariable()
    symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, 'a'))

    expect(symbolTable.localSize()).toBe(2)
  })

  test('chain', () => {
    const symbolTable = new SymbolTable()
    symbolTable.createSymbolByLexeme(new Token(TokenType.VARIABLE, 'a'))
    const childTable = new SymbolTable()
    symbolTable.addChild(childTable)
    const childChildTable = new SymbolTable()
    childTable.addChild(childChildTable)

    expect(childTable.exists(new Token(TokenType.VARIABLE, 'a'))).toBeTruthy()
    expect(
      childChildTable.exists(new Token(TokenType.VARIABLE, 'a'))
    ).toBeTruthy()
  })

  test('offset', () => {
    const symbolTable = new SymbolTable()
    symbolTable.createSymbolByLexeme(new Token(TokenType.INTEGER, '100'))
    const symbolA = symbolTable.createSymbolByLexeme(
      new Token(TokenType.VARIABLE, 'a')
    )
    const symbolB = symbolTable.createSymbolByLexeme(
      new Token(TokenType.VARIABLE, 'b')
    )

    const childTable = new SymbolTable()
    symbolTable.addChild(childTable)

    const anotherSymbolB = childTable.createSymbolByLexeme(
      new Token(TokenType.VARIABLE, 'b')
    )
    const symbolC = childTable.createSymbolByLexeme(
      new Token(TokenType.VARIABLE, 'c')
    )

    expect(symbolA.getOffset()).toBe(0)
    expect(symbolB.getOffset()).toBe(1)
    expect(anotherSymbolB.getOffset()).toBe(1)
    expect(anotherSymbolB.getLayerOffset()).toBe(1)
    expect(symbolC.getOffset()).toBe(0)
    expect(symbolC.getLayerOffset()).toBe(0)
  })
})
