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
        
       cy.get('.Distribute-sc-__sc-1s2i8aq-0').contains('token').invoke('text').then((check_tokens) =>{
cy.writeFile('cypress/fixtures/typeform/check_tokens.txt', check_tokens)
})

cy.fixture('typeform/check_tokens.txt').should('exist').then((result) =>{
    if (result == 'I spy... no tokens') {
        cy.log('**NÃO POSSUI TOKEN SALVO!! GERANDO UM NOVO TOKEN...**')
        console.log('%cNÃO POSSUI TOKEN SALVO!! GERANDO UM NOVO TOKEN...', 'color: orange; font-size: large; font-weight: bolder')
        cy.get('button[data-qa="create-token-btn"]').click()

        cy.get('input[data-qa="token-name"]').type('access_token')
        cy.get('button[data-qa="confirm-button"]').click()

        cy.get('button[data-qa="personal-token-menu-trigger"]').click()
        .get('li[data-qa="regenerate-token-option"]').click()

        cy.get('input[value]').invoke('attr', 'value').then((token) =>{
            cy.writeFile('cypress/fixtures/typeform/access_token.txt', token)
        })

    
    } else {
        cy.log('**POSSUI TOKEN SALVO!! REGENERANDO TOKEN...**')
        console.log('%cPOSSUI TOKEN SALVO!! REGENERANDO TOKEN...', 'color: green; font-size: large; font-weight: bolder')
        cy.get('button[data-qa="personal-token-menu-trigger"]').click()
        .get('li[data-qa="regenerate-token-option"]').click()

        cy.get('input[value]').invoke('attr', 'value').then((token) =>{
            cy.writeFile('cypress/fixtures/typeform/access_token.txt', token)
        })
    }
})        
   
})