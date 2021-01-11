import { readFileSync } from 'fs'
import { AlphabetHelper } from '../common/AlphabetHelper'
import { iterableToGenerator } from '../common/iterableToGenerator'
import { PeekIterator } from '../common/PeekIterator'
import { LexicalException } from './LexicalException'
import { Token } from './Token'
import { TokenType } from './TokenType'

export class Lexer {
  analyse(source: Iterable<string>): Token[] {
    const tokens: Token[] = []
    const it = new PeekIterator<string>(iterableToGenerator(source), '\0')

    while (it.hasNext()) {
      let c = it.next()!

      if (c === '\0') break

      const lookahead = it.peek()!

      if (c === ' ' || c === '\n' || c === '\r') continue

      if (c === '/') {
        if (lookahead === '/') {
          while (it.hasNext() && (c = it.next()!) != '\n');
          continue
        } else if (lookahead === '*') {
          let valid = false
          while (it.hasNext()) {
            const p = it.next()
            if (p === '*' && it.peek() === '/') {
              valid = true
              it.next()
              break
            }
          }

          if (!valid) {
            throw new LexicalException('comments not match')
          }
          continue
        }
      }

      if (c === '{' || c === '}' || c === '(' || c === ')') {
        tokens.push(new Token(TokenType.BRACKET, c))
        continue
      }

      if (c === '"' || c === "'") {
        it.putBack()
        tokens.push(Token.makeString(it))
        continue
      }

      if (AlphabetHelper.isLetter(c)) {
        it.putBack()
        tokens.push(Token.makeVarOrKeyword(it))
        continue
      }

      if (AlphabetHelper.isNumber(c)) {
        it.putBack()
        tokens.push(Token.makeNumber(it))
        continue
      }

      //3+5, +5, 3 * -5
      if (
        (c === '+' || c === '-' || c === '.') &&
        AlphabetHelper.isNumber(lookahead)
      ) {
        const lastToken = tokens[tokens.length - 1] ?? null

        if (!lastToken || !lastToken.isValue()) {
          it.putBack()
          tokens.push(Token.makeNumber(it))
          continue
        }
      }

      if (AlphabetHelper.isOperator(c)) {
        it.putBack()
        tokens.push(Token.makeOp(it))
        continue
      }

      throw new LexicalException(c)
    }
    return tokens
  }

  static fromFile(path: string): Token[] {
    const data = readFileSync(path, {
      encoding: 'utf-8',
    })
    const lexer = new Lexer()

    return lexer.analyse(data)
  }
}
