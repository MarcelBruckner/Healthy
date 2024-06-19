import { login } from "./common";

function openPoop() {
  // Start from the index page
  cy.visit("http://localhost:3000/");

  login();

  // Find a link with an href attribute containing "about" and click it
  cy.get('a[href*="toilet"]').click({ multiple: true, force: true });

  // The new url should include "/about"
  cy.url().should("include", "/toilet");

  // The new page should contain an h1 with "About"
  cy.get("h1").contains("Toilette");
}

function deleteAllPoops() {
  createPoop();
  cy.get(".delete-toilet-button").click({ multiple: true, force: true });
}

function createPoop() {
  cy.contains("Toilette anlegen").click();
  cy.get("select[name=stuhltyp]").select("3");
  cy.get("textarea[name=stuhlverhalten]").type("Super");
  cy.get("input[name=therapie]").type("Keine");
  cy.get("button").contains("Eintrag anlegen").click();
  cy.url().should("include", "/toilet");

  cy.contains("Typ 3");
}

function editPoop() {
  cy.get(".edit-toilet-button").click({ multiple: true, force: true });

  cy.get("select[name=stuhltyp]").select("4");
  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Geht so");

  cy.get("button").contains("Eintrag bearbeiten").click();

  cy.contains("Geht so");
}

function copyPoop() {
  cy.get(".copy-toilet-button").click({ multiple: true, force: true });

  cy.get("select[name=stuhltyp]").select("3");

  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Super");
  cy.get("button").contains("Eintrag kopieren").click();

  cy.contains("Super");
  cy.contains("Geht so");
}

describe("Food", () => {
  it("should complete the whole toilet entry cycle", () => {
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

    cy.get("#search").type("Super");
    cy.get("#toilet-table").contains("Super");

    cy.get("#search").clear();
    cy.get("#search").type("Nicht gut");
    cy.get("#toilet-table").contains("Super").should("not.exist");

    deleteAllPoops();
  });
});
