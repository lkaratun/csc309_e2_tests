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
  it("addNewBookToBookList correctly adds an entry to the libraryBooks array", () => {
    const myForm = document.querySelector("#bookAddForm");
    myForm.querySelector("#newBookName").value = "Test name";
    myForm.querySelector("#newBookAuthor").value = "Test author";
    myForm.querySelector("#newBookGenre").value = "Test genre";
    app.addNewBookToBookList(e);
    expect(app.libraryBooks).toHaveLength(4);
    expect(typeof app.libraryBooks[3]).toBe("object");
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
