
# ![image](https://github.com/IgorAdelino/shopper-test/assets/117618427/0cbdf638-19c4-4e9c-9950-060ea6a0e19b)  shopper-test  

- Aplicação Fullstack feita durante teste técnico da shopper que atualiza valores de pacotes e produtos no banco de dados a partir de arquivos CSV. Utilizando Typescript, Node e React

## RFs (Requisitos funcionais)

- [x] Deve ser possível fazer upload de um arquivo .csv;
- [x] Deve ser possível alterar o preço de venda de um produto;
- [x] Deve ser possível alterar o preço de venda de um pacote;
- [x] Deve ser possível obter o novo preço de venda do produto alterado;
- [x] Deve ser possível obter o novo preço de venda do pacote alterado;
- [x] Deve ser possível obter o antigo preço de venda do pacote alterado;
- [x] Deve ser possível obter o antigo preço de venda do pacote alterado;

## RNs (Regras de negócios)

- [x] O usuário só deve poder fazer upload de arquivo csv;
- [x] O arquivo não deve possuir campos além de números que são o código e o preço do produto;
- [x] O arquivo csv deve possuir códigos presentes no banco de dados;
- [x] O usuário não deve poder reajustar o valor do produto para menor do que seu valor de custo;
- [x] O usuário não pode poder reajustar o valor acima ou abaixo do limite de 10% do valor de venda;
- [x] O preço do produto deve ser alterado conforme o novo preço do pacote;
- [x] O preço do pacote deve ser alterado conforme o preço do produto;
- [x] A alteração do preço de um kit deve alterar os preços dos produtos proporcionalmente;

## RNFs (Requisitos não-funcionais)

- [x] Os dados da aplicação precisam estar persistidos em um banco MySql;
- [x] O envio do arquivo deve ser conferido por um middleware;

## Instalação
- Clone meu repositório
```bash
  https://github.com/IgorAdelino/shopper-test.git
```

- Instale o backend do meu projeto com npm
```bash
  cd back
  npm install
```

- Instale o frontend do meu projeto com npm
```bash
  cd front
  npm install
```

## Variáveis Ambiente

- Com a tabela já criada no seu banco de dados, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env conforme o .env.example no backend da aplicação
  
`HOST`
`USER`
`PASSWORD`
`DATABASE_NAME`
`DATABASE_PORT`

## Inicialize a aplicação

- Inicie o servidor no backend
```bash
  cd back
  npm run start:dev
```
- Inicie o servidor no frontend
```bash
  cd front
  npm run dev
```

## Exemplo de conteúdo do arquivo.csv
-Código e Novo preço de venda do produto (Separados por vírgula)
```bash
  18,9.56
  1020,58.00
  1000,56
```

## Funcionalidade

- Escolha um arquivo .csv e aperte em validar

![image](https://github.com/IgorAdelino/shopper-test/assets/117618427/002bef85-5fab-4d2d-a0bd-5bfd4bac696d)

- Após a validação do arquivo, aperte em atualizar

![image](https://github.com/IgorAdelino/shopper-test/assets/117618427/bad24011-3598-474e-bc5e-04d67894d509)

- Após a atualização serão exibidos os produtos com os respectivos códigos, novos preços e preços atuais

![image](https://github.com/IgorAdelino/shopper-test/assets/117618427/e07caa65-ece3-4f42-9293-c4214d0e2a3b)

## Tecnologias utilizadas

- Backend
`Typescript`
`Node`
`Express`
`Mysql`
`Multer`
`Tsx`
`Tsup`
`Dontenv`
`Zod`

- Frontend
`Typescript`
`React`
`Vite`
`MaterialUi`
`Bootstrap`
`Axios`

## Aprendizado

- É sempre muito satisfatório concluir um desafio, e nós como desenvolvedores temos o dever de vencê-los. Agradeço a shopper pela oportunidade em providenciar o teste técnico que me rendeu mais conhecimento
e claro, proporcionou um aprendizado indescritível! Esse pequeno projeto, mesmo em um curto período de tempo, me fez querer aprender cada vez mais e estou disposto a enfrentar novos obstáculos e evoluir como profissional.
Para você que está lendo até aqui, agradeço demais pela atenção!





