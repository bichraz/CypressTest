/// <reference types="cypress" />

describe('Parcours de demande de crédit', () => {

    beforeEach(() => {
        //Aller au site web définie en BaseUrl
        cy.visit('/')
        //6 secondes d'attente
        cy.wait(6000)
        //Fermer la fenetre de l'utilisation de cookies
        cy.get('#didomi-notice-agree-button').eq(0).click({force : true})

        //***1ère étape***
        //Type de projet
        cy.get('#projectSelect').eq(0).select('NEWCAR')
        //Le montant de crédit
        cy.get('#amount').eq(0).select('1K5')
        //La durée de crédit
        cy.get('#creditMaturity').eq(0).select('M12')
        cy.get('div[data-di-form-id="landing2"] a').click()

        //***2ème étape***
        // On vérifie le title
        cy.get('div[data-cy="email-title"]').contains('Consultez nos offres pour ')
        // On vérifie l'URL
        cy.url().should('include', '/steps/email')
        //E-mail
        cy.get('input[data-di-id="#email-input"]').type('ohtoto2222@gmail.com')
        cy.get('yuc-design-button[data-cy="email-next"]').click()
        
    })

    it('Profil célibataire', () => {

        //***3ème étape***
        // On vérifie le title
        cy.get('div[data-cy="marital-title"]').contains('Votre situation familiale')
        // On vérifie l'URL
        cy.url().should('include', '/steps/marital-situation')
        //Radio célibataire
        cy.get('#MARITALSTATUS_SINGLE').check({force : true})
        cy.get('yuc-design-button[data-test="next"]').click()

        //***4ème étape***
        // On vérifie le title
        cy.get('div[data-cy="housing-title"]').contains('Votre logement')
        // On vérifie l'URL
        cy.url().should('include', '/steps/housing-situation')
        //Logement
        cy.get('#housingStatus-input').eq(0).select('HOME_OWNERSHIP_WITHOUT_MORTGAGE')
        cy.get('#housingStatusStartDate-input-month').type('02')
        cy.get('#housingStatusStartDate-input-year').type('2012')
        //J'ai lu et j'accepte les informations concernant la gestion de mes données *
        cy.get('#yucDataManagementOptin-input').check({force : true})
        //J'ai lu et j'accepte que Younited m'envoie des offres commerciales
        cy.get('#yucOptin-input').check({force : true})
        cy.get('yuc-design-button[data-test="next"]').click()

        //***5ème étape***
        //Votre situation professionnelle
    })
})