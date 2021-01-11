import { parseStmt } from '../parseStmt'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Program extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent, ASTNodeTypes.BLOCK, 'program')
  }

  static parse(parent: null | ASTNode, it: PeekTokenIterator): ASTNode | null {
    const block = new Program(parent)
    let stmt: ASTNode | null = null
    while ((stmt = parseStmt(parent, it)) !== null) {
      block.addChild(stmt)
    }

    return block
  }
}
