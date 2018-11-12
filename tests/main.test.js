const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let app;
let document;
//dummy event object to get by e.preventDefault()
const e = { preventDefault() {} };

describe("app", () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile("e2_library.html");
    ({ document } = dom.window);
    app = require("../e2_library")(document);
  });

  it("Has patrons and libraryBooks objects", async () => {
    expect(app.libraryBooks).not.toBeUndefined();
    expect(app.patrons).not.toBeUndefined();
  });
  it("libraryBooks initially has 3 entries", () => {
    expect(app.libraryBooks).toHaveLength(3);
  });
  it("addNewBookToBookList adds an entry to the libraryBooks array", () => {
    const myForm = document.querySelector("#bookAddForm");
    myForm.querySelector("#newBookName").value = "Test name";
    myForm.querySelector("#newBookAuthor").value = "Test author";
    myForm.querySelector("#newBookGenre").value = "Test genre";
    app.addNewBookToBookList(e);
    expect(app.libraryBooks).toHaveLength(4);
    expect(typeof app.libraryBooks[3]).toBe("object");
    expect(app.libraryBooks[3] instanceof app.Book).toBeTruthy();
  });
  it("new entry in the libraryBooks array has correct properties", () => {
    const myForm = document.querySelector("#bookAddForm");
    myForm.querySelector("#newBookName").value = "Test name";
    myForm.querySelector("#newBookAuthor").value = "Test author";
    myForm.querySelector("#newBookGenre").value = "Test genre";
    app.addNewBookToBookList(e);
    expect(app.libraryBooks[3].title).toBe("Test name");
    expect(app.libraryBooks[3].author).toBe("Test author");
    expect(app.libraryBooks[3].genre).toBe("Test genre");
    expect(app.libraryBooks[3].bookId).toBe(3);
  });
  it("patron card number is blank when first adding the book", () => {
    const myForm = document.querySelector("#bookAddForm");
    myForm.querySelector("#newBookName").value = "Test name";
    myForm.querySelector("#newBookAuthor").value = "Test author";
    myForm.querySelector("#newBookGenre").value = "Test genre";
    app.addNewBookToBookList(e);
    expect(app.libraryBooks[3].patron).toBe(null);
  });


});

describe("bookInfoForm", () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile("e2_library.html");
    ({ document } = dom.window);
    app = require("../e2_library")(document);
  });
  it("getBookInfo resets the text input value", () => {
    const input = document.querySelector("#bookInfoId");
    input.value = 0;
    app.getBookInfo(e);
    expect(input.value).toBe("");
  });
  it("displayBookInfo doesn't add new elements to the DOM", () => {
    app.displayBookInfo(new app.Book("Harry Potter", "J.K. Rowling", "Fantasy"));
    const bookInfo = document.querySelector("#bookInfo");
    expect(bookInfo.children).toHaveLength(5);
  });
  it("displayBookInfo updates DOM correctly", () => {
    app.displayBookInfo(new app.Book("Harry Potter", "J.K. Rowling", "Fantasy"));
    const bookInfo = document.querySelector("#bookInfo");
    // expect(bookInfo.children[0].textContent).toMatch(/2/);
    expect(bookInfo.children[1].innerHTML).toMatch(/Harry Potter/);
    expect(bookInfo.children[2].innerHTML).toMatch(/J\.K\. Rowling/);
    expect(bookInfo.children[3].innerHTML).toMatch(/Fantasy/);
  });
})
