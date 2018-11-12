module.exports = function(document) {
  /* E2 Library - JS */

  /*-----------------------------------------------------------*/
  /* Starter code - DO NOT edit the code below. */
  /*-----------------------------------------------------------*/

  // global counts
  let numberOfBooks = 0; // total number of books
  let numberOfPatrons = 0; // total number of patrons

  // global arrays
  const libraryBooks = []; // Array of books owned by the library (whether they are loaned or not)
  const patrons = []; // Array of library patrons.

  // Book 'class'
  class Book {
    constructor(title, author, genre) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.patron = null; // will be the patron object

      // set book ID
      this.bookId = numberOfBooks;
      numberOfBooks++;
    }

    setLoanTime() {
      // Create a setTimeout that waits 3 seconds before indicating a book is overdue

      const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
      setTimeout(function() {
        console.log("overdue book!", self.title);
        changeToOverdue(self);
      }, 3000);
    }
  }

  // Patron constructor
  const Patron = function(name) {
    this.name = name;
    this.cardNumber = numberOfPatrons;

    numberOfPatrons++;
  };

  // Adding these books does not change the DOM - we are simply setting up the
  // book and patron arrays as they appear initially in the DOM.
  libraryBooks.push(new Book("Harry Potter", "J.K. Rowling", "Fantasy"));
  libraryBooks.push(new Book("1984", "G. Orwell", "Dystopian Fiction"));
  libraryBooks.push(
    new Book("A Brief History of Time", "S. Hawking", "Cosmology")
  );

  patrons.push(new Patron("Jim John"));
  patrons.push(new Patron("Kelly Jones"));

  // Patron 0 loans book 0
  libraryBooks[0].patron = patrons[0];
  // Set the overdue timeout
  libraryBooks[0].setLoanTime(); // check console to see a log after 3 seconds

  /* Select all DOM form elements you'll need. */

  const myForm = document.querySelector("#bookAddForm");

  const bookInfoForm = document.querySelector("#bookInfoForm");
  const bookLoanForm = document.querySelector("#bookLoanForm");
  const patronAddForm = document.querySelector("#patronAddForm");

  /* bookTable element */
  const bookTable = document.querySelector("#bookTable");
  /* bookInfo element */
  const bookInfo = document.querySelector("#bookInfo");
  /* Full patrons entries element */
  const patronEntries = document.querySelector("#patrons");

  /* Event listeners for button submit and button click */

  myForm.addEventListener("submit", addNewBookToBookList);
  bookLoanForm.addEventListener("submit", loanBookToPatron);
  patronAddForm.addEventListener("submit", addNewPatron);
  bookInfoForm.addEventListener("submit", getBookInfo);

  /* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
  patronEntries.addEventListener("click", returnBookToLibrary);

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

    // Add book book to global array
    const bookName = document.querySelector("#newBookName").value;
    const bookAuthor = document.querySelector("#newBookAuthor").value;
    const bookGenre = document.querySelector("#newBookGenre").value;
    const book = new Book(bookName, bookAuthor, bookGenre);
    libraryBooks.push(book);
    // Call addBookToLibraryTable properly to add book to the DOM
    addBookToLibraryTable(book);
  }

  // Changes book patron information, and calls
  function loanBookToPatron(e) {
    e.preventDefault();

    // Get correct book and patron

    // Add patron to the book's patron property

    // Add book to the patron's book table in the DOM by calling addBookToPatronLoans()

    // Start the book loan timer.
  }

  // Changes book patron information and calls returnBookToLibraryTable()
  function returnBookToLibrary(e) {
    e.preventDefault();
    // check if return button was clicked, otherwise do nothing.

    // Call removeBookFromPatronTable()

    // Change the book object to have a patron of 'null'
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
  function addBookToLibraryTable(book) {
    const properties = ["bookId", "title", "patron"];
    const textNodes = properties.map(property =>
      document.createTextNode(
        property === "patron" && book[property] === null ? "" : book[property]
      )
    );
    const cells = textNodes.reduce((acc, node) => {
      const cell = document.createElement("td");
      // const strong = document.createElement("strong");
      // strong.appendChild(node);
      cell.appendChild(node);
      acc.push(cell);
      return acc;
    }, []);
    const row = document.createElement("tr");
    cells.forEach(cell => row.appendChild(cell));
    document.querySelector("#bookTable tbody").appendChild(row);
  }

  // Displays detailed info on the book in the Book Info Section
  function displayBookInfo(book) {
    console.log(book);
    // Define attributes of the patron to display on the webpage.
    const patronStr = book.patron == null ? "N/A" : book.patron.name;
    const orderedContents = [
      book.bookId,
      book.title,
      book.author,
      book.genre,
      patronStr
    ];

    // Replace the book info text on the page with info about the requested book.
    for (let i = 0; i < orderedContents.length; i++) {
      let elementWrapper = bookInfo.children[i];
      // Write into the span element inside the wrapper p.
      let elementContent = elementWrapper.children[0];
      elementContent.innerText = orderedContents[i];
    }
    // console.log(bookInfo.children[1].innerText);
  }

  // Adds a book to a patron's book list with a status of 'Within due date'.
  // (don't forget to add a 'return' button).
  function addBookToPatronLoans(book) {
    // Add code here
  }

  // Adds a new patron with no books in their table to the DOM, including name, card number,
  // and blank book list (with only the <th> headers: BookID, Title, Status).
  function addNewPatronEntry(patron) {
    // Add code here
  }

  // Removes book from patron's book table and remove patron card number from library book table
  function removeBookFromPatronTable(book) {
    // Add code here
  }

  // Set status to red 'Overdue' in the book's patron's book table.
  function changeToOverdue(book) {
    // Add code here
  }

  return {
    libraryBooks,
    patrons,
    Book,
    Patron,
    addNewBookToBookList,
    loanBookToPatron,
    returnBookToLibrary,
    addNewPatron,
    getBookInfo,
    addBookToLibraryTable,
    displayBookInfo,
    addBookToPatronLoans,
    addNewPatronEntry,
    removeBookFromPatronTable,
    changeToOverdue
  };
};
