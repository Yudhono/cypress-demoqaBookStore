// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
//Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
export const RECAPTCHA_SITE_KEY = window.Cypress
    ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
Cypress.Commands.add("clickRecaptcha", () => {
    cy.wait(500);
    cy.window().then(win => {
        win.document
            .querySelector("iframe[src*='recaptcha']")
            .contentDocument.getElementById("recaptcha-token")
            .click();
    });
});

import "cypress-localstorage-commands";

Cypress.Commands.add('postToken', () => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/swagger/Account/v1/GenerateToken', //get from cypress.env.json
        form: true, //sets to application/x-www-form-urlencoded
        body: {
            username: 'jamesbond27',
            password: '@JamesBond27'
        },
        headers: {
                'content-type': 'application/json'
        }
    })
        .its('body')
        .then(identity => {
            cy.setLocalStorage("identity_token", identity.token);
        });
});

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
    // Wait until the iframe (Google reCAPTCHA) is totally loaded
    cy.wait(500);
    cy.get('#g-recaptcha *> iframe')
        .then($iframe => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
                .find('.recaptcha-checkbox-border')
                .should('be.visible')
                .click();
        });
});
