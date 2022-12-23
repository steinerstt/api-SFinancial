# api-SFinancial

![GitHub](https://img.shields.io/github/license/steinerstt/api-sfinancial?style=for-the-badge)

<br>

![api-sfinancial](https://github.com/steinerstt/screenshots-projects/blob/main/api-SFinancial/der.png?raw=true)
> Api desenvolvida para a SFinancial, uma aplicação Front-end que tem como intuíto de ser um gerenciador financeiro. 

<br>

## 🛠️ Algumas tecnologias
### Esta api foi desenvolvida com as principais tecnologias
- **Node.js**
- **Express.js**
- **TypeScript**
- **Typeorm**
- **Bcrypt**
- **Jsonwebtoken**
- **Yup**
- **PostgreSQL**

## 📌 Features
- [x] Usuário
   - [x] Cadastro de usuário
   - [x] Login
   - [x] Atualização de cadastro
      - [x] Admin pode atualizar qualquer cadastro 
   - [x] Desativação conta
      - [x] Admin pode desativar qualquer conta
   - [x] Reativação da conta
   - [x] Deletar conta
      - [x] Admin pode deletar qualquer conta 
- [x] Transações
   - [x] Adicionar transação 
   - [x] Buscar transação específica
   - [x] Atualizar transação
      - [x] Admin pode atualizar qualquer transação 
   - [x] Remover transação
      - [x] Admin pode remover qualquer transação 
 - [x] Exclusivo do Admin
   - [x] Buscar todos os usuários cadastrados na plataforma
   - [x] Buscar todas as transações cadastradas na plataforma 

---

<br>

# 📋 Documentação
## 🔰 Base url: 

## Cadastro de usuário
- ### POST /users

Body 
````JSON
{
 "name": "Steiner",
 "email": "d@gmail.com",
 "password": "1234"
}
````
Retorno esperado - 200
````JSON
{
 "updated_at": "2022-12-21T16:47:59.746Z",
 "created_at": "2022-12-21T16:47:59.746Z",
 "is_adm": false,
 "is_active": true,
 "email": "d@mail.com",
 "name": "Steiner",
 "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
}
````

Possíveis erros

status - 409
````JSON
{
  "message": "Email already registered"
}
````
status - 400
````JSON
{
  "message": [
    "name is a required field",
    "email is a required field",
    "password is a required field"
  ]
}
````

<br>

## Login de usuário
- ### POST /login

Body
````JSON
{
  "email": "d@gmail.com",
  "password": "1234"
}
````

Retorno esperado - 200
````JSON
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZWluZXJAbWFpbC5jb20iLCJpYXQiOjE2NzE2NDg0ODMsImV4cCI6MTY3MTgyMTI4
 Mywic3ViIjoiMmU0ZmM1YjktNmRkZS00NzI2LWJmODctNWQ1NmMxYjA1MzA3In0.rtbTWVuY54C2hr0kSVhhky6M8pruxhR-1AtOXDGjl0M",
 "user": {
  "updated_at": "2022-12-21T17:49:24.376Z",
  "created_at": "2022-12-21T16:47:59.746Z",
  "transactions": [
   {
    "updated_at": "2022-12-21T18:14:05.246Z",
    "created_at": "2022-12-21T18:14:05.246Z",
    "transaction_date": "2022-12-21",
    "type": "Saída",
    "value": 29098,
    "name": "Abastecimento do carro",
    "id": "4333f72f-7358-4b18-b0ba-f10930a823e6"
   },
   {
    "updated_at": "2022-12-21T18:39:38.297Z",
    "created_at": "2022-12-21T18:20:49.640Z",
    "transaction_date": "2022-12-22",
    "type": "Entrada",
    "value": 490076,
    "name": "Manutenção em projeto - Freela",
    "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
   }
 ],
  "is_adm": false,
  "is_active": true,
  "email": "steiner@mail.com",
  "name": "Diogo Steiner",
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 }
}
````

Possíveis erros

status - 400
````JSON
{
  "message": [
    "email is a required field",
    "password is a required field"
  ]
}
````


status - 401
````JSON
{
  "message": "Email or password invalid"
}	
````
````JSON
{
 "message": "User account deactivated",
 "user": {
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307",
  "name": "Diogo Steiner"
 }
}
````

<br>

## Exlusão de usuário
- ### DELETE /users/${id}

Requer autenticação - Bearer token
````JavaScript 
{
  headers : {"Authorization": `Bearer ${token}`}
}

````

Retorno esperado - 204 - No Content

````JSON
````

Possíveis erros

status - 400
````JSON
{
 "message": "User not found"
}
````

status - 401
````JSON
{
 "message": "Permission admin required"
}
````
> Caso o usuário que não seja admin tente deletar outro usuário.


<br>

## Atualização de cadastro do usuário
- ### PATCH /users/${id}

Requer autenticação - Bearer token
````JavaScript 
{
  headers : {"Authorization": `Bearer ${token}`}
}
````

Body 
````JSON
{
 "name": "Diogo Steiner",
 "email": "steiner@mail.com",
 "password": "123456"
}
````
> Os campos possíveis de alteração são: name, email ou password.

Retorno esperado - 200
````JSON
{
 "updated_at": "2022-12-21T17:01:25.278Z",
 "created_at": "2022-12-21T16:47:59.746Z",
 "transactions": [],
 "is_adm": false,
 "is_active": true,
 "email": "steiner@mail.com",
 "name": "Diogo Steiner",
 "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
}
````

Possíveis erros

status - 409
````JSON
{
 "message": "Email already registered"
}
````

status - 401
````JSON 
{
 "message": "Permission admin required"
}
````
 > Caso um usuário que não seja admin tente alterar dados de outro usuário.

 <br>

## Desativar conta de usuário
- ### PATCH /users/${id}/account/deactivate

Requer autenticação - Bearer token
````JavaScript 
{
  headers : {"Authorization": `Bearer ${token}`}
}
````

Retorno esperado - 200
````JSON
{
 "message": "User account deactivated"
}
````

Possíveis erros

status - 404
````JSON
{
 "message": "User not found"
}
````

status - 401
````JSON
{
 "message": "Permission admin required"
}
````
> Caso um usuário não seja admin tente desativar a conta de outro usuário.

<br>

## Ativar conta do usuário
- ### PATCH /users/${id}/account/activate

Body
````JSON
{
 "password": "1234"
}
````

Retorno esperado - 200
````JSON
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZWluZXJAbWFpbC5jb20iLCJpYXQiOjE2NzE2NDg0ODMsImV4cCI6MTY3MTgyMTI4
 Mywic3ViIjoiMmU0ZmM1YjktNmRkZS00NzI2LWJmODctNWQ1NmMxYjA1MzA3In0.rtbTWVuY54C2hr0kSVhhky6M8pruxhR-1AtOXDGjl0M",
 "user": {
  "updated_at": "2022-12-21T17:49:24.376Z",
  "created_at": "2022-12-21T16:47:59.746Z",
  "transactions": [
   {
    "updated_at": "2022-12-21T18:14:05.246Z",
    "created_at": "2022-12-21T18:14:05.246Z",
    "transaction_date": "2022-12-21",
    "type": "Saída",
    "value": 29098,
    "name": "Abastecimento do carro",
    "id": "4333f72f-7358-4b18-b0ba-f10930a823e6"
   },
   {
    "updated_at": "2022-12-21T18:39:38.297Z",
    "created_at": "2022-12-21T18:20:49.640Z",
    "transaction_date": "2022-12-22",
    "type": "Entrada",
    "value": 490076,
    "name": "Manutenção em projeto - Freela",
    "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
   }
 ],
  "is_adm": false,
  "is_active": true,
  "email": "steiner@mail.com",
  "name": "Diogo Steiner",
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 }
}
````

