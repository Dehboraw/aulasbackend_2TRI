/*
Exercício 2 (vale nota)
CRIAR UM "BANCO DE DADOS" DE ALGUMA DAS SEGUINTES CATEGORIAS:
LIVROS, FILMES, SÉRIES, JOGOS, ANIMES.
USANDO OBJETOS, COM PELO MENOS 10 ELEMENTOS. 10 livros
*/

// Função de criar um arquivo JSON
function criarArquivo (obj){
    const dadosJSON = JSON.stringify(obj)
    const fs = require("fs")
    fs.writeFileSync("livros.json", dadosJSON)
}

//criarArquivo(livros)

//Função Ler arquivo
let arquivo
function lerArquivo(){
    arquivo = require("./livros.json")
    console.log("Arquivo lido com sucesso") 
}

lerArquivo()
//console.log(arquivo)

// Função organiar lista
function organizarLista(lista){
    console.log("##### ESTOQUE DE LIVROS #####")
    lista.forEach((livro) => {
        console.log("-")
        console.log(livro.titulo + " - " +
                    livro.autor + ", Ano: " +
                    livro.ano + ", Páginas: " +
                    livro.paginas + ", Preço: R$" +
                    livro.preco.toFixed(2).replaceAll(".",",")  + "\nSinopse: " +
                    livro.sinopse)
    })
}
organizarLista(arquivo)

let listaDesconto
function aplicarDesconto(desconto){
    console.log("Aplicado o desconto")
    listaDesconto = arquivo.map((livro) => {
    return{...livro, preco: livro.preco*desconto} //spread operator - copia o objeto.
})
}

aplicarDesconto(0.95)
organizarLista(listaDesconto)

let livrosFiltrados
function filtarporPreco(preco){
    console.log("Aplicado o filtro!")
    livrosFiltrados = arquivo.filter((livro)=> livro.preco>preco)
}
filtarporPreco(40)
organizarLista(livrosFiltrados)

function addLivro(obj){
    arquivo.push(obj)
}

addLivro({
    titulo: "Triste Fim de Policarpo Quaresma",
    autor: "Lima Barreto",
    ano: 1915,
    paginas: 288 ,
    sinopse: "O romance pré-modernista narra a história de Policarpo Quaresma, um funcionário público exemplar, extremamente nacionalista e idealista. Ele dedica sua vida a valorizar a cultura brasileira, a agricultura e a língua tupi, sonhando em tornar o Brasil uma grande nação. ",
    preco: 30.00, 
})

organizarLista(arquivo)