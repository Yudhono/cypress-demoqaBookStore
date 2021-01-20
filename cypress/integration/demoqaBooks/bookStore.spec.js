/// <reference types="cypress" />

// declare variable that contain search keyword fixture
const availableFixtures = [
    {
        "name": "searchKeyword",
        "context": "test search 1"
    },
    {
        "name": "searchKeyword2",
        "context": "test search 2"
    },
    {
        "name": "searchKeyword3",
        "context": "test search 3"
    },
    {
        "name": "searchKeyword4",
        "context": "test search 4 "
    },
    {
        "name": "searchKeyword5",
        "context": "test search 5"
    },
    {
        "name": "searchKeyword6",
        "context": "test search 6"
    },
    {
        "name": "searchKeyword7",
        "context": "test search 7"
    },
    {
        "name": "searchKeyword8",
        "context": "test search 8"
    },    
];

const loginScenarioFixtures = [
    {
        "name": "loginScenario1",
        "context": "scenario 1, wrong user & password"
    },
    {
        "name": "loginScenario2",
        "context": "scenario 2, one field is empty"
    }
];

describe('Book Store Test Case', () => {
    let userDetails;
    let theData;
    

    // in this block, the code is always executed before all is executed
    beforeEach(() => {
        cy.visit('https://demoqa.com/books');
        cy.fixture('userLoginDetails').then((user) => {
            userDetails = user;
        })
    });

    // test case to visit login page
    it('to login page', () => {
        cy.get('.btn.btn-primary').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        cy.log('in this stage the intarface is supposed to be in log in page');
    });

    //test case to perform success login
    it('Login success', () => {
        // function to perform Login
        // the block code has written in commmand.js
        cy.performLogin(userDetails.userName, userDetails.password);        

        cy.contains(userDetails.userName).should('exist');
        cy.log('login success, in this stage the interface is supposed to be in demoqa.com/books page with username on it');
    });

    //test case to perform fail login, scenario 1: wrong username & password
    //loop through fixtures
    it('Test to Fail Login, scenario 1: wrong username & password', () => {
        cy.log('Login fail scenario 1: wrong username & password')
        // function to perform Login
        // the block code has written in commmand.js
        cy.performLogin('aaa', 'aaa');

        cy.contains('Invalid username or password!').should('exist');

        cy.log('in this stage the test is supposed to be success to fail');
    });

    //test case to perform fail login, scenario 2: one field is empty
    it('Test to Fail Login, scenario 2: one field is empty', () => {
        cy.log('Login fail scenario 2: one field is empty')
        //perform login
        //click login button
        cy.get('.btn.btn-primary').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        //filling the field
        cy.get('#password').type('aaa');
        //click login button
        cy.get('#login').click();
        //get username field
        cy.get('#userForm')
            .children()
            .get('#userName-wrapper')
            .children()
            .get('.col-md-9.col-sm-12')
            .children()
            .get('#userName')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');

        cy.log('in this stage the test is supposed to be success to fail');
    });

    //test case to perform fail login, scenario 3: both field is empty
    it('Test to Fail Login, scenario 3: both field is empty', ()=> {
        cy.log('Login fail scenario 3: both field is empty')
        //perform login
        //click login button
        cy.get('.btn.btn-primary').contains('Login').should('be.visible').click();
        cy.contains('Welcome').should('exist');
        cy.contains('Login in Book Store').should('exist');
        
        //click login button
        cy.get('#login').click();
        //get username field
        cy.get('#userForm')
            .children()
            .get('#userName-wrapper')
            .children()
            .get('.col-md-9.col-sm-12')
            .children()
            .get('#userName')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');

        //get password field
        cy.get('#userForm')
            .children()
            .get('#userName-wrapper')
            .children()
            .get('.col-md-9.col-sm-12')
            .children()
            .get('#password')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');

        cy.log('in this stage the test is supposed to be success to fail');
    });


    //test case to perform logout
    it('Logout', () => {
        // perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        cy.contains(userDetails.userName).should('exist');

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

    //test case to visit from Book store page to user profile page after login
    it('visit from Book store page to user profile page after login', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        //click button to go back to book store page (demoqa.com/book)
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();
        cy.contains(userDetails.userName).should('exist');
        cy.log('in this stage the interface is supposed to be user profile page');
    });

    //from Book store page to Book Store API page
    it('from book store page to book store API page', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        cy.get('.btn.btn-light').contains('Book Store API').should('be.visible').click();
        cy.contains('Book Store API').should('exist');
        cy.contains('Book Store Web API').should('exist');

        cy.log('at this stage the interface is supposed to be in demoqa.com/swagger book store api testing site');
    });

    //test case to Add Books to Collections
    it('Add Books to collections', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

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
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        //go to user profile page
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();

        //click trash icon button on the book list
        cy.get('#delete-record-undefined').first().click();
        //click OK button on the modal
        cy.get('.btn').contains('OK').should('be.visible').click();

        cy.log('at this stage the choosen book must be gone because the user delete it');
    });

    //test case to cancel deletetion of a book
    it('Cancel Deleting a Book', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        //go to user profile page
        //by clicking profile button in side panel
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();

        //click trash icon button on the book list
        cy.get('#delete-record-undefined').first().click();
        //click CANCEL button on the modal 
        cy.get('.btn').contains('Cancel').should('be.visible').click();

        cy.log('at this stage the choosen book MUST NOT be gone because the user cancel to delete it');
    });

    //test case to delete ALL boooks
    it('Delete All Books', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        //go to user profile page
        //by clicking profile button in side panel
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();

        //click delete all books button
        cy.get('.btn.btn-primary').contains('Delete All Books').should('be.visible').click();
        //click OK button on the modal
        cy.get('.btn.btn-primary').contains('OK').should('be.visible').click();

        cy.log('at this stage the ALL BOOKS must be gone because the user delete it');
    });

    //test case to delete account
    // it('Delete Account', () => {
    //     //perform login
    //     //click login button
    //     cy.get('.btn').contains('Login').should('be.visible').click();
    //     cy.contains('Welcome').should('exist');
    //     cy.contains('Login in Book Store').should('exist');
    //     cy.get('#userName').type('yudho');
    //     cy.get('#password').type('@Yudh122Witanto');
    //     cy.get('#login').click();
    //     cy.contains('yudho').should('exist');

    //     //click delete account button
    //     cy.get('.btn').contains('Delete Account').should('be.visible').click();
    //     //click OK button on the modal
    //     cy.get('.btn').contains('OK').should('be.visible').click();

    //     cy.contains('Welcome').should('exist');
    //     cy.contains('Login in Book Store').should('exist');

    //     cy.log('at this stage the account should be deleted and redirect to login page');
    // });

    // test case to check row in user profile
    it('Check row in user profile', () => {
        //perform login
        cy.performLogin(userDetails.userName, userDetails.password)
        //check the username after login
        cy.contains(userDetails.userName).should('exist');

        //go to user profile page
        //by clicking profile button in side panel
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();

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
    it('Check row in book store main page', () => {

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

    //test search field in books store main page
    //keyword based on book title
    
    //loop through fixtures
    availableFixtures.forEach((afixture) => {
        describe(afixture.context, () => {
            before(function () {
                cy.fixture(afixture.name).then(function (data) {
                    theData = data;
                });
            });
            it('test search', () => {
                //type search keyword in the search field
                cy.get('#searchBox').type(theData.searchBox);
                //match search result
                cy.contains(theData.searchResult, { matchCase: false }).should('exist');
            });
        });
    });

    // TEST CASE TO VISIT PAGE IN SIDE PANEL

    //visit Login page
    it('visit login page via side panel', () => {
        //click login button in the side panel
        cy.get('.btn.btn-light').contains('Login').should('be.visible').click();
        //validate that the page is in the login page
        cy.contains('Welcome,').should('exist');
        cy.contains('Login in Book Store').should('exist');

        cy.log('at this stage the interface is supposed to be in login page')
    });

    //visit book store API page
    it('visit book store API via side panel', () => {
        //click button in the side panel
        cy.get('.btn.btn-light').contains('Book Store API').should('be.visible').click();
        cy.contains('Book Store API').should('exist');
        cy.contains('Book Store Web API').should('exist');

        cy.log('at this stage the interface is supposed to be in demoqa.com/swagger book store api testing site');
    });

    //visit profile when not logged in
    it('visit user profile page when not logged in', () => {
        //click button in the side panel
        cy.get('.btn.btn-light').contains('Profile').should('be.visible').click();
        cy.contains('Currently you are not logged into the Book Store application')
            .should('exist');
        
        cy.log('at this stage the interface is supposed to be in demoqa.com/profile but not logged in');
    })

});

