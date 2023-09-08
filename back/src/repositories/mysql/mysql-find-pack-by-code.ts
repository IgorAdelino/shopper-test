import { db } from "../../database/database";

type PackInSystem = {
  id: number,
  pack_id: number,
  product_id: number,
  qty: number
}

export async function MySqlFindPackByCode(codes: number[]){
  const packsPlaceHolders = codes.map(() => "?").join(",");
      
      const PacksQuery = `
      SELECT *
      FROM packs as pk
      WHERE pk.product_id IN (${packsPlaceHolders}) OR pk.pack_id IN (${packsPlaceHolders})
    `;
      // duas querys, pois uma só estava devolvendo os campos de forma repetida
      const PackQuery: (PackInSystem)[] = await new Promise<any>((resolve, reject) => {
        db.query(PacksQuery, [...codes, ...codes], (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  return PackQuery
    
}