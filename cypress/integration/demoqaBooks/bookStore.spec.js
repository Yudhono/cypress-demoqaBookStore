/// <reference types="cypress" />

describe('Book Store Test Case', () => {
    let userDetails;
    beforeEach(() => {
        cy.visit('https://demoqa.com/books');
        cy.fixture('userLoginDetails').then((user) => {
            userDetails = user;
        })
    });

    // test case to visi login page
    it('to login page', () => {
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.log('in this stage the intarface is supposed to be in log in page');
    });

    //test case to perform login
    it('Login', () => {
        //perform login
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        //filling the field
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        //click login button
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        cy.log('in this stage the interface is supposed to be in demoqa.com/profile page with username on it');
    });

    //test case to perform logout
    it('Logout', () => {
        // perform login
        cy.get('#login').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //perform logout
        cy.get('.btn').contains('Log out').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.log('in this stage the interface is supposed to be in login page');
    });

    // it('create new user', () => {
    //     cy.get('#login').click();
    //     cy.get('#newUser').click();
    //     cy.contains('Register to Book Store').should('exist');        
    //     cy.get('#firstname').type('afsana');
    //     cy.get('#lastname').type('nadhila');
    //     cy.get('#userName').type('afs_02');
    //     cy.get('#password').type('@nadhil4Afsana');
    //     cy.clickRecaptcha();

    // });

    //from user profile page to book store page
    it('from user profile page to book store page', () =>{
        //perform login
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //click button to go back to book store page (demoqa.com/book)
        cy.get('.btn').contains('Go To Book Store').should('be.visible').click();
        cy.contains('Book Store').should('exist');
        cy.log('in this stage the interface is supposed to be book store page');
    });

    //test case to Add Books to Collections
    it('Add Books to collections', () => {
        //perform login
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //click button to go back to book store page (demoqa.com/book)
        cy.get('.btn').contains('Go To Book Store').should('be.visible').click();
        cy.contains('Book Store').should('exist');
        cy.log('in this stage the interface is supposed to be book store page');

        //--click book to go to detailed book page--
        //get href link of one book and click it
        //cy.get('span>a').eq(2).click();
        cy.get('span.mr-2').children().get('a[href*="/books?"]').first().click();
        cy.contains('ISBN').should('exist');
        cy.contains('Title').should('exist');
        cy.contains('Sub Title').should('exist');
        cy.contains('Author').should('exist');
        cy.contains('Publisher').should('exist');
        cy.contains('Total Pages').should('exist');
        cy.contains('Description').should('exist');
        cy.contains('Website').should('exist');

        //adding books to collections
        cy.get('.btn').contains('Add To Your Collection').should('be.visible').click();

        cy.log('at this stage one book must be in the collections table in the profile page');

        //go back to the book store page
        cy.get('.btn').contains('Back To Book Store').should('be.visible').click();
        cy.contains('Book Store').should('exist');
        cy.log('at this stage the interface supposed to be in book store page');

        //--click book to go to detailed book page--
        //get href link of one book and click it
        //cy.get('span>a').eq(2).click();
        cy.get('span.mr-2').children().get('a[href*="/books?"]').last().click();
        cy.contains('ISBN').should('exist');
        cy.contains('Title').should('exist');
        cy.contains('Sub Title').should('exist');
        cy.contains('Author').should('exist');
        cy.contains('Publisher').should('exist');
        cy.contains('Total Pages').should('exist');
        cy.contains('Description').should('exist');
        cy.contains('Website').should('exist');

        //adding book to collections
        cy.get('.btn').contains('Add To Your Collection').should('be.visible').click();

        cy.log('at this stage one book must be in the collections table in the profile page');

        //go back to the book store page
        cy.get('.btn').contains('Back To Book Store').should('be.visible').click();
        cy.contains('Book Store').should('exist');
        cy.log('at this stage the interface supposed to be in book store page');
    });

    //test case to delete a book
    it('Delete a Book', () => {
        //perform login
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //click trash icon button on the book list
        cy.get('#delete-record-undefined').first().click();
        //click OK button on the modal
        cy.get('.btn').contains('OK').should('be.visible').click();

        cy.log('at this stage the choosen book must be gone because the user delete it');
    });

    //test case to cancel deletetion of a book
    it('Cancel Deleting a Book', () => {
        //perform login
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //click trash icon button on the book list
        cy.get('#delete-record-undefined').first().click();
        //click CANCEL button on the modal 
        cy.get('.btn').contains('Cancel').should('be.visible').click();

        cy.log('at this stage the choosen book MUST NOT be gone because the user cancel to delete it');
    });

    //test case to delete ALL boooks
    it('Delete All Books', () => {
        //perform login
        //click login button
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //click delete all books button
        cy.get('.btn').contains('Delete All Books').should('be.visible').click();
        //click OK button on the modal
        cy.get('.btn').contains('OK').should('be.visible').click();

        cy.log('at this stage the ALL BOOKS must be gone because the user delete it');
    });

    //test case to delete account
    it('Delete Account', () => {
        //perform login
        //click login button
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type('yudho');
        cy.get('#password').type('@Yudh122Witanto');
        cy.get('#login').click();
        cy.contains('yudho').should('exist');

        //click delete account button
        cy.get('.btn').contains('Delete Account').should('be.visible').click();
        //click OK button on the modal
        cy.get('.btn').contains('OK').should('be.visible').click();

        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');

        cy.log('at this stage the account should be deleted and redirect to login page');
    });

    // test case to check row in user profile
    it('Check row in user profile', () => {
        //perform login
        //click login button
        cy.get('.btn').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.get('#userName').type(userDetails.userName);
        cy.get('#password').type(userDetails.password);
        cy.get('#login').click();
        cy.contains('jamesbond27').should('exist');

        //select row: 5
        cy.get('select').select('5').should('have.value', '5');
        //check that it yield 5 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 5);

        //select row: 10
        cy.get('select').select('10').should('have.value', '10');
        //check that it yield 10 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 10);

        //select row: 20
        cy.get('select').select('20').should('have.value', '20');
        //check that it yield 20 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 20);

        //select row: 25
        cy.get('select').select('25').should('have.value', '25');
        //check that it yield 25 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 25);

        //select row: 50
        cy.get('select').select('50').should('have.value', '50');
        //check that it yield 50 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 50);

        //select row: 100
        cy.get('select').select('100').should('have.value', '100');
        //check that it yield 100 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 100);
    });

    // test case to check row in book store main page
    it.only('Check row in book store main page', () => {

        //select row: 5
        cy.get('select').select('5').should('have.value', '5');
        //check that it yield 5 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 5);

        //select row: 10
        cy.get('select').select('10').should('have.value', '10');
        //check that it yield 10 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 10);

        //select row: 20
        cy.get('select').select('20').should('have.value', '20');
        //check that it yield 20 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 20);

        //select row: 25
        cy.get('select').select('25').should('have.value', '25');
        //check that it yield 25 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 25);

        //select row: 50
        cy.get('select').select('50').should('have.value', '50');
        //check that it yield 50 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 50);

        //select row: 100
        cy.get('select').select('100').should('have.value', '100');
        //check that it yield 100 row
        cy.get('.ReactTable').children().get('.rt-tbody').find('.rt-tr-group').should('have.length', 100);
    });

  

    
});