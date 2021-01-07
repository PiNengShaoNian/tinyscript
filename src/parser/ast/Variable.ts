import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { Factor } from './Factor'

export class ForStmt extends Factor {
  constructor(parent: ASTNode, it: PeekTokenIterator) {
    super(parent, it)
  }
}
