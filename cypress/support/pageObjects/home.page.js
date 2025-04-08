// cypress/support/pageObjects/home.page.js
class HomePage {
    constructor() {
        this.loginButton = 'button[data-analytics-id="header.login"]';
    }

    openLoginPage() {
        cy.get(this.loginButton).click();
    }
}

export default new HomePage();
