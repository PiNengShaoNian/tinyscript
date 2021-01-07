export class AlphabetHelper {
  private static letterRE = /^[a-zA-Z]$/
  private static numberRE = /^[0-9]$/
  private static literalRE = /^[_a-zA-Z0-9]$/
  private static operatorRE = /^[-+*/<>=!&|%^,]$/

  static isLetter(char: string): boolean {
    return this.letterRE.test(char)
  }

  static isNumber(char: string): boolean {
    return this.numberRE.test(char)
  }

  static isLiteral(char: string): boolean { 
    return this.literalRE.test(char)
  }
  static isOperator(char: string): boolean {
    return this.operatorRE.test(char)
  }
}
