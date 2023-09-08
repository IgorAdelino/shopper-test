import { db } from "../../database/database";

type ProductInSystem = {
  code: number
  cost_price: number
  sales_price: number
  description: string
}

export async function MySqlFindProductsByCode(codes: number[]){
  const productsPlaceHolders = codes.map(() => "?").join(",");

      const ProductsQuery = `
      SELECT *
      FROM products as p
      WHERE p.code IN (${productsPlaceHolders})
    `;
      

      const ProductQuery: (ProductInSystem)[] = await new Promise<any>((resolve, reject) => {
        db.query(ProductsQuery, codes, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    return ProductQuery
    
}