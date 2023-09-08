import { db } from "../../database/database";

export async function MySqlFindAllPacks(){
  const result = await new Promise<any>((resolve, reject) => {
    db.query('SELECT * FROM packs', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return result
}