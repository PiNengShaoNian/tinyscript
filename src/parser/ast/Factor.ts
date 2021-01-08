import { Token } from '../../lexer/Token'
import { TokenType } from '../../lexer/TokenType'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Factor extends Stmt {
  constructor(token: Token) {
    super()

    this.lexeme = token
    this.label = token.getValue()
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    const token = it.peek()!
    const type = token.getType()

    if (type === TokenType.VARIABLE) {
      it.next()
      return new Variable(token)
    } else if (token.isScalar()) {
      it.next()
      return new Scalar(token)
    }

    return null
  }
}

//在Factor中申明Scalar和Variable避免循环引用
//https://stackoverflow.com/questions/43176006/typeerror-class-extends-value-undefined-is-not-a-function-or-null
class Scalar extends Factor {
  constructor(token: Token) {
    super(token)
    this.type = ASTNodeTypes.SCALAR
  }
}

class Variable extends Factor {
  constructor(token: Token) {
    super(token)
    this.type = ASTNodeTypes.VARIABLE
  }
}
