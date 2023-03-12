/// <reference types = "cypress"/>


const post_books = require('../../../fixtures/swagger_books/postBooks.json')

function addBooks(){

   return cy.api('POST', '/v1/Books', post_books)
    
}

export {addBooks}