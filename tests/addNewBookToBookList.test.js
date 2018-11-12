const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let app;
let document;
//dummy event object to get by e.preventDefault()
const e = { preventDefault() {} };

describe("addNewBookToBookList", () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile("e2_library.html");
    ({ document } = dom.window);
    app = require("../e2_library")(document);
    const bookAddForm = document.querySelector("#bookAddForm");
    bookAddForm.querySelector("#newBookName").value = "Test name";
    bookAddForm.querySelector("#newBookAuthor").value = "Test author";
    bookAddForm.querySelector("#newBookGenre").value = "Test genre";
    app.addNewBookToBookList(e);
  });
  it("adds an entry to the libraryBooks array", () => {
    expect(app.libraryBooks).toHaveLength(4);
    expect(typeof app.libraryBooks[3]).toBe("object");
    expect(app.libraryBooks[3] instanceof app.Book).toBeTruthy();
  });
  it("new entry in the libraryBooks array has correct properties", () => {
    expect(app.libraryBooks[3].title).toBe("Test name");
    expect(app.libraryBooks[3].author).toBe("Test author");
    expect(app.libraryBooks[3].genre).toBe("Test genre");
    expect(app.libraryBooks[3].bookId).toBe(3);
  });
  it("patron card number is blank when first adding the book", () => {
    expect(app.libraryBooks[3].patron).toBe(null);
  });
});
