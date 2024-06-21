export function login() {
  cy.get("#password").focus();
  cy.get("#password").type("adminadmin");
  cy.get("#login").click();

  cy.contains("Dashboard");
}
