import localization from "../../support/localization";
import contactsList from "../../support/pageObjects/contacts/contacts.list";
import addContact from "../../support/pageObjects/contacts/add.contact";

describe('Contact CRUD operations with search functionality', () => {
    let companies;
    let contactId;
    
    beforeEach(() => {
        const currentDomain = Cypress.env("currentDomain");
        const contactPath = localization.contactPath[currentDomain];
        cy.loginViaApi();
        cy.visitOnDomain(contactPath, currentDomain);
        cy.fixture('companies').then((data) => {
          companies = data;
        });
    });

    it('should create new contact and save contact id', () => {
      contactsList.openAddContactPage();
      addContact.fillNameInput(companies.company4.name);
      cy.intercept('POST', '/api/contacts').as('addContact');
      addContact.saveContact();
      cy.wait('@addContact').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        contactId = interception.response.body.contact_id;
      });
    });

    it('should find contact', () => {
      contactsList.validateSearchResult(companies.company4.name);
    });

    it('should edit contact', () => {
      expect(contactId).to.be.a('number');
      contactsList.clickEditContact(companies.company4.name);
      addContact.fillNameInput(companies.company3.name);
      cy.intercept('PUT', `/api/contacts/${contactId}`).as('editContact');
      addContact.saveContact();
      cy.wait('@editContact').its('response.statusCode').should('eq', 200);
    });

    it('should delete contact', () => {
      expect(contactId).to.be.a('number');
      contactsList.clickDeleteContact(companies.company3.name);
      cy.intercept('DELETE', `/api/contacts/${contactId}`).as('deleteContact');
      cy.wait('@deleteContact').its('response.statusCode').should('eq', 202);
    });
});
