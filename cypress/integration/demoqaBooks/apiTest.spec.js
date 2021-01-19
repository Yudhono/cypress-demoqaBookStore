/// <reference types="cypress" />

// describe("postToken", () => {
//     before(() => {
//         cy.postToken();
//         cy.saveLocalStorage();
//     });

//     beforeEach(() => {
//         cy.restoreLocalStorage();
//     });

//     it("should exist identity in localStorage", () => {
//         cy.getLocalStorage("identity_token").should("exist");
//         cy.getLocalStorage("identity_token").then(token => {
//             console.log("Identity token", token);
//         });
//     });

//     it("should still exist identity in localStorage", () => {
//         cy.getLocalStorage("identity_token").should("exist");
//         cy.getLocalStorage("identity_token").then(token => {
//             console.log("Identity token", token);
//         });
//     });
// });


describe('Author API Test', () => {
    const baseURL = 'https://demoqa.com/swagger/#';
    const statusCode = 200;

    it('authorized user', () => {

        cy.request({
            method: 'POST',
            url: `${baseURL}/Account/v1/Authorized`,
            body: {
                'userName': 'jamesbond27',
                'password': '@JamesBond27'
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            expect(response.status).to.equal(statusCode)
            expect(response.body).to.not.be.null;
            // expect(response.body.status)
            // expect(response.body.success).to.equal(true)
            // expect(response.body.message).to.equal('this autho is authorized')
            // expect(response.body.errors).to.equal(null)
            
        });
        cy.log('this user is authorized');
    });

    it('user', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}/Account/v1/AccountV1UserPost`,
            body: {
                'userName': 'jamesbond27',
                'password': '@JamesBond27'
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            expect(response.status).to.equal(statusCode)
            expect(response.body).to.not.be.null;
            //expect(response.body.status).to.equal('Success')
        });
    })

    it('Generate Token', () => {
        cy.request({
            method: 'POST',
            url: `${baseURL}/Account/v1/GenerateTokenPost`,
            body: {
                'userName': 'jamesbond27',
                'password': '@JamesBond27'
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            expect(response.status).to.equal(statusCode)
            expect(response.body).to.not.be.null;
            //expect(response.body.status).to.equal('Success')
        });
    })

    it('Generate books', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/BookStore/v1/Books`,
            
        }).then(function (response) {
            expect(response.status).to.equal(statusCode)
            expect(response.body).to.not.be.null;
            //expect(response.body.status).to.equal('Success')
        });
    })

    it('Get Single Book', () => {
        cy.request({
            method: 'GET',
            url: `${baseURL}/BookStore/v1/Books`,
            body: {
                'isbn': '9781449365035',
            },
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            expect(response.status).to.equal(statusCode)
            expect(response.body).to.not.be.null;
            //expect(response.body.status).to.equal('Success')
        });
    })

    // it("should return foo value", () => {
    //     var url = `${baseURL}/Account/v1/GenerateToken`;
    //     var token = '';
    //     cy.returnBody(url, token).then(returned_value => {
    //         cy.log(returned_value);
    //         expect(returned_value).to.deep.equal("foo-value");
    //     })
    // })
});