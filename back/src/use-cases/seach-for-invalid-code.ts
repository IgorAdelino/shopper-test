type ProductInSystem = {
  code: number
  cost_price: number
  sales_price: number
  description: string
}

type PackInSystem = {
  id: number,
  pack_id: number,
  product_id: number,
  qty: number
}
//Procurando por algum código que não consta no banco de dados
export function SearchForInvalidCode(result: any, products: any){
  const invalidCode = products.filter((firstObject: any) =>
        !result.some((secondObject: PackInSystem | ProductInSystem) => {
          if ('code' in secondObject) {
            return secondObject.code === firstObject.code;
          } else if ('product_id' in secondObject) {
              return secondObject.product_id === firstObject.code;
          }
            return false;
          })
      );

  return invalidCode
}