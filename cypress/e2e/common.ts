export function login() {
  cy.contains("Log in").click();
  cy.get("input").focus();
  cy.get("input").type("adminadmin");
  cy.contains("Log in").click();
}
