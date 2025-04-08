Cypress.Commands.add('visitOnDomain', (args, domain = Cypress.env('currentDomain')) => {
    const customVisitCommand = `visit${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
    cy[customVisitCommand](args);
});

Cypress.Commands.add('visitCz', (args) => {
    cy.visit(`https://dev.fakturaonline.cz${args}`);
});

Cypress.Commands.add('visitCom', (args) => {
    cy.visit(`https://dev.invoiceonline.com${args}`);
});

Cypress.Commands.add('visitSk', (args) => {
    cy.visit(`https://dev.fakturaonline.sk${args}`);
});

Cypress.Commands.add("loginViaApi", () => {
  const currentDomain = Cypress.env("currentDomain");
  const baseUrl = Cypress.env("domains")[currentDomain];
  const credentials = Cypress.env("credentials")[currentDomain];
  
  cy.request("POST", `${baseUrl}/api/users/sign_in`, {
    user: {
      email: credentials.email,
      password: credentials.password
    }
  }).its("status").should("eq", 200);
});
