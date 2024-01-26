# Technical challange - BR Consultoria
#### REST API using TypeScript Node.js and Postgres



###### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Existem dois endpoints principais, um GET e outro POST. O endpoint GET, /vendas/:p recebe parâmetros do usuário, usados para filtrar a tabela, e então envia ao cliente o resultado da query. Ele possui os seguintes parâmetros: bandeira, id_adquirente e data_venda. Esses são utilizados colocando o sinal de interrogação na URL após a página, por exemplo: /vendas/1?bandeira=Mastercard &nbsp;Também podem ser usados em conjunto usando o E comercial '&': /vendas/1?bandeira=Mastercard&id_adquirente=2
###### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O endpoint POST /vendas/ cadastra vendas em um banco de dados PostgreSQL. Para fazer isso, deve receber uma requisição POST contendo no corpo da requisição um arquivo JSON com as informações da venda que irá ser cadastrada. Os objetos necessários são o valor da compra, número do cartão, id do adquirente, número de parcelas, id da bandeira do cartão e data da venda. O JSON válido se parece com isto:
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
