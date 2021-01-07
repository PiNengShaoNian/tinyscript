import { Lexer } from '../Lexer'
import { TokenType } from '../TokenType'

describe('Lexer', () => {
  test('expression', () => {
    const lexer = new Lexer()
    const source = '(a+b)^100.12==+100-20'

    const tokens = lexer.analyse(source)

    expect(tokens).toHaveLength(11)
    expect(tokens[0].getType()).toBe(TokenType.BRACKET)
    expect(tokens[0].getValue()).toBe('(')

    expect(tokens[1].getType()).toBe(TokenType.VARIABLE)
    expect(tokens[1].getValue()).toBe('a')

    expect(tokens[2].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[2].getValue()).toBe('+')

    expect(tokens[3].getType()).toBe(TokenType.VARIABLE)
    expect(tokens[3].getValue()).toBe('b')

    expect(tokens[4].getType()).toBe(TokenType.BRACKET)
    expect(tokens[4].getValue()).toBe(')')

    expect(tokens[5].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[5].getValue()).toBe('^')

    expect(tokens[6].getType()).toBe(TokenType.FLOAT)
    expect(tokens[6].getValue()).toBe('100.12')

    expect(tokens[7].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[7].getValue()).toBe('==')

    expect(tokens[8].getType()).toBe(TokenType.INTEGER)
    expect(tokens[8].getValue()).toBe('+100')

    expect(tokens[9].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[9].getValue()).toBe('-')

    expect(tokens[10].getType()).toBe(TokenType.INTEGER)
    expect(tokens[10].getValue()).toBe('20')
  })

  test('function', () => {
    const source = `func foo(a,b){
          print(a+b)
      }
      foo(-100.0,100)
      `

    const lexer = new Lexer()

    const tokens = lexer.analyse(source)

    expect(tokens[0].getType()).toBe(TokenType.KEYWORD)
    expect(tokens[0].getValue()).toBe('func')

    expect(tokens[1].getType()).toBe(TokenType.VARIABLE)
    expect(tokens[1].getValue()).toBe('foo')

    expect(tokens[2].getType()).toBe(TokenType.BRACKET)
    expect(tokens[2].getValue()).toBe('(')

    expect(tokens[3].getType()).toBe(TokenType.VARIABLE)
    expect(tokens[3].getValue()).toBe('a')

    expect(tokens[4].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[4].getValue()).toBe(',')

    expect(tokens[tokens.length - 4].getType()).toBe(TokenType.FLOAT)
    expect(tokens[tokens.length - 4].getValue()).toBe('-100.0')

    expect(tokens[tokens.length - 3].getType()).toBe(TokenType.OPERATOR)
    expect(tokens[tokens.length - 3].getValue()).toBe(',')

    expect(tokens[tokens.length - 2].getType()).toBe(TokenType.INTEGER)
    expect(tokens[tokens.length - 2].getValue()).toBe('100')

    expect(tokens[tokens.length - 1].getType()).toBe(TokenType.BRACKET)
    expect(tokens[tokens.length - 1].getValue()).toBe(')')
  })

  test('comment', () => {
    const source = `
      //注释
      a=3 /*还是注释

      都放生了
      */
     `
    const lexer = new Lexer()

    const tokens = lexer.analyse(source)

    expect(tokens).toHaveLength(3)
  })
})
