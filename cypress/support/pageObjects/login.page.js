// cypress/support/pageObjects/login.page.js
class LoginPage {
    constructor() {
        this.emailInput = '#email';
        this.passwordInput = '#current-password';
        this.submitButton = 'button[data-analytics-id="button.login"]';
        this.loginButton = 'button[data-analytics-id="signIn.v2.login"]';
    }

    getLoginFirstTime() {
        cy.get(this.loginButton);
    }

    fillEmail(email) {
        cy.get(this.emailInput).type(email);
    }

    fillPassword(password) {
        cy.get(this.passwordInput).type(password);
    }

    submit() {
        cy.get(this.loginButton).click();
    }

    loginTestUser(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.submit();
    }
}

export default new LoginPage();
