const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let app;
let document;
//dummy event object to get by e.preventDefault()
const e = { preventDefault() {} };

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
