import { db } from "../../database/database";

export async function MySqlFindAllProducts(){
  const result = await new Promise<any>((resolve, reject) => {
     db.query('SELECT * FROM products', (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
    
  });
  return result
}