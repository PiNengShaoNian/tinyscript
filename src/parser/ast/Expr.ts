import { Token } from '../../lexer/Token'
import { parseFactor } from '../parseFactor'
import { PeekTokenIterator } from '../util/PeekTokenIterator'
import { priorityTable } from '../util/priorityTable'
import { ASTNode } from './ASTNode'
import { ASTNodeTypes } from './ASTNodeTypes'
import { Stmt } from './Stmt'

export class Expr extends Stmt {
  constructor(
    parent: ASTNode | null,
    type: ASTNodeTypes | null = null,
    lexeme: Token | null = null
  ) {
    super(parent)

    this.type = type
    this.lexeme = lexeme
    this.label = lexeme?.getValue() ?? null
  }

  static parse(parent: ASTNode | null, it: PeekTokenIterator): ASTNode | null {
    return Expr.E(parent, 0, it)
  }

  //left:  E(k) -> E(k) op(k) E(k+1) | E(k+1)
  //right:
  //    E(k) -> E(k+1) E_(k)
  //    E_(k) -> op(k) E(k + 1) E_(k) | €
  // E(t) -> F E_(k) | U E_(k)
  // E_(t) -> op(t) E(t) E_(t) | €
  private static E(
    parent: ASTNode | null,
    k: number,
    it: PeekTokenIterator
  ): ASTNode | null {
    if (k < priorityTable.length - 1) {
      return this.combine(
        parent,
        it,
        () => this.E(parent, k + 1, it),
        () => this.E_(parent, k, it)
      )
    } else {
      return this.race(
        it,
        () =>
          this.combine(
            parent,
            it,
            () => this.U(parent, it),
            () => this.E_(parent, k, it)
          ),
        () =>
          this.combine(
            parent,
            it,
            () => this.F(parent, it),
            () => this.E_(parent, k, it)
          )
      )
    }
  }

  static E_(
    parent: ASTNode | null,
    k: number,
    it: PeekTokenIterator
  ): ASTNode | null {
    const token = it.peek()!
    const vlaue = token.getValue()

    if (priorityTable[k].indexOf(vlaue) >= 0) {
      const expr = new Expr(
        parent,
        ASTNodeTypes.BINARY_EXPR,
        it.nextMatchValue(vlaue)
      )
      expr.addChild(
        this.combine(
          parent,
          it,
          () => this.E(parent, k + 1, it),
          () => this.E_(parent, k, it)
        )!
      )
      return expr
    }

    return null
  }

  private static U(
    parent: ASTNode | null,
    it: PeekTokenIterator
  ): ASTNode | null {
    const token = it.peek()!
    const value = token.getValue()

    let expr

    if (value === '(') {
      it.nextMatchValue('(')
      expr = this.E(parent, 0, it)
      it.nextMatchValue(')')
      return expr
    } else if (value === '++' || value === '--' || value === '!') {
      const t = it.peek()
      it.nextMatchValue(value)
      const unaryExpr = new Expr(parent, ASTNodeTypes.UNARY_EXPR, t)
      unaryExpr.addChild(this.E(unaryExpr, 0, it)!)
      return unaryExpr
    }

    return null
  }

  private static F(_: ASTNode | null, it: PeekTokenIterator): ASTNode {
    // const token = it.peek()!

    return parseFactor(it)!
    // if (token.isVariable()) {
    //   return new Variable(parent, it)
    // } else {
    //   return new Scalar(parent, it)
    // }
  }

  private static combine(
    parent: ASTNode | null,
    it: PeekTokenIterator,
    funcA: () => ASTNode | null,
    funcB: () => ASTNode | null
  ): ASTNode | null {
    if (!it.hasNext()) return null

    const a = funcA()
    if (!a) {
      return it.hasNext() ? funcB() : null
    }

    const b = it.hasNext() ? funcB() : null
    if (!b) return a

    const expr = new Expr(parent, ASTNodeTypes.BINARY_EXPR, b.getLexeme())
    expr.addChild(a)
    expr.addChild(b.getChild(0))

    return expr
  }

  private static race(
    it: PeekTokenIterator,
    funcA: () => ASTNode | null,
    funcB: () => ASTNode | null
  ): ASTNode | null {
    if (!it.hasNext()) return null

    const a = funcA()
    if (a) return a

    return funcB()
  }
}
