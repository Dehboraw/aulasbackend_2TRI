// npm init 
// npm i express
// baixar extensão RapidAPI Client no VSCode
const express = require('express') // importação
const app = express() // o app vai executar o express
const port = 3000 // portas que tem um objetivo, se a porta 3000 não tem função, posso utilizar ela

app.get("/ola", (req, res)=>{ // req - request ; res - response
    res.send("Hello World!")
})

app.get("/livros", (req, res)=>{   // ("/something") serve para criar um endereço. 
    const livros = require("./livros.json") // importa do bd já existente em JSON.
    res.json({resposta: livros}) // para que serve esse .json dai???????
})

app.listen(port, ()=>{ // arrow function 
    console.log("API executando na porta "  + port)
})
