export function updatePricesInMemory(newPriceProducts: any[], productsToUpdate: any[]){
  const result:any[] = []
    productsToUpdate.map((product: { code: any; sales_price: any; product_id: any; pack_id:any; qty: any }) => {
      // Encontra o objeto correspondente em newPriceProducts com base no code
      const newPriceProduct = newPriceProducts.find((item: { code: any; }) => item.code === product.code);
    
      if (newPriceProduct) {
        if(newPriceProduct.code === product.code){
          const productInPack = productsToUpdate.find((item:any) => item.product_id === product.code)
          //altera o preço do pack a partir do preço do produto
          if(productInPack){
            
              const getPackOfProductInPack = productsToUpdate.find((item:any) => item.code === productInPack.pack_id)
            
              if(getPackOfProductInPack){
                
                getPackOfProductInPack.sales_price = (getPackOfProductInPack.sales_price - product.sales_price*productInPack.qty) + (newPriceProduct.new_price*productInPack.qty)
                
                result.push(getPackOfProductInPack)
              }
          
          }
          //altera o preço do produto a partir do preço do pack
          const packInProduct = productsToUpdate.find((item:any) => item.pack_id === product.code)
          if(packInProduct){
            const moreThanOnePack = productsToUpdate.filter((item: any) => item.pack_id === packInProduct.pack_id)
            if(moreThanOnePack.length===0){
              const getProductOfPack = productsToUpdate.find((item: any) => item.code === packInProduct.product_id)
              if(getProductOfPack){
                getProductOfPack.sales_price = parseFloat((newPriceProduct.new_price/packInProduct.qty).toFixed(2))
                result.push(getProductOfPack)
              }
            }else{
              for(let pack of moreThanOnePack){
                const getProductOfPack = productsToUpdate.find((item: any) => item.code === pack.product_id)
                const productPercentageInPack = (getProductOfPack.sales_price*pack.qty)/product.sales_price
              if(getProductOfPack){
                getProductOfPack.sales_price = parseFloat((newPriceProduct.new_price*productPercentageInPack/pack.qty).toFixed(2))
                
                
                result.push(getProductOfPack)
              }
              }
            }
            
          }
          product.sales_price = newPriceProduct.new_price;
        }
        
        result.push(product)
      }
      
    });
    const update = result.filter((item, index, self) => self.indexOf(item) === index);
    return update;
}