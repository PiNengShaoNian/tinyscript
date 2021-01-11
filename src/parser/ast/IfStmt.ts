import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Block } from './Block'
import { Expr } from './Expr'
import { Stmt } from './Stmt'

export class IfStmt extends Stmt {
  constructor(parent: ASTNode | null) {
    super(parent, ASTNodeTypes.IF_STMT, 'if')
  }

  static parse(parent: ASTNode | null, it: PeekTokenIterator): ASTNode | null {
    return this.parseIf(parent, it)
  }

  static parseIf(
    parent: ASTNode | null,
    it: PeekTokenIterator
  ): ASTNode | null {
    const lexeme = it.nextMatchValue('if')
    it.nextMatchValue('(')
    const ifStmt = new IfStmt(parent)
    ifStmt.setLexeme(lexeme)
    const expr = Expr.parse(parent, it)!
    ifStmt.addChild(expr)
    it.nextMatchValue(')')

    const block = Block.parse(parent, it)!
    ifStmt.addChild(block)

    const tail = this.parseTail(parent, it)
    if (tail) ifStmt.addChild(tail)

    return ifStmt
  }

  static parseTail(
    parent: ASTNode | null,
    it: PeekTokenIterator
  ): ASTNode | null {
    if (!it.hasNext() || it.peek()!.getValue() !== 'else') {
      return null
    }

    it.nextMatchValue('else')
    const lookhead = it.peek()!

    if (lookhead.getValue() === '{') {
      return Block.parse(parent, it)
    } else if (lookhead.getValue() === 'if') {
      return this.parseIf(parent, it)
    } else return null
  }
}
