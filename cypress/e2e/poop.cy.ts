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
  cy.contains("Toilette");
}

function deleteAllPoops() {
  createPoop();
  cy.get("#delete").click({ multiple: true, force: true });
}

function selectValueByIndex(id: string, index: number) {
  cy.get(`[data-cy = "${id}"]`).click({ force: true }).click();
  cy.get(`[data-cy = "${id}-${index}"]`).click();
}

function createPoop() {
  cy.get("#create").click();

  selectValueByIndex("urinmenge", 1);
  selectValueByIndex("urindruck", 2);
  selectValueByIndex("stuhltyp", 3);
  selectValueByIndex("stuhlfarbe", 1);
  selectValueByIndex("stuhlmenge", 2);
  selectValueByIndex("stuhldruck", 3);

  cy.get("input[name=therapie]").type("Keine");
  cy.get("input[name=anmerkungen]").type("Keine");

  cy.get("button").contains("Speichern").click();
  cy.url().should("include", "/toilet");

  cy.contains("Typ 3");
  cy.contains("Braun");
  cy.contains("Hoch");
  cy.contains("Normal");
  cy.contains("Wenig");
  cy.contains("Keine");
}

function editPoop() {
  cy.get("#edit").click({ multiple: true, force: true });

  selectValueByIndex("stuhltyp", 4);
  cy.wait(100000);
  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Geht so");

  cy.get("button").contains("Speichern").click();

  cy.contains("Typ 4");
  cy.contains("Geht so");
}

function copyPoop() {
  cy.get("#copy").click({ multiple: true, force: true });

  cy.get(`[data-cy = "stuhltyp"]`).should(`have.value`, ``);
  cy.wait(100000);

  cy.get("select[name=stuhltyp]").select("3");

  cy.get("textarea[name=stuhlverhalten]").clear();
  cy.get("textarea[name=stuhlverhalten]").type("Super");
  cy.get("button").contains("Eintrag kopieren").click();

  cy.contains("Super");
  cy.contains("Geht so");
}

describe("Food", () => {
  it.skip("should complete the whole toilet entry cycle", () => {
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

    cy.get("#search").type("Typ 3");
    cy.get("main").contains("Typ 3");

    cy.get("#search").clear();
    cy.get("#search").type("Nicht gut");
    cy.get("main").contains("Typ 3").should("not.exist");

    deleteAllPoops();
  });
});
