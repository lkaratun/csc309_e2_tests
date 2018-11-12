/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below. */
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron objet

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {

			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/


/** ADD your code to the functions below. DO NOT change the function signatures. **/


/*** Functions that don't edit DOM themselves, but can call DOM functions
     Use the book and patron arrays appropriately in these functions.
 ***/

// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Create a new book based on input fields and add it to the global array.
	const titleInput = document.querySelector("#newBookName");
  const authorInput = document.querySelector("#newBookAuthor");
	const genreInput = document.querySelector("#newBookGenre");

	const title = titleInput.value;
	const author = authorInput.value;
	const genre = genreInput.value;

	const newBook = new Book(title, author, genre);
	libraryBooks.push(newBook);

	// Call addBookToLibraryTable properly to add book to the DOM.
	addBookToLibraryTable(newBook);
	// Reset input field values.
	titleInput.value = "";
	authorInput.value = "";
	genreInput.value = "";
}

// Changes book patron information, and calls
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron based on the input fields.
  const bookLoanInput = document.querySelector("#loanBookId");
	const patronLoanInput = document.querySelector("#loanCardNum");

	const bookId = bookLoanInput.value;
	const cardNumber = patronLoanInput.value;

	const book = libraryBooks[bookId];
	const patron = patrons[cardNumber];

	// Add patron to the book's patron property
	book.patron = patron;

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	addBookToPatronLoans(book)
	// Display the new loan in the table of library books.
	setBookLoanInfo(book, patron.cardNumber);

	// Start the book loan timer.
	book.setLoanTime();
	// Reset input field values.
	bookLoanInput.value = "";
	patronLoanInput.value = "";
}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();

	// check if return button was clicked, otherwise do nothing.
	if (e.target.classList.contains("return")) {
		// Get the appropriate book object.
		const bookLoanElem = e.target.parentElement.parentElement;
		const bookId = parseInt(bookLoanElem.children[0].innerText);
		const book = libraryBooks[bookId];

		removeBookFromPatronTable(book);
		// Clear loan information from table of library books.
		setBookLoanInfo(book, null);

		// Change the book object to have a patron of 'null'
		book.patron = null;
  }
}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
  const nameInput = document.querySelector("#newPatronName");
	const name = nameInput.value;
	const newPatron = new Patron(name);

	patrons.push(newPatron);

	// Call addNewPatronEntry() to add patron to the DOM
	addNewPatronEntry(newPatron);
	// Reset input field values.
  nameInput.value = "";
}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get the correct book object.
	const requestedIdInput = document.querySelector("#bookInfoId");
  const requestedBookId = parseInt(requestedIdInput.value);
	const requestedBook = libraryBooks[requestedBookId];

	// Call displayBookInfo()
	displayBookInfo(requestedBook);
	// Reset input field values.
  requestedIdInput.value = "";
}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.

function wrapElement(elemName, children, classes) {
	// Create a new elemName element, add all classes to its classList, and
	// add all the elements in children as its children, in the same order.
	const elem = document.createElement(elemName);

  // Add classes.
	for (let i = 0; i < classes.length; i++) {
		elem.classList.add(classes[i]);
	}

  // Add child elements.
	for (let i = 0; i < children.length; i++) {
		elem.appendChild(children[i]);
	}

	return elem;
}

function addBookToLibraryTable(book) {
	// Add code here
	function createTableCell(child) {
		// Create a new td element with child as its one child element.
		return wrapElement("td", [child], []);
	}

  // Create a table cell element for each column in the table.
  const bookIdElem = document.createTextNode("" + book.bookId);
	const titleElem = wrapElement("strong",
	                              [document.createTextNode(book.title)],
																[]);

  const patronStr = book.patron == null ? "" : "" + book.patron.cardNumber;
	const patronElem = document.createTextNode(patronStr);

  // Package the table cells into a row, and then into the table.
	const cellContents = [bookIdElem, titleElem, patronElem];
	const cells = cellContents.map(createTableCell);

  const tableRow = wrapElement("tr", cells, []);
	// Add the new row into the tbody inside bookTable, rather that to the table itself.
  const bookTableBody = bookTable.children[0];
	bookTableBody.appendChild(tableRow);
}

// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	// Define attributes of the patron to display on the webpage.
	const patronStr = book.patron == null ? "N/A" : book.patron.name;
	const orderedContents = [book.bookId,
													 book.title,
													 book.author,
		                       book.genre,
													 patronStr];

  // Replace the book info text on the page with info about the requested book.
	for (let i = 0; i < orderedContents.length; i++) {
		let elementWrapper = bookInfo.children[i];
		// Write into the span element inside the wrapper p.
		let elementContent = elementWrapper.children[0];
		elementContent.innerText = orderedContents[i];
	}
}

