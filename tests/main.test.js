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