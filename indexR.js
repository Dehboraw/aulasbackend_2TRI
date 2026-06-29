const express = require('express')
const app = express()
const port = 3002
app.use(express.json())
const fs = require('fs')


//GET /musicas ok 
//GET /musicas/:id ok
//POST /musicas ok
//DELETE /musicas/:id ok
//GET /musicas/estilo/:estilo


//GET /musicas
app.get("/musicas", (req, res) => {
    try{
        const musicas = JSON.parse(fs.readFileSync('bdM.json', 'utf-8'))
        res.status(200).json(musicas)
    } catch (error){
        res.status(500).json({resposta: error.message})
    }
})
//GET /musicas/:id
app.get("/musicas/:id", (req, res) => {
    const id = req.params.id
    try{
        const musicas = JSON.parse(fs.readFileSync('bdM.json', 'utf-8'))
        const musica_encontrada = musicas.find((musica) => musica.id == id)
        if (!musica_encontrada){
            res.status(404).json({erro: "Não existe esse id"})
        }
        res.status(200).json(musica_encontrada)
    } catch (error){
        res.status(500).json({reposta: error.message})
    }
})
//POST /musicas
app.post("/musicas", (req, res) => {
    const musica = req.body
    if (!musica || Object.keys(musica).length === 0){
        res.status(400).json({resposta:"Body não preechido"})
    } else {
        try{
            const bd = JSON.parse(fs.readFileSync('bdM.json', 'utf-8'))
            bd.push(musica)
            fs.writeFileSync('bdM.json', JSON.stringify(bd), 'utf-8')
            res.status(201).json({resposta: "Música adicionada"})
        } catch(error){
            res.status(500).json({resposta: error.message})
        }
    }
})
//DELETE /musicas/:id
app.delete("/musicas/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body
    try{
        const musicas = JSON.parse(fs.readFileSync('bdM.json', 'utf-8'))
        const indice_musica = musicas.findIndex((musica) => musica.id == id)
        if (indice_musica == -1){
            return res.status(404).json({resposta: "Música não encontrada"})
        }
        musicas.splice(indice_musica, 1)
        fs.writeFileSync('bdM.json', JSON.stringify(musicas), 'utf-8')
        res.status(200).json({resposta: "Música deletada!"})
    } catch{
        res.status(500).json({resposta: error.message})
    }
})

//GET /musicas/estilo/:estilo
app.get("/musicas/estilo/:estilo", (req, res) => {
    const estilo = req.params.estilo
    try{
        const musicas = JSON.parse(fs.readFileSync('bdM.json', 'utf-8'))
        const musica_encontrada = musicas.filter((musica) => musica.estilo == estilo)
        if (!musica_encontrada){
            res.status(404).json({erro: "Não existe esse estilo"})
        }
        res.status(500).json(musica_encontrada)
    } catch{
        res.status(500).json({reposta: error.message})
    }
})
app.listen(port, () => { // arrow function 
    console.log("API executando na porta "  + port)
})
