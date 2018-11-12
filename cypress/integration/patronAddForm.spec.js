describe("patronAddForm", () => {
  beforeEach(() => {
    cy.visit("e2_library_orig.html");
  });

  it("Should have initially empty inputs", () => {
    cy.get("#newPatronName").should("have.value", "");
  });

  it("Should add a new section to the patrons div on submit", () => {
    cy.get("#newPatronName").type("Lev");
    cy.get("#patronAddForm").submit();
    cy.get("#patrons>div").should("have.length", 3); //2 initial + 1 new
    cy.get("#patronAddForm").submit();
    cy.get("#patrons>div").should("have.length", 4); //2 initial + 2 new
  });
  it("Should add a new section to the patrons div with correct details on submit", () => {
    cy.get("#newPatronName").type("Lev");
    cy.get("#patronAddForm").submit();
    cy.get("#patrons>div:last-child").contains("Lev");
    cy.get("#patrons>div:last-child tr").should("have.length", 1); // No books loaned
  });
});