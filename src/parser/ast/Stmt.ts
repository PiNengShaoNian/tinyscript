import { ASTNode } from './ASTNode'

export abstract class Stmt extends ASTNode {
  //   static parseStmt(
  //     parent: ASTNode | null,
  //     it: PeekTokenIterator
  //   ): ASTNode | null {
  //     const token = it.next()!
  //     const lookahead = it.peek()!
  //     it.putBack()
  //     if (token.isVariable() && lookahead.getValue() === '=') {
  //       return AssignStmt.parse(parent, it)
  //     } else if (token.getValue() === 'var') {
  //       return DeclareStmt.parse(parent, it)
  //     }
  //     return null
  //   }
}
