import { ASTNode } from '../ast/ASTNode'
import { ASTNodeTypes } from '../ast/ASTNodeTypes'

export class ParserUtils {
  static toPostfixExpression(node: ASTNode | null): string {
    if (!node) return ''

    let leftStr = ''
    let rightStr = ''

    switch (node.getType()) {
      case ASTNodeTypes.BINARY_EXPR:
      case ASTNodeTypes.DECLARE_STMT:
        leftStr = this.toPostfixExpression(node.getChild(0))
        rightStr = this.toPostfixExpression(node.getChild(1))
        return leftStr + ' ' + rightStr + ' ' + node.getLabel()
      case ASTNodeTypes.VARIABLE:
      case ASTNodeTypes.SCALAR:
        return node.getLexeme()!.getValue()
    }

    throw new Error('Not implemented')
  }
}
