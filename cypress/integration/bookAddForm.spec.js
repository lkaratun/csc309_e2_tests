const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Library</title>
<link rel="stylesheet" type="text/css" href="e2_style.css" />
</head>

<body>
<h1>Library System</h1>
<p>Library circulation system.</p>

<h2>Books in Library Circulation</h2>
<form id="bookAddForm">
<input id="newBookName" type="text" placeholder="Book name" />
<input id="newBookAuthor" type="text" placeholder="Author" />
<input id="newBookGenre" type="text" placeholder="Genre" />
<input type="submit" value="Add Book to Library" />
</form>
<br />
<table id="bookTable">
<tr>
<th>BookID</th>
<th>Title</th>
<th>Patron card number (if loaned out)</th>
</tr>
<tr>
<td>0</td>
<td><strong>Harry Potter</strong></td>
<td>0</td>
</tr>
<tr>
<td>1</td>
<td><strong>1984</strong></td>
<td></td>
</tr>
<tr>
<td>2</td>
<td><strong>A Brief History of Time</strong></td>
<td></td>
</tr>
</table>

<br />

<h2>Book Info</h2>
<form id="bookInfoForm">
<input id="bookInfoId" type="text" placeholder="Book Id" />
<input type="submit" value="Get Book info" />
</form>

<div id="bookInfo">
<p>Book Id: <span>2</span></p>
<p>Title: <span>A Brief History of Time </span></p>
<p>Author: <span>S. Hawking</span></p>
<p>Genre: <span>Cosmology</span></p>
<p>Currently loaded to: <span>N/A</span></p>
</div>

<br />
<h2>Current Loans</h2>

<h3>Loan out Book</h3>
<form id="bookLoanForm">
<input id="loanBookId" type="text" placeholder="Book Id" />
<input id="loanCardNum" type="text" placeholder="Card Number" />
<!--
<input id='bookGenre' type="text" name="bookGenre" placeholder="Genre">
-->
<input type="submit" value="Loan Book" />
</form>

<h3>Add new Patron</h3>
<form id="patronAddForm">
<input
id="newPatronName"
type="text"
name="patronName"
placeholder="Patron name"
/>
<input type="submit" value="Add Patron" />
</form>

<div id="patrons">
<div class="patron">
<p>Name: <span class="bold">Jim John</span></p>
<p>Card Number: <span class="bold">0</span></p>
<h4>Books on loan:</h4>
<table class="patronLoansTable">
<tr>
<th>BookID</th>
<th>Title</th>
<th>Status</th>
<th>Return</th>
</tr>
<tr>
<td>0</td>
<td><strong>Harry Potter</strong></td>
<td><span class="green">Within due date</span></td>
<td><button class="return">return</button></td>
</tr>
</table>
</div>
<div class="patron">
<p>Name: <span>Kelly Jones</span></p>
<p>Card Number: <span>1</span></p>
<h4>Books on loan:</h4>
<table class="patronLoansTable">
<tr>
<th>BookID</th>
<th>Title</th>
<th>Status</th>
<th>Return</th>
</tr>
</table>
</div>
</div>

<br /><br />
</body>
</html>
`);

const { document } = dom.window;
global.document = document;

describe("bookAddForm", () => {
  beforeEach(() => {
    cy.visit("e2_library.html");
  });

  it("should have initially empty inputs", () => {
    cy.get("#newBookName").should("have.value", "");
    cy.get("#newBookAuthor").should("have.value", "");
    cy.get("#newBookGenre").should("have.value", "");
  });
  it("Should add a new book to the libraryBooks array", () => {
    //Can't access app variables from here
  });

  it("Should add a new row to the books table on submit click", () => {
    cy.get("#bookAddForm").submit();
    cy.get("#bookTable tr").should("have.length", 5); //3 initial + 1 new + 1 header
  });
  it("Should add books details to the books table on submit click", () => {
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
  it("Should contain libraryBooks array with 3 elements", () => {
    const app = require("../../e2_library");
    // console.log(app.libraryBooks);
  });
});
