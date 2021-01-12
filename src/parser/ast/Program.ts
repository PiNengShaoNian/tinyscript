import { parseStmt } from '../parseStmt'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Program extends Stmt {
  constructor() {
    super(ASTNodeTypes.BLOCK, 'program')
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    const block = new Program()
    let stmt: ASTNode | null = null
    while ((stmt = parseStmt(it)) !== null) {
      block.addChild(stmt)
    }

    return block
  }
}
