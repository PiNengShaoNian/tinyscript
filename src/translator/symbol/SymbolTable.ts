import { Token } from '../../lexer/Token'
import { TokenType } from '../../lexer/TokenType'
import { Symbol } from './Symbol'

export class SymbolTable {
  parent: SymbolTable | null = null
  level: number = 0
  private children: SymbolTable[] = []
  private symbols: Symbol[] = []

  private tempIndex = 0
  private offsetIndex = 0

  addSymbol(symbol: Symbol): void {
    this.symbols.push(symbol)
    symbol.parent = this
  }

  exists(lexeme: Token): boolean {
    const symbol = this.symbols.find(
      (v) => v.getLexeme()!.getValue() === lexeme.getValue()
    )
    if (symbol) return true

    if (this.parent) return this.parent.exists(lexeme)

    return false
  }

  cloneFromSymbolTree(lexeme: Token, layoutOffset: number): Symbol | null {
    const symbol = this.symbols.find(
      (v) => v.getLexeme()!.getValue() === lexeme.getValue()
    )
    if (symbol) {
      const clone = symbol.clone()
      clone.setLayerOffset(layoutOffset)
      return clone
    }

    if (this.parent) {
      return this.parent.cloneFromSymbolTree(lexeme, layoutOffset + 1)
    }

    return null
  }

  createSymbolByLexeme(lexeme: Token): Symbol {
    let symbol: Symbol
    if (lexeme.isScalar()) {
      symbol = Symbol.createImmediateSymbol(lexeme)
    } else {
      symbol =
        this.cloneFromSymbolTree(lexeme, 0) ??
        Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
    }

    this.addSymbol(symbol)
    return symbol
  }

  createVariable() {
    const lexeme = new Token(TokenType.VARIABLE, 'p' + this.tempIndex++)
    const symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
    this.addSymbol(symbol)

    return symbol
  }

  addChild(child: SymbolTable): void {
    child.parent = this
    child.level = this.level + 1
    this.children.push(child)
  }

  localSize(): number {
    return this.offsetIndex
  }

  getChildren(): SymbolTable[] {
    return this.children
  }

  getSymbols(): Symbol[] {
    return this.symbols
  }

  createLabel(label: string, lexeme: Token): void {
    const labelSymbol = Symbol.createLabelSymbol(label, lexeme)
    this.addSymbol(labelSymbol)
  }
}
