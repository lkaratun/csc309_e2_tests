describe("bookAddForm", () => {
  beforeEach(() => {
    cy.visit("e2_library_orig.html");
  });

  it("Should have initially empty inputs", () => {
    cy.get("#newBookName").should("have.value", "");
    cy.get("#newBookAuthor").should("have.value", "");
    cy.get("#newBookGenre").should("have.value", "");
  });

  it("Should add a new row to the books table on submit", () => {
    cy.get("#bookAddForm").submit();
    cy.get("#bookTable tr").should("have.length", 5); //3 initial + 1 new + 1 header
    cy.get("#bookAddForm").submit();
    cy.get("#bookTable tr").should("have.length", 6); //3 initial + 2 new + 1 header
  });
  it("Should add books details to the books table on submit", () => {
    cy.get("#newBookName").type("Test name");
    cy.get("#newBookAuthor").type("Test author");
    cy.get("#newBookGenre").type("Test genre");
    cy.get("#bookAddForm").submit();
    //can't access the libraryBooks variable from here so we'll check number of table rows instead
    cy.get("#bookTable tr:last-child td").should("have.length", 3); //3 columns
    cy.get("#bookTable tr:last-child td:nth-child(1)")
      .invoke("text")
      .then(text => expect(text).to.equal("3"));
    cy.get("#bookTable tr:last-child td:nth-child(2)")
      .invoke("text")
      .then(text => expect(text).to.equal("Test name"));
    cy.get("#bookTable tr:last-child td:nth-child(3)")
      .invoke("text")
      .then(text => expect(text).to.equal(""));
  });
});

