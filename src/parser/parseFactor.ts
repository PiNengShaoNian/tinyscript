import { TokenType } from '../lexer/TokenType'
import { ASTNode } from './ast/ASTNode'
import { Scalar } from './ast/Scalar'
import { Variable } from './ast/Variable'
import { PeekTokenIterator } from './util/PeekTokenIterator'

export const parseFactor = (it: PeekTokenIterator): ASTNode | null => {
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
