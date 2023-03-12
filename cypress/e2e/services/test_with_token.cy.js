/// <reference types= "cypress" />
import * as GETuser from '../../support/requests/typeform/getUser'

Cypress.config('baseUrl', 'https://api.typeform.com')

describe('Teste básico de authorization com bearer token', () => {
   
    before(() => {

        cy.armazenarToken() //Descomentar para gerar um novo token automaticamente
    });

    
    it('Acessar API da Typeform (direto da spec)', () => {
        cy.fixture('typeform/access_token.txt').then((access_token) =>{
            cy.api({
                method: 'GET',
                url: '/me',
                headers: {
                    Authorization: `Bearer ${access_token}` // or: Authorization: 'Bearer ' + access_token
                }
            }).then((response) =>{
                expect(response.status).to.eq(200, 'statusCode')
                expect(response.headers).to.have.property('content-type', 'application/json', 'content-type')
                expect(response.isOkStatusCode).to.eq(true, 'statusCodeOK')
                expect(response.statusText).to.eq('OK',  'statusText')
                
            })
        })

    });

    it('Acessar API da Typeform (via pageObject)', () => {
        
        GETuser.my_user('me').then((response) =>{
            expect(response.status).to.eq(200, 'statusCode')
            expect(response.headers).to.have.property('content-type', 'application/json', 'content-type')
            expect(response.isOkStatusCode).to.eq(true, 'statusCodeOK')
            expect(response.statusText).to.eq('OK',  'statusText')
            
        })
    });

    it('Validar body  do response de user', () => {
        GETuser.my_user('me').then((response) =>{
            console.log(response)
            expect(response.body.alias).to.eq('Rafael Miguel', 'Nome e sobrenome')
            expect(response.body.email).to.eq('rafaelmiguel11@hotmail.com', 'Email')
            expect(response.body.language).to.eq('en', 'Idioma')
            expect(response.body.tracking_id).to.eq(23472226, 'trackingID')
            expect(response.body.user_id).to.eq('01GV8WV2CT9QMFKJPSV7G0MXXX', 'userId')
        })
    });

    it('Validar body  do response de user (utilizando fixture)', () => {

            GETuser.my_user('me').its('body').then((body) =>{
                cy.writeFile('cypress/fixtures/typeform/my_user.json', body)

                GETuser.my_user('me').then((response) =>{
                    console.log(response)
                    cy.fixture('typeform/my_user.json').then((body) =>{
                        expect(response.body.alias).to.eq(body.alias)
                        expect(response.body.email).to.eq(body.email)
                        expect(response.body.user_id).to.eq(body.user_id)
                        expect(response.body.tracking_id).to.eq(body.tracking_id)
                    })
                    
                })
            })

        })

    it.only('Acessar formulario', () => {
        GETuser.my_user('forms/MaY9BGOu').then((response) =>{
            expect(response.status).to.eq(200, 'statusCode')
        })
        
        GETuser.my_user('forms/MaY9BGOu').its('body').then((response) =>{
           // expect(response.status).to.eq(200, 'statusCode')

            expect(response).to.not.be.empty
            expect(response.title).to.eq('Test', 'Título')
            expect(response.fields[0].title).to.eq('Qual é o seu nome?', 'Pergunta')
            expect(response.fields[1].title).to.eq('É noixxx, {{field:01GV8WY0XF7EQ81DM5HS8W3M68}}, como estás hoje?', 'Pergunta')
            expect(response.fields[1].properties.choices[0].label).to.eq('Supimpa!', 'Opção')
            expect(response.fields[1].properties.choices[1].label).to.eq('Ai cara... :/', 'Opção')
            expect(response.fields[1].type).to.eq('multiple_choice', 'Pergunta de múltipla escolha')

            expect(response.fields[2].title).to.eq('{{field:01GV8WY0Z6YGD6DMRHZFEC6RXJ}} em? Isso é devido a popularidade de qual desses heróis?', 'Pergunta')
            expect(response.fields[2].properties.choices[0].label).to.eq('Batman', 'Opção')
            expect(response.fields[2].properties.choices[1].label).to.eq('Superman', 'Opção')
            expect(response.fields[2].properties.choices[2].label).to.eq('Flash', 'Opção')
            expect(response.fields[2].properties.choices[3].label).to.eq('Arqueiro Verde', 'Opção')
            expect(response.fields[2].properties.choices[4].label).to.eq('Homem de Ferro', 'Opção')
           
        })
})
})