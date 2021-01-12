import { Token } from '../../lexer/Token'
import { SymbolTable } from './SymbolTable'
import { SymbolType } from './SymbolType'

export class Symbol {
  parent: SymbolTable | null = null
  private lexeme: Token | null = null
  private label: string = ''
  private offset: number = 0
  private layerOffset: number = 0
  private type: SymbolType

  constructor(type: SymbolType) {
    this.type = type
  }

  static createAddressSymbol(lexeme: Token, offset: number): Symbol {
    const symbol = new Symbol(SymbolType.ADDRESS_SYMBOL)
    symbol.lexeme = lexeme
    symbol.offset = offset
    return symbol
  }

  static createImmediateSymbol(lexeme: Token): Symbol {
    const symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL)
    symbol.lexeme = lexeme
    return symbol
  }

  static createLabelSymbol(label: string, lexeme: Token): Symbol {
    const symbol = new Symbol(SymbolType.LABEL_SYMBOL)
    symbol.lexeme = lexeme
    symbol.label = label
    return symbol
  }

  clone(): Symbol {
    const symbol = new Symbol(this.type)
    symbol.lexeme = this.lexeme
    symbol.label = this.label
    symbol.offset = this.offset
    symbol.layerOffset = this.layerOffset
    symbol.type = this.type
    return symbol
  }

  setParent(parent: SymbolTable) {
    this.parent = parent
  }

  setOffset(offset: number): void {
    this.offset = offset
  }

  setLexeme(lexeme: Token) {
    this.lexeme = lexeme
  }

  getOffset() {
    return this.offset
  }

  getLexeme(): Token | null {
    return this.lexeme
  }

  setLayerOffset(offset: number): void {
    this.layerOffset = offset
  }

  getLayerOffset(): number {
    return this.layerOffset
  }

  getLabel(): string {
    return this.label
  }

  toString(): string {
    switch (this.type) {
      case SymbolType.ADDRESS_SYMBOL:
      case SymbolType.IMMEDIATE_SYMBOL:
        return this.lexeme?.getValue() ?? ''
      case SymbolType.LABEL_SYMBOL:
        return this.label
    }
  }
}
