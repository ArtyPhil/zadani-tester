class AddContact {
    constructor() {
        this.companyName = 'input[name="invoice_attributes_name"]';
        this.companyNumber = '#invoice_attributes_company_number'
        this.addContactButton = 'button[data-analytics-id="contacts.buttons.save"]';
    }

    fillNameInput(Name) {
        cy.get(this.companyName).clear().type(Name);
    }

    fillCompanyNumber(ID) {
        cy.get(this.companyNumber).type(ID);
    }

    saveContact() {
        cy.get(this.addContactButton).click();
    }
}

export default new AddContact();
