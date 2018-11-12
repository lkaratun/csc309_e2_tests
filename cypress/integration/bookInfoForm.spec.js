
describe("bookInfoForm", () => {
  beforeEach(() => {
    cy.visit("e2_library_orig.html");
  });

  it("Should have initially empty inputs", () => {
    cy.get("#bookInfoId").should("have.value", "");
  });
  it("Should not create new DOM elements on submit", () => {
    cy.get("#bookInfoId").type("0");
    cy.get("#bookInfoForm").submit();
    cy.get("#bookInfo p").should("have.length", 5);
    cy.get("#bookInfoId").type("1");
    cy.get("#bookInfoForm").submit();
    cy.get("#bookInfo p").should("have.length", 5);
  });
  it("Should display correct book details on submit", () => {
    cy.get("#bookInfoId").type("0");
    cy.get("#bookInfoForm").submit();
    cy.get("#bookInfo")
      .contains("Book Id:")
      .contains("0");
    cy.get("#bookInfo")
      .contains("Title:")
      .contains("Harry Potter");
    cy.get("#bookInfo")
      .contains("Author:")
      .contains("J.K. Rowling");
    cy.get("#bookInfo")
      .contains("Genre:")
      .contains("Fantasy");
    cy.get("#bookInfo")
      .contains("Currently loaded to:")
      .contains("Jim John");
  });
  it("Should display correct book details on two submits", () => {
    cy.get("#bookInfoId").type("0");
    cy.get("#bookInfoForm").submit();
    cy.get("#bookInfoId").type("1");
    cy.get("#bookInfoForm").submit();
    cy.get("#bookInfo")
      .contains("Book Id:")
      .contains("1");
    cy.get("#bookInfo")
      .contains("Title:")
      .contains("1984");
    cy.get("#bookInfo")
      .contains("Author:")
      .contains("G. Orwell");
    cy.get("#bookInfo")
      .contains("Genre:")
      .contains("Dystopian Fiction");
    cy.get("#bookInfo")
      .contains("Currently loaded to:")
      .contains("N/A");
  });
});