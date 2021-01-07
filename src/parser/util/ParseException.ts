import { Token } from '../../lexer/Token'

export class ParseExcpetion extends Error {
  constructor(msg: string | Token) {
    if (msg instanceof Token) {
      super(`Syntax Error, unexpected token ${msg.getValue()}`)
    } else {
      super(msg)
    }
  }
}
