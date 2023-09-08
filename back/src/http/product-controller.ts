import {Request, Response} from "express"
import { cloneDeep } from 'lodash';

import { updatePricesInMemory } from "../use-cases/update-products-price";
import { SplitCsvFile } from "../use-cases/split-csv-file";
import { SearchForInvalidCode } from "../use-cases/seach-for-invalid-code";

import { FileNotSendError } from "../use-cases/errors/file-not-send.error";
import { CodeNotFoundError } from "../use-cases/errors/code-not-found-error";
import { PriceBelowErrorLimit } from "../use-cases/errors/price-below-cost-limit-error";
import { PriceExceedLimitError } from "../use-cases/errors/price-exceed-limit-error";

import { MySqlFindPackByCode } from "../repositories/mysql/mysql-find-pack-by-code";
import { MySqlFindProductsByCode } from "../repositories/mysql/mysql-find-products-by-code";
import { MysqlUpdateProdutsByCode } from "../repositories/mysql/mysql-update-products-by-code";
import { MySqlFindAllProducts } from "../repositories/mysql/mysql-find-all-products";
import { MySqlFindAllPacks } from "../repositories/mysql/mysql-find-all-packs";
import { InvalidValuesError } from "../use-cases/errors/invalid-values-error";
import { CreateOldPriceField } from "../use-cases/create-old-price-field";


interface ProductUpdate {
  code: number
  new_price: number
}

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

export class ProductsController {
  //Rota para validar o arquivo csv
  static async validateProducts(request: Request, response: Response){
    const buffer = request.file?.buffer.toString('utf-8')
    if(!buffer){
      throw new FileNotSendError()
    }
    const products: ProductUpdate[] = SplitCsvFile(buffer)
    
    try {
      // Verifica o conteúdo do array
      if (products.some(product => isNaN(product.code) || isNaN(product.new_price))) {
        throw new InvalidValuesError()
      }
      //Criação dos placeholders que serão passados na consulta ao banco de dados
      const codes = products.map((product) => product.code);

      const PackQuery = await MySqlFindPackByCode(codes)
      
      //adicionando os códigos dos pacotes que precisam ser adicionados por consequência
      if(PackQuery.length){
        for(let packsProducts of PackQuery){
          codes.push(packsProducts.product_id, packsProducts.pack_id)
        }
      }
      const ProductQuery = await MySqlFindProductsByCode(codes)
      //Junção dos novos preços e produtos que precisam ser atualizados
      const result: (PackInSystem | ProductInSystem)[] = [...ProductQuery, ...PackQuery]
      
      const valoresNaoPresentes = SearchForInvalidCode(result, products)
      
      if(valoresNaoPresentes.length){
        throw new CodeNotFoundError()
      }
      //Verificação de erro dentro dos novos preços
      for (const firstObject of products) {
        const LowerCostPrice = ProductQuery.some(secondObject => secondObject.code === firstObject.code && secondObject.cost_price>firstObject.new_price);
        const tenPercentDiference = ProductQuery.some(secondObject => secondObject.code === firstObject.code && (firstObject.new_price>secondObject.sales_price*1.1 || firstObject.new_price<secondObject.sales_price*0.9));
        if(LowerCostPrice){
          throw new PriceBelowErrorLimit()
        }
        if(tenPercentDiference){
          throw new PriceExceedLimitError()
        }
  
      }
      return response.send({newPriceProducts: products, productsToUpdate: result}).status(200);
    } catch (err: any) {
      console.error(err);
      return response.status(500).send(err.message);
    }
  }

  static async updateProducts(request: Request, response: Response){
    const oldProducts = JSON.parse(JSON.stringify(request.body.productsToUpdate))
    const {newPriceProducts, productsToUpdate} = JSON.parse(JSON.stringify(request.body))

    //Realizando a atualização dos valores em memória
    const updatedPrices = updatePricesInMemory(newPriceProducts, productsToUpdate)

    //Filtrando apenas os produtos sem a tabela de packs
    const oldProductsPrice = oldProducts.filter((product: { sales_price: number; }) => product.sales_price !== undefined);

    //Criando um campo de preço atual para mostrar no frontend
    const result = CreateOldPriceField(updatedPrices, oldProductsPrice)

    try {
      //Atualizando os produtos no mysql
      await MysqlUpdateProdutsByCode(updatedPrices)
      return response.status(200).send(result)
    }catch{
      return response.status(500).send("Erro interno do servidor")
    }
  }
  //Exibir todos os produtos
  static async showAllProducts(request: Request, response: Response){
    try {
      const result = await MySqlFindAllProducts()

      return response.send(result);
    } catch (err) {
      console.error(err);
      return response.status(500).send("Erro interno do servidor");
    } 
  }
  //Exibir todos os packs
  static async showAllPacks(request: Request, response: Response){
    try {
      const result = await MySqlFindAllPacks()

      return response.send(result);
    } catch (err) {
      console.error(err);
      return response.status(500).send("Erro interno do servidor");
    }
  } 
}