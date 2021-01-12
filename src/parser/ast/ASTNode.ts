import { Token } from '../../lexer/Token'
import { ASTNodeTypes } from './ASTNodeTypes'

export abstract class ASTNode {
  protected children: ASTNode[] = []
  protected parent: ASTNode | null = null

  protected lexeme: Token | null = null
  protected label: string | null
  protected type: ASTNodeTypes | null

  constructor(type: ASTNodeTypes | null = null, label: string | null = null) {
    this.type = type
    this.label = label
  }

  getChild(index: number): ASTNode {
    return this.children[index]
  }

  addChild(node: ASTNode): void {
    node.parent = this
    this.children.push(node)
  }

  getLexeme(): Token | null {
    return this.lexeme
  }

  getLabel(): string | null {
    return this.label
  }

  getChildren(): ASTNode[] {
    return this.children
  }

  getType(): null | ASTNodeTypes {
    return this.type
  }

  setLexeme(token: Token): void {
    this.lexeme = token
  }

  setLabel(label: string): void {
    this.label = label
  }

  setType(type: ASTNodeTypes) {
    this.type = type
  }

  print() {
    console.log(JSON.stringify(this, ['label', 'children'], 2))
  }
}
