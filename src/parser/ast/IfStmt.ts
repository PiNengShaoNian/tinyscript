import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Block } from './Block'
import { Expr } from './Expr'
import { Stmt } from './Stmt'

export class IfStmt extends Stmt {
  constructor() {
    super(ASTNodeTypes.IF_STMT, 'if')
  }

  static parse(it: PeekTokenIterator): ASTNode | null {
    return this.parseIf(it)
  }

  static parseIf(it: PeekTokenIterator): ASTNode | null {
    const lexeme = it.nextMatchValue('if')
    it.nextMatchValue('(')
    const ifStmt = new IfStmt()
    ifStmt.setLexeme(lexeme)
    const expr = Expr.parse(it)!
    ifStmt.addChild(expr)
    it.nextMatchValue(')')

    const block = Block.parse(it)!
    ifStmt.addChild(block)

    const tail = this.parseTail(it)
    if (tail) ifStmt.addChild(tail)

    return ifStmt
  }

  static parseTail(it: PeekTokenIterator): ASTNode | null {
    if (!it.hasNext() || it.peek()!.getValue() !== 'else') {
      return null
    }

    it.nextMatchValue('else')
    const lookhead = it.peek()!

    if (lookhead.getValue() === '{') {
      return Block.parse(it)
    } else if (lookhead.getValue() === 'if') {
      return this.parseIf(it)
    } else return null
  }
}
