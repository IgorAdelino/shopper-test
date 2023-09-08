import { db } from "../../database/database";

export async function MysqlUpdateProdutsByCode(result: any[]){
  for (const update of result) {
    const { code, sales_price } = update;

    const updateQuery = `
      UPDATE products
      SET sales_price = ?
      WHERE code = ?
    `;

    db.query(updateQuery, [sales_price, code], (err, results) => {
      if (err) {
        console.error(err);
        db.rollback(() => {
          console.log('Transação revertida devido a erro.');
        });
      } else {
        console.log(`Atualização concluída para o código ${code}.`);
      }
    });
  }
    
}