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
