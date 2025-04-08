import localization from "../../support/localization";
import contactsList from "../../support/pageObjects/contacts/contacts.list";
import addContact from "../../support/pageObjects/contacts/add.contact";

describe('Contact', () => {
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

    it('should create new contact', () => {
      contactsList.openAddContactPage();
      addContact.fillNameInput(companies.company4.name);
      cy.intercept('POST', '/api/contacts').as('addContact');
      addContact.saveContact();
      cy.wait('@addContact').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        contactId = interception.response.body.contact_id;
      });
    });

    it('should create expense from contact page', () => {
        contactsList.clickCreateExpense(companies.company4.name);
    });
});
