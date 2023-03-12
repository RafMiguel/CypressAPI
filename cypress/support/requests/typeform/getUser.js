/// <reference types= "cypress" />
Cypress.config('baseUrl', 'https://api.typeform.com')

function my_user(rota) {
    return cy.fixture('typeform/access_token.txt').then((access_token) =>{
        cy.api({
            method: 'GET',
            url: `/${rota}`,
            headers: {
                Authorization: 'Bearer '+ access_token
            }
        })
    })

}

export {my_user}