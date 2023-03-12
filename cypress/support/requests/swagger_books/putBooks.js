/// <reference types = "cypress" />
const put_book = require('../../../fixtures/swagger_books/putBook.json')
function putBook_desc(id){

return cy.api('PUT', '/v1/Books/'+id,put_book.description)

}

function putBook_all(id){

    return cy.api('PUT', '/v1/Books/'+id,put_book)
    
    
    }

function putBook_id(id){

    return cy.api('PUT', '/v1/Books/'+id,put_book.id)
    
    }

function putBook_pageCount(id){

    return cy.api('PUT', '/v1/Books/'+id,put_book.pageCount)
        
    }

function putBook_pubDate(id){

    return cy.api('PUT', '/v1/Books/'+id,put_book.publishDate)
        
    }

function putBook_title(id, value){

    return cy.api('PUT', '/v1/Books/'+id,put_book).then((title) =>{
        const new_title = title.body.title.replace(put_book.title,value)
        cy.log('Novo título: '+new_title)
        
    })
        
    }

export {putBook_all, putBook_desc, putBook_id, putBook_pageCount, putBook_pubDate, putBook_title }