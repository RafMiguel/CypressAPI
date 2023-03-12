/// <reference types = "cypress" />

function deleteBook(id) {
    return cy.api('DELETE', '/v1/Books/'+id)

}

export {deleteBook}