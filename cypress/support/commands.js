/// <reference types = "cypress" />
import login from '../fixtures/typeform/login.json'

Cypress.Commands.add('getBooks',(rota, status) =>{
cy.api('GET', ('/' +rota)).then((response) =>{
expect(response.status).to.eq(status, 'statusCode')
expect(response.body).to.not.be.null


})
})

Cypress.Commands.add('armazenarToken', () =>{

        cy.clearAllCookies()
        
        cy.visit('https://admin.typeform.com/user/tokens')
        cy.wait(3000)
        cy.get('#okta-signin-username').type(login.email)
        cy.get('#okta-signin-password').type(login.password)
        cy.get('#okta-signin-submit').click()

        cy.get('button[data-qa="personal-token-menu-trigger"]').click()
        .get('li[data-qa="regenerate-token-option"]').click()

        cy.get('input[value]').invoke('attr', 'value').then((token) =>{
            cy.writeFile('cypress/fixtures/typeform/access_token.txt', token)
        })
        
   
})