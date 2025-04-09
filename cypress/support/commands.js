import pathKeys from "./localizedPaths";

Cypress.Commands.add('visitPath', (pathKey, domain = Cypress.env('currentDomain')) => {
  const path = pathKeys?.[pathKey]?.[domain];
  if (!path) {
    throw new Error(`Path for key "${pathKey}" and domain "${domain}" not found in pathKeys.js`);
  }
  const customVisitCommand = `visit${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
  if (typeof cy[customVisitCommand] !== 'function') {
    throw new Error(`Custom visit command "${customVisitCommand}" is not defined`);
  }
  cy[customVisitCommand](path);
  return cy.wrap({ domain, path });
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
