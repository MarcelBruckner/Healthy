import { login } from "./common";

function openPoop() {
  // Start from the index page
  cy.visit("http://localhost:3000/");

  login();

  // Find a link with an href attribute containing "about" and click it
  cy.get('a[href*="poop"]').click();

  // The new url should include "/about"
  cy.url().should("include", "/poop");

  // The new page should contain an h1 with "About"
  cy.get("h1").contains("Stuhlgang");
}

function deleteAllPoops() {
  cy.get(".delete-poop-button").click({ multiple: true, force: true });
}

function createPoop() {
  cy.contains("Stuhlgang anlegen").click();
  cy.get("input[name=ort]").type("München");
  cy.get("input[name=motivation]").type("Essen mit Freunden");
  cy.get("input[name=speisen]").type("Spaghetti Bolognese");
  cy.get("input[name=getraenke]").type("1 Flasche Rotwein");
  cy.get("input[name=beschwerden]").type("Suff");
  cy.get("button").contains("Eintrag anlegen").click();
  cy.url().should("include", "/poop");

  cy.contains("Stuhlgang anlegen");
  cy.contains("München");
  cy.contains("Essen mit Freunden");
  cy.contains("Spaghetti Bolognese");
  cy.contains("1 Flasche Rotwein");
  cy.contains("Suff");
}

function editPoop() {
  cy.get(".edit-poop-button").click({ multiple: true, force: true });

  cy.get("input[name=ort]").clear();
  cy.get("input[name=ort]").type("Kempten");
  cy.get("button").contains("Eintrag bearbeiten").click();

  cy.contains("Kempten");
}

function copyPoop() {
  cy.get(".copy-poop-button").click({ multiple: true, force: true });
  cy.get("input[name=ort]").clear();
  cy.get("input[name=ort]").type("München");
  cy.get("button").contains("Eintrag kopieren").click();

  cy.contains("Kempten");
  cy.contains("München");
}

describe("Food", () => {
  it("should complete the whole poop entry cycle", () => {
    openPoop();
    deleteAllPoops();

    createPoop();
    editPoop();
    copyPoop();

    deleteAllPoops();
  });

  it("should search", () => {
    openPoop();

    createPoop();

    cy.get("#poop-search").type("München");
    cy.get("#poop-table").contains("München");

    cy.get("#poop-search").clear();
    cy.get("#poop-search").type("Kempten");
    cy.get("#poop-table").contains("München").should("not.exist");
  });
});
