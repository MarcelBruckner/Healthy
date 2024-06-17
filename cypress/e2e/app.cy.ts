import { login } from "./common";

describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    login();

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="infos"]').click({ multiple: true, force: true });

    // The new url should include "/about"
    cy.url().should("include", "/infos");

    // The new page should contain an h1 with "About"
    cy.get("h1").contains("Ernährungs-Symptom-Tagebuch");
  });
});
