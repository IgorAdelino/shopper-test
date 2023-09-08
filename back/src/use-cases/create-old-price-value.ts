interface newProduct {
  name: string;
  code: number;
  sales_price: number;
  old_sales_price?: number
  cost_price: number
}

export function CreateOldPriceValue (newProductsPrice: any, oldPriceValues: any) {
  
  const result: newProduct[] = newProductsPrice.map((item: any)=> {
    const sameCode = oldPriceValues.find((product: any) => product.code === item.code)

    if(sameCode){
      item.old_sales_price = sameCode.sales_price
      return item
    }
    
  })

  return result
}