export class CodeNotFoundError extends Error {
  constructor() {
    super('Código Inválido! Verifique os campos do arquivo .csv')  
  }
}