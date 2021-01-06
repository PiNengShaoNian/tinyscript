export class Keywords {
  private static keywords: Set<string> = new Set([
    'var',
    'if',
    'else',
    'for',
    'while',
    'break',
    'func',
    'return',
  ])

  static isKeyword(word: string): boolean {
    return this.keywords.has(word)
  }
}
