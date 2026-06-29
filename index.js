// npm init 
// npm i express
// baixar extensão RapidAPI Client no VSCode
const express = require('express') // importação
const app = express() // o app vai executar o express
const port = 3000 // portas que tem um objetivo, se a porta 3000 não tem função, posso utilizar ela
app.use(express.json()) //sere para API entender um arquivo JSON
const fs = require('fs')

// req - request ; res - response
//CRUD 

// CREATE cliente 
app.post("/clientes", (req, res) => {
    //pegar os dados que vem do usuário, POST serve para criar/create dados
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0){
        res.status(400).json({resposta:"Body não preenchido"})
    } else {
        try{
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf-8')) //JSON.parse serve para conversão para obj
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf-8')
            //confirmar
            res.status(201).json({resposta: "Cliente cadastrado com sucesso!"}) // status 200 para dizer que deu certo, o 201 é especíico para o post
        } catch(error){
            res.status(500).json({resposta: error.message})
        }
    }
})
// READ cliente
app.get("/clientes", (req, res) => {  
    try{
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf-8')) // ler o aquivo
        res.status(200).json(clientes) 
    } catch (error){
        res.status(500).json({reposta: error.message})
    }
    
}) 
// GET cliente
app.get("/clientes/:cpf", (req, res) => {  
    const cpf = req.params.cpf
    try{
        // Aqui eu leio e crio a variável que eu vou usar
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const cliente_encontrado = clientes.find((cliente) => cliente.cpf.replace(/\D/g, "") == cpf) // encontra o cliente e cria uma variável 
        if (!cliente_encontrado){
            res.status(404).json({erro: "Cliente não existe no banco de dados!"})
        }
        res.status(200).json(cliente_encontrado)
    } catch (error){
        res.status(500).json({reposta: error.message})
    }
}) 
// DELETE cliente
app.delete("/clientes/:cpf", (req, res) => {  
    const cpf = req.params.cpf
    const dados = req.body
    try{
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const indice_cliente = clientes.findIndex(
            (cliente)=> cliente.cpf.replace(/\D/g, "") == cpf)
        if (indice_cliente == -1){
            return res.status(404).json({resposta: "Cliente não encontrado!"})
        }
        clientes.splice(indice_cliente, 1)
        fs.writeFileSync('bd.json', JSON.stringify(clientes), 'utf-8')
        res.status(200).json({resposta: "Cliente deletado com sucesso!"})
        } catch (error){
            res.status(500).json({resposta: error.message})
        }

    })
// PUT cliente
app.put("/clientes/:cpf", (req, res)=>{
    const cpf = req.params.cpf
    const dados = req.body
    try{
        const clientes = JSON.parse(fs.readFileSync('bd.json', 'utf-8'))
        const indice_cliente = clientes.findIndex(
            (cliente)=> cliente.cpf.replace(/\D/g, "") == cpf)
        if (indice_cliente == -1){
            return res.status(404).json({resposta: "Cliente não encontrado!"})
        }
        clientes[indice_cliente] = dados
        fs.writeFileSync('bd.json', JSON.stringify(clientes), 'utf-8')
        res.status(200).json({resposta: "Cliente alterado com sucesso!"})
        } catch (error){
            res.status(500).json({resposta: error.message})
        }

    })


app.listen(port, () => { // arrow function 
    console.log("API executando na porta "  + port)
})

