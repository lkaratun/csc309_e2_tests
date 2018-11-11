const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const rewire = require("rewire");

// console.log(document);

// app.__set__("document", document);
// jest.setTimeout(10000);

describe("app", () => {
  it("Has patrons and libraryBooks objects", async () => {
    dom = await JSDOM.fromFile("e2_library.html");
    const { document } = dom.window;
    const myForm = document.querySelector("#bookAddForm");
    const { libraryBooks, patrons } = require("../e2_library.js")(document);
    expect(libraryBooks).not.toBeUndefined();
    expect(patrons).not.toBeUndefined();
  });
  // it("length of libraryBooks is 3", () => {
  //   expect(app.__get__("libraryBooks")).toHaveLength(3);
  // });
});