Possíveis erros

status - 404
````JSON
{
 "message": "User not found"
}
````

status- 400
````JSON
{
 "message": [
  "password is a required field"
 ]
}
````

status - 409
````JSON
{
 "message": "Password invalid"
}
````

<br>

## Adicionar transação
- ### POST /transactions

Requer autenticação - Bearer token
````JavaScript 
{
 headers : {"Authorization": `Bearer ${token}`}
}
````

Body
````JSON
{
 "name": "Manutenção em projeto",
 "value": "3900.76",
 "type": "Entrada",
 "transaction_date": "2022-12-21"
}
````
> A propriedade TYPE só aceita os seguintes valores: Saída || Entrada

Retorno esperado - 201
````JSON
{
 "updated_at": "2022-12-21T18:20:49.640Z",
 "created_at": "2022-12-21T18:20:49.640Z",
 "user": {
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 },
 "transaction_date": "2022-12-21",
 "type": "Entrada",
 "value": 390076,
 "name": "Manutenção em projeto",
 "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
}
````

Possíveis erros

status - 400
````JSON
{
 "message": [
  "name is a required field",
  "value is a required field",
  "type is a required field",
  "transaction_date is a required field"
 ]
}
````
````JSON
{
 "message": [
  "The date must be in the following format: yyyy-mm-dd"
 ]
}
````
````JSON
{
 "message": [
  "type must be at least 5 characters",
  "Only Entrada or Saída"
 ]
}
````

<br>

## Remover transação
- ### DELETE /transactions/${id}

Requer autenticação - Bearer token
````JavaScript 
{
 headers : {"Authorization": `Bearer ${token}`}
}
````

Retonor esperado - 204 - No Content
````JSON
````

Possíveis erros

status - 400
````JSON
{
 "message": "Transaction not found"
}
````

status - 401
````JSON
{
 "message": "Permission admin required"
}
````
> Case o usuário tente deletar uma transação que não é dele.

<br>

## Atualizar transação
- ### PATCH /transactions/${id}

Requer autenticação - Bearer token
````JavaScript 
{
 headers : {"Authorization": `Bearer ${token}`}
}
````

Body 
````JSON
{
 "name": "Manutenção em projeto - Freela",
 "value": "4900.76",
 "type": "Entrada",
 "transaction_date": "2022-12-22"
}
````
> Pode ser alterado as seguintes propriedades: name, value, type ou transaction_date.


