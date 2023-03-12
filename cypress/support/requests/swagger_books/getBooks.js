/// <reference types = "cypress" />

  function  allBooks(){
        return cy.api('GET', '/v1/Books')
    }


export {allBooks}