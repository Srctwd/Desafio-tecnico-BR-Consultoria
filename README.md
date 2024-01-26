## Technical challange - BR Consultoria
#### REST API using TypeScript Node.js and Postgres.
###### &nbsp;&nbsp;
Existem dois endpoints principais, um GET e outro POST. O endpoint GET, /vendas/:p recebe parâmetros do usuário, usados para filtrar a tabela, e então envia ao cliente o resultado da query. Ele possui os seguintes parâmetros: 
+ bandeira
+ id_adquirente
+ data_venda.

Esses são utilizados colocando o sinal de interrogação na URL após a página, por exemplo:
```
/vendas/1?bandeira=Mastercard

Também podem ser aninhados utilizando o E comercial '&'

/vendas/1?bandeira=Mastercard&id_adquirente=2
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O endpoint POST /vendas/ cadastra vendas em um banco de dados PostgreSQL. Para fazer isso, deve receber uma requisição POST contendo no corpo da requisição um arquivo JSON com as informações da venda que irá ser cadastrada. Os objetos necessários são o valor da compra, número do cartão, id do adquirente, número de parcelas, id da bandeira do cartão e data da venda. O JSON válido se parece com isto:
```
{
    "valor" : "19,90",
    "numero_cartao": "52060140923685426442",
    "id_adquirente" : "2",
    "numero_parcelas" : "1",
    "id_bandeira_cartao" : "52",
    "data_venda": "23/01/2023"
}
```
Para iniciar o projeto, basta executar:
```
npm start
```
Esse comando vai iniciar uma instância em localhost/3001.

O postgreSQL é o banco de dados utilizado. para instalar esse banco em distribuições baseadas no Debian basta executar:
```
sudo apt install postgresql
```
Para acessar, basta executar no terminal:
```
sudo -u postgres psql
```
Após a criação do banco de dados, não se esqueça de conectar antes de executar os scripts:
```
\c db
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Na pasta db_scripts, você encontrará os comandos para a criação das tabelas usadas no projeto, também como o procedure para popular a tabela de referência para a bandeira do cartão e permissões para o usuário.
No projeto, o módulo db_connect é responsável por guardar as variáveis necessárias para fazer a conexão com o banco.

#### Melhorias futuras
###### Uso do dotenv para as variáveis de conexão.
###### Front usando o React.js e cors para melhor visualização dos dados da API.
