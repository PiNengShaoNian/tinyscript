import { AssignStmt } from './ast/AssignStmt'
import { ASTNode } from './ast/ASTNode'
import { DeclareStmt } from './ast/DeclareStmt'
import { FunctionDeclareStmt } from './ast/FunctionDeclareStmt'
import { IfStmt } from './ast/IfStmt'
import { ReturnStmt } from './ast/ReturnStmt'
import { PeekTokenIterator } from './util/PeekTokenIterator'

export const parseStmt = (
  parent: ASTNode | null,
  it: PeekTokenIterator
): ASTNode | null => {
  const token = it.next()!
  const lookahead = it.peek()!

  it.putBack()

  if (token.isVariable() && lookahead.getValue() === '=') {
    return AssignStmt.parse(parent, it)
  } else if (token.getValue() === 'var') {
    return DeclareStmt.parse(parent, it)
  } else if (token.getValue() === 'func') {
    return FunctionDeclareStmt.parse(parent, it)
  } else if (token.getValue() === 'return') {
    return ReturnStmt.parse(it)
  } else if (token.getValue() === 'if') {
    return IfStmt.parse(parent, it)
  }

  return null
}
