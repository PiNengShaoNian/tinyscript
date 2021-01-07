import { PeekIterator } from '../../common/PeekIterator'
import { Token } from '../../lexer/Token'
import { TokenType } from '../../lexer/TokenType'
import { ParseExcpetion } from './ParseException'

export class PeekTokenIterator extends PeekIterator<Token> {
  nextMatchValue(value: string): Token {
    const token = this.next()!
    if (token.getValue() !== value) {
      throw new ParseExcpetion(token)
    }

    return token
  }

  nextMatchType(value: TokenType): Token {
    const token = this.next()!
    if (token.getType() !== value) {
      throw new ParseExcpetion(token)
    }

    return token
  }
}
