export class PriceExceedLimitError extends Error {
  constructor() {
    super('Preço sugerido excede o limite de 10% do valor de venda!')
  }
}