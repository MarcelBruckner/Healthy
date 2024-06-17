import { login } from "./common";

function openPoop() {
  // Start from the index page
  cy.visit("http://localhost:3000/");

  login();

  // Find a link with an href attribute containing "about" and click it
  cy.get('a[href*="poop"]').click({ multiple: true, force: true });

  // The new url should include "/about"
  cy.url().should("include", "/poop");

  // The new page should contain an h1 with "About"
  cy.get("h1").contains("Stuhlgang");
}

function deleteAllPoops() {
  createPoop();
  cy.get(".delete-poop-button").click({ multiple: true, force: true });
}

function createPoop() {
  cy.contains("Stuhlgang anlegen").click();
  cy.get("select[name=stuhltyp]").select("3");
  cy.get("textarea[name=stuhlverhalten]").type("Super");
  cy.get("input[name=therapie]").type("Keine");
  cy.get("button").contains("Eintrag anlegen").click();
  cy.url().should("include", "/poop");

  cy.contains("Typ 3");
}

function editPoop() {
  cy.get(".edit-poop-button").click({ multiple: true, force: true });

  cy.get("select[name=stuhltyp]").select("4");
  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Geht so");

  cy.get("button").contains("Eintrag bearbeiten").click();

  cy.contains("Geht so");
}

function copyPoop() {
  cy.get(".copy-poop-button").click({ multiple: true, force: true });

  cy.get("select[name=stuhltyp]").select("3");

  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Super");
  cy.get("button").contains("Eintrag kopieren").click();

  cy.contains("Super");
  cy.contains("Geht so");
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

    cy.get("#search").type("Super");
    cy.get("#poop-table").contains("Super");

    cy.get("#search").clear();
    cy.get("#search").type("Nicht gut");
    cy.get("#poop-table").contains("Super").should("not.exist");

    deleteAllPoops();
  });
});