Retoro esperado - 200
````JSON
{
 "updated_at": "2022-12-21T18:39:38.297Z",
 "created_at": "2022-12-21T18:20:49.640Z",
 "user": {
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 },
 "transaction_date": "2022-12-22",
 "type": "Entrada",
 "value": 490076,
 "name": "Manutenção em projeto - Freela",
 "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
}
````

Possíveis erros

status - 404
````JSON
{
 "message": "Transaction not found"
}
````
````JSON
{
 "message": [
  "The date must be in the following format: yyyy-mm-dd"
 ]
}
````
````JSON
{
 "message": [
  "type must be at least 5 characters",
  "Only Entrada or Saída"
 ]
}
````

status - 401
````JSON
{
 "message": "Permission admin required"
}
````
> Case o usuário tente atualizar uma transação que não é dele.

<br>

## Buscar transação
- ### GET /transactions/${id}

Requer autenticação - Bearer token
````JavaScript 
{
 headers : {"Authorization": `Bearer ${token}`}
}
````

Retorno esperado - 200
````JSON
{
 "updated_at": "2022-12-21T18:39:38.297Z",
 "created_at": "2022-12-21T18:20:49.640Z",
 "user": {
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 },
 "transaction_date": "2022-12-22",
 "type": "Entrada",
 "value": 490076,
 "name": "Manutenção em projeto - Freela",
 "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
}
````

Possíveis erros

status - 404
````JSON
{
 "message": "Transaction not found"
}
````

status - 401
````JSON
{
 "message": "Permission admin required"
}
````
> Case o usuário tente buscar uma transação que não é dele.


<br>
<br>

# Rotas admin

## Buscar todos os usuários cadastrados
- ### GET /users

Requer autenticação - Bearer token
````JavaScript 
{
  headers : {"Authorization": `Bearer ${token}`}
}
````

Retorno esperado - 200
````JSON
[
 {
  "updated_at": "2022-12-21T16:53:06.256Z",
  "created_at": "2022-12-21T16:53:06.256Z",
  "transactions": [],
  "is_adm": false,
  "is_active": true,
  "email": "d2@mail.com",
  "name": "Diogo Steiner",
  "id": "82015c83-83c0-43c1-b9c4-2216018fea1f"
 },
 {
  "updated_at": "2022-12-21T17:49:24.376Z",
  "created_at": "2022-12-21T16:47:59.746Z",
  "transactions": [
   {
    "updated_at": "2022-12-21T18:39:38.297Z",
    "created_at": "2022-12-21T18:20:49.640Z",
    "transaction_date": "2022-12-22",
    "type": "Entrada",
    "value": 490076,
    "name": "Manutenção em projeto - Freela",
    "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
   },
   {
    "updated_at": "2022-12-21T18:14:05.246Z",
    "created_at": "2022-12-21T18:14:05.246Z",
    "transaction_date": "2022-12-21",
    "type": "Saída",
    "value": 29098,
    "name": "Abastecimento do carro",
    "id": "4333f72f-7358-4b18-b0ba-f10930a823e6"
   }
  ],
  "is_adm": false,
  "is_active": true,
  "email": "steiner@mail.com",
  "name": "Diogo Steiner",
  "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
 },
 {
  "updated_at": "2022-12-21T16:52:56.350Z",
  "created_at": "2022-12-21T16:52:56.350Z",
  "transactions": [],
  "is_adm": true,
  "is_active": true,
  "email": "d1@mail.com",
  "name": "Diogo",
  "id": "fbd70d65-f8a8-48d4-a646-42becbb0483f"
 }
]
````

<br>

## Buscar todas as transações cadastradas

- ### GET /transactions

Requer autenticação - Bearer token
````JavaScript 
{
  headers : {"Authorization": `Bearer ${token}`}
}
````

Retorno esperado - 200
````JSON
[
 {
  "updated_at": "2022-12-21T18:14:05.246Z",
  "created_at": "2022-12-21T18:14:05.246Z",
  "user": {
   "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
  },
  "transaction_date": "2022-12-21",
  "type": "Saída",
  "value": 29098,
  "name": "Abastecimento do carro",
  "id": "4333f72f-7358-4b18-b0ba-f10930a823e6"
 },
 {
  "updated_at": "2022-12-21T18:39:38.297Z",
  "created_at": "2022-12-21T18:20:49.640Z",
  "user": {
   "id": "2e4fc5b9-6dde-4726-bf87-5d56c1b05307"
  },
  "transaction_date": "2022-12-22",
  "type": "Entrada",
  "value": 490076,
  "name": "Manutenção em projeto - Freela",
  "id": "c25c1d19-e9fd-4eda-9e0f-344a79ac03a5"
  }
]
````

<br>

## 📄 Licença
Este projeto está sob a licença do MIT - veja o arquivo [LICENSE](https://github.com/steinerstt/kenzie-hub/blob/main/LICENSE) para detalhes.

Feito com ❤ por [Steiner](https://github.com/steinerstt)





