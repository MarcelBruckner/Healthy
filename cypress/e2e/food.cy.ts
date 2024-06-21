import { login } from "./common";

function openFood() {
  // Start from the index page
  cy.visit("http://localhost:3000/");

  login();

  // Find a link with an href attribute containing "about" and click it
  cy.get('a[href*="food"]').click({ multiple: true, force: true });

  // The new url should include "/about"
  cy.url().should("include", "/food");

  // The new page should contain an h1 with "About"
  cy.contains("Essen und Trinken");
}

function deleteAllFoods() {
  createFood();
  cy.get("#delete").click({ multiple: true, force: true });
}

function createFood() {
  cy.get("#create").click();
  cy.get("input[name=ort]").type("München");
  cy.get("input[name=motivation]").type("Essen mit Freunden");
  cy.get("input[name=speisen]").type("Spaghetti Bolognese");
  cy.get("input[name=getraenke]").type("1 Flasche Rotwein");
  cy.get("input[name=beschwerden]").type("Suff");
  cy.get("input[name=anmerkungen]").type("Hehe");
  cy.get("button").contains("Speichern").click();
  cy.url().should("include", "/food");

  cy.contains("München");
  cy.contains("Essen mit Freunden");
  cy.contains("Spaghetti Bolognese");
  cy.contains("1 Flasche Rotwein");
  cy.contains("Suff");
  cy.contains("Hehe");
}

function editFood() {
  cy.get("#edit").click({ multiple: true, force: true });

  cy.get("input[name=ort]").clear();
  cy.get("input[name=ort]").type("Kempten");
  cy.get("button").contains("Speichern").click();

  cy.contains("Kempten");
}

function copyFood() {
  cy.get("#copy").click({ multiple: true, force: true });
  cy.get("input[name=ort]").clear();
  cy.get("input[name=ort]").type("München");
  cy.get("button").contains("Speichern").click();

  cy.contains("Kempten");
  cy.contains("München");
}

describe("Food", () => {
  it("should complete the whole food entry cycle", () => {
    openFood();
    deleteAllFoods();

    createFood();
    editFood();
    copyFood();

    deleteAllFoods();
  });

  it("should search", () => {
    openFood();

    createFood();

    cy.get("#search").type("München");
    cy.get("main").contains("München");

    cy.get("#search").clear();
    cy.get("#search").type("Kempten");
    cy.get("main").contains("München").should("not.exist");

    deleteAllFoods();
  });
});
