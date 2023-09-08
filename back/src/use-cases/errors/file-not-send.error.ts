export class FileNotSendError extends Error {
  constructor() {
    super('Arquivo de precificação não enviado!')  
  }
}