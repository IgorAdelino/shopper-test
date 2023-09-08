interface ProductUpdate {
  code: number
  new_price: number
}

export function SplitCsvFile(buffer: string){
  const productValues = buffer?.trim().split(/\n/);
    
    const products: ProductUpdate[] = []
    for(let line of productValues){
      const productValuesLineSplitted = line.split(',').map((value) => parseFloat(value));

      products.push({
        code: productValuesLineSplitted[0],
        new_price: productValuesLineSplitted[1]
      })
    }
  return products
}