function createPatronLoanEntry(book) {
	function createTableCell(child) {
		// Create a new td element with child as its one child element.
		return wrapElement("td", [child], []);
	}

  // Create an element to inhabit each cell in a patron table row.
	const bookIdElem = document.createTextNode("" + book.bookId);
	const bookTitleElem = wrapElement("strong",
																		[document.createTextNode(book.title)],
																		[]);
	const bookDueElem = wrapElement("span",
	                                [document.createTextNode("Within due date")],
																  ["green"]);
	const bookReturnElem = wrapElement("button",
	                                   [document.createTextNode("return")],
																		 ["return"]);

  // Package the table cell content elements into td elements.
	const elements = [bookIdElem, bookTitleElem, bookDueElem, bookReturnElem];
	const tableCells = elements.map(createTableCell);

  // Return a tr element containing all the table cells.
	const loanEntry = wrapElement("tr", tableCells, []);
	return loanEntry;
}

function setBookLoanInfo(book, patronId) {
  // Write that patronId has loaned out book in the table of library books, or
	// record that book is not loaned at all if patronId is null.
	const bookTableBody = bookTable.children[0];
	const selectedBookEntry = bookTableBody.children[book.bookId + 1];
	const selectedBookLoanElem = selectedBookEntry.children[2];

	selectedBookLoanElem.innerText = patronId == null ? "" : "" + patronId;
}

// Adds a book to a patron's book list with a status of 'Within due date'.
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Find the patron's table of loaned books in the webpage.
	const patronId = book.patron.cardNumber;
	const patronLoanElem = patronEntries.children[patronId];

  // Add a new row for book into the table.
	const patronLoanTable = patronLoanElem.querySelector("table tbody");
  const patronLoanEntry = createPatronLoanEntry(book);
	patronLoanTable.appendChild(patronLoanEntry);
}

function createPatronLoanTable() {
	// Create table header elements for each of the four table columns.
	function createTableHeader(content) {
		return wrapElement("th", [document.createTextNode(content)], []);
	}

	const headers = ["BookID", "Title", "Status", "Return"];
	const headerCells = headers.map(createTableHeader);

	// Wrap the table headers into a lone row in a table.
	const headerRow = wrapElement("tr", headerCells, []);
  const tableBody = wrapElement("tbody", [headerRow], []);
	const table = wrapElement("table", [tableBody], ["patronLoansTable"]);

	return table;
}

function createPatronEntry(patron) {
	function createMappingEntry(header, content) {
		// Create a p element with text content given by header followed by
		// content (a string) wrapped in a span.
		const headerElem = document.createTextNode(header);
		const contentElem = wrapElement("span",
	                                  [document.createTextNode(content)],
																	  ["bold"]);

	  const elem = wrapElement("p", [headerElem, contentElem], []);
		return elem;
	}

  // Create child elements for a patron: includes patron information such as
	// name and ID, and an empty table of loans.
	const nameElement = createMappingEntry("Name: ", patron.name);
	const cardNumberElement = createMappingEntry("Card Number: ", patron.cardNumber);
	const loanHeaderElement = wrapElement("h4", [document.createTextNode("Books on loan:")], []);
	const blankLoanTable = createPatronLoanTable();

  // Wrap up all the child elements into a patron div wrapper.
	const children = [nameElement, cardNumberElement, loanHeaderElement, blankLoanTable];
	const patronEntry = wrapElement("div", children, ["patron"]);
	return patronEntry;
}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status).
function addNewPatronEntry(patron) {
	// Create an empty patron element with the patron's info and add it to the DOM.
	const patronEntry = createPatronEntry(patron);
	patronEntries.appendChild(patronEntry);
}

function findBookInLoanTable(loanTable, bookTitle) {
	// Return the first book in loanTable (a table belonging to a single patron)
	// whose title matches bookTitle.
	const numBooksLoaned = loanTable.children.length - 1;
	let i = 0;

	for (; i < numBooksLoaned; i++) {
		// Consider the next row in the table, extract the book title, and compare
	  // it against the desired title.
	  const ithBookElem = loanTable.children[i + 1];
		const ithBookTitleWrapper = ithBookElem.querySelector("strong");
		const ithBookTitle = ithBookTitleWrapper.innerText;

		if (ithBookTitle == bookTitle) {
			// Match found: return the whole table row so that book ID and other
			// information can be accessed.
		  return ithBookElem;
		}
	}

  // No match was found (this should never happen in the test cases).
	return null;
}

// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Find the loan table of the patron who currently is loaning book.
	const patronId = book.patron.cardNumber;
	const patronElem = patronEntries.children[patronId];
  const patronLoanTable = patronElem.querySelector("table tbody");

  // Remove book's table row from the table.
	const bookLoanElem = findBookInLoanTable(patronLoanTable, book.title);
	patronLoanTable.removeChild(bookLoanElem);
}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here
	if (book.patron == null) {
		// No action required if the book is returned before it becomes overdue.
		return;
	}

	// Find the loan table of the patron who currently is loaning book.
	const patronId = book.patron.cardNumber;
	const patronElem = patronEntries.children[patronId];
	const patronLoanTable = patronElem.querySelector("table tbody");

  // Get the specific book's table row, and specifically its overdue status.
  const ithBookElem = findBookInLoanTable(patronLoanTable, book.title);
	const bookStatusElem = ithBookElem.querySelector("span");

  // Change the status of the loan to overdue.
	bookStatusElem.innerText = "Overdue";
	bookStatusElem.classList.remove("green");
	bookStatusElem.classList.add("red");
}
