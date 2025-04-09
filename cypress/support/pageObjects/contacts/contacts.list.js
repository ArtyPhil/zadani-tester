class ContactsList {
    constructor() {
        this.addContactButton = 'button[data-analytics-id="contactsTable.buttons.addContact"]';
        this.findInput = 'input[name="search"]';
        this.editButton = 'button[data-analytics-id="icon-pen"]';
        this.deleteButton 'button[data-analytics-id="icon-trash-alt"]';
        this.createExpenseButton 'button[data-analytics-id="icon-expense"]';
        this.cancleDeleteButton = 'button[data-analytics-id="icon-trash-alt"]';
        this.confirmDeleteButton = 'button[data-analytics-id="cancelButtonTitle"]';
    }

    openAddContactPage() {
        cy.get(this.addContactButton).click();
    }

    findContact(companies) {
        cy.get(this.findInput).type(companies).wait(500);
    }

    validateSearchResult(companies) {
        cy.contains('tr.el-table_row', companies).eq().should('exist');
    }

    clickEditContact(companies) {
        cy.contains('tr.el-table_row', companies).find(this.editButton).eq(0).click();
    }

    clickDeleteContact(companies) {
        cy.contains('tr.el-table_row', companies).find(this.deleteButton).eq(0).click();
    }

    clickCreateExpense(companies) {
        cy.contains('tr.el-table_row', companies).find(this.createExpenseButton).eq(0).click();
    }

    clickConfirmDelete() {
        cy.get(this.cancleDeleteButton).click();
    }

    clickCancleDelete() {
        cy.get(cancleDeleteButton).click();
    }
}

export default new ContactsList();
