export class PriceBelowErrorLimit extends Error {
  constructor() {
    super('Preço sugerido abaixo do preço de custo do produto!')
  }
}