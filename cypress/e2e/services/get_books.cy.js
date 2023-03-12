/// <reference types = "cypress" />
import * as GETBooks from '../../support/requests/swagger_books/getBooks'
import * as POSTBooks from '../../support/requests/swagger_books/postBooks'
import * as DELBooks from '../../support/requests/swagger_books/delBooks'
import * as PUTBooks from '../../support/requests/swagger_books/putBooks'

describe('Treinamento API - FakeRestAPI - Books', () => {
  it('GET', () => {
  GETBooks.allBooks().then((response) =>{
    expect(response.status).to.eq(200, 'statusCode')
    expect(response.body).to.not.be.empty
    expect(response.body[2].pageCount).to.eq(300)
        /*cy.api('GET', '/v1/Books',).then((response) =>{
      expect(response.status).to.eq(200, 'statusCode') // Espero que response (variável utilizada para armazenar o payload da rota /v1/Books) retorne o 'status' 200
     // expect(response).to.have.property('status', 200)
     expect(response).to.have.property('body' ).to.not.be.null // Espero que o corpo retornado não esteja vazio
     cy.writeFile('cypress/fixtures/getBooks.json', response.body)
     //expect(response.body).to.have.property('id', 1)
    })*/
    //cy.api = Método para chamar as requisiões (é o mesmo que ultilizar cy.request)
    //cy.api('[Method (GET (Acesso sem enviar informações para a API), POST (Enviar um body para a API), PUT (Atualizar uma info do body na API), DELETE (Deletar uma informação do body na API) )], URL)


    //Validando o body utilizando o json gerado pelo response na pasta fixture
    cy.writeFile('cypress/fixtures/swagger_books/books.json', response.body)
    cy.fixture('swagger_books/books').then((books) =>{
      expect(books[1].pageCount).to.equal(200)
    })
  })
    
  })

  it('POST', () => {

   POSTBooks.addBooks().then((response) =>{
    expect(response.body.title).to.eq('Batman - O Cavaleiro das Trevas')
   })

   GETBooks.allBooks().then((response) =>{
    expect(response.body).to.not.be.empty
   })
  });

  it('DELETE', () => {
    GETBooks.allBooks().then((all_books) =>{
      expect(all_books.body[199].title).to.exist
    DELBooks.deleteBook(199).then((del_book) =>{
      expect(del_book.body.id,'Book 200').to.not.exist
    })
      
    })
  });

  it('Criar e Deletar um livro', () => {
    POSTBooks.addBooks().then((add_book) =>{
      expect(add_book.body.id).to.eq(300)
      expect(add_book.body.title).to.eq('Batman - O Cavaleiro das Trevas', 'Título do livro')
      DELBooks.deleteBook(300).then((del_book) =>{
        expect(del_book.status).to.eq(200)
        expect(del_book.body.id,'Livro do Batman de ID 300').to.not.exist
      })
    })
  });

  it('PUT - Body inteiro' , () => {
    POSTBooks.addBooks().then((validar_book) =>{
      expect(validar_book.body.id).to.eq(300)
      expect(validar_book.body.title).to.eq('Batman - O Cavaleiro das Trevas', 'Título do livro')
    })
    PUTBooks.putBook_all(300).then((response) =>{
      
      expect(response.requestHeaders).to.have.property('content-type', 'application/json', 'header')
      expect(response.status).to.eq(200, 'statusCode')
expect(response.body.title).to.eq('Batman Ano 1', 'Novo título do livro')
    })
//.then(JSON.stringify)
//.invoke('replace', response.body.title,'Robin')


    /* cy.log(response.body.title)
     const new_title = response.body.title.replace('Batman vs Superman', 'Robin')
     cy.log(new_title)*/
    
    
  });

  })