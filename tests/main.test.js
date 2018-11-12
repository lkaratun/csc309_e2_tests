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
});

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

describe("addNewPatron", () => {
  beforeEach(async () => {
    const dom = await JSDOM.fromFile("e2_library.html");
    ({ document } = dom.window);
    app = require("../e2_library")(document);
    const patronForm = document.querySelector("#patronAddForm");
    patronForm.querySelector("#newPatronName").value = "Test patron";
    app.addNewPatron(e);
  });
  it("adds an entry to the patrons array", () => {
    expect(app.patrons).toHaveLength(3);
    expect(typeof app.patrons[2]).toBe("object");
    expect(app.patrons[2] instanceof app.Patron).toBeTruthy();
  });
  it("new entry in the patrons array has correct properties", () => {
    expect(app.patrons[2].name).toBe("Test patron");
    expect(app.patrons[2].cardNumber).toBe(2);
  });
});
