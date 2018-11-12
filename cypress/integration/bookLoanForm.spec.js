describe("bookLoanForm", () => {
  beforeEach(() => {
    cy.visit("e2_library_orig.html");
  });

  it("Should have initially empty inputs", () => {
    cy.get("#loanBookId").should("have.value", "");
    cy.get("#loanCardNum").should("have.value", "");
  });

  it("Should add a new row to the patron section on submit", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();

    cy.get(".patron:nth-child(2) tr").should("have.length", 2); // 1 header + 1 book loaned
  });
  it("Should add a new section to the patron section with correct details on submit", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();
    cy.get(".patron:nth-child(2) tr:last-child").contains("1");
    cy.get(".patron:nth-child(2) tr:last-child").contains("1984");
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("Within due date")
      .should("have.css", "color");
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("Within due date")
      .should("have.class", "green");
    cy.get(".patron:nth-child(2) tr:last-child").contains("return");
  });
  it("Book status should change to 'Overdue' after 3 seconds", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();
    cy.wait(3000);
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("Overdue")
      .should("have.css", "color");
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("Overdue")
      .should("have.class", "red");
  });
  it("Book should be marked as loaned in bookTable", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();
    cy.get("#bookTable tr:nth-child(3) td:last-child").contains("1");
  });
  it("Book should be removed from patron table after the book is returned", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();
    cy.wait(3000);
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("return")
      .click();
    cy.get(".patron:nth-child(2) tr").should("have.length", 1); // Just the header
  });
  it("Patron field should be cleared in the book table after the book is returned", () => {
    cy.get("#loanBookId").type(1);
    cy.get("#loanCardNum").type(1);
    cy.get("#bookLoanForm").submit();
    cy.wait(3000);
    cy.get(".patron:nth-child(2) tr:last-child")
      .contains("return")
      .click();
    cy.get("#bookTable tr:nth-child(3) td:last-child")
      .invoke("text")
      .then(text => expect(text).to.equal(""));
  });
});
