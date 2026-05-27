// npm init 
// npm i express
// baixar extensão RapidAPI Client no VSCode
const express = require('express') // importação
const app = express() // o app vai executar o express
const port = 3001 // portas que tem um objetivo, se a porta 3000 não tem função, posso utilizar ela
app.use(express.json()) //sere para API entender um arquivo JSON
const fs = require('fs')

app.get("/ola", (req, res)=>{ // req - request ; res - response
    res.json({resposta: "Hello World!"})
})

app.post("/clientes/cadastro", (req, res)=>{
    //pegar os dados que vem do usuário, POST serve para enviar dados
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0){
        res.status(400).json({resposta:"Body não preenchido"})
    } else {
        try{
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf-8')) //JSON.parse serve para conversão para obj
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf-8')
            //confirmar
            res.status(200).json({resposta: "Cliente cadastro com sucesso!"}) // status 200 para dizer que deu certo
        } catch(error){
            res.status(500).json({resposta: error.message})
        }
    }
    //salvar no bd.json
    
   
})

app.get("/livros", (req, res)=>{   // ("/something") serve para criar um endereço. 
    const livros = require("./livros.json") // importa do bd já existente em JSON.
    res.json({resposta: livros}) // para que serve esse .json dai??????? padronizar
})

app.listen(port, ()=>{ // arrow function 
    console.log("API executando na porta "  + port)
})


// -> Testar as 3 saídas  possíveis (400, 500 e 200)   OK
// -> Cadastrar pelo menos 3 clientes, com os dados completos. OK
// -> Salvar o JSON enviado "body" para uso no futuro, com nome de "modeloCliente.json"  OK