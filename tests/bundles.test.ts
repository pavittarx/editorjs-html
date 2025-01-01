import parser from "./../.build/edjsHTML";
import nodeParser from "./../.build/edjsHTML.node";
import data from "./data.json";

describe("Check Bundled Versions Work", () => {
  test("Check Common Bundle", () => {
    const edjsParser = parser();
    const html = edjsParser.parse(data);
    expect(html).toBeDefined();
  });

  test("Check Node Bundle", () => {
    const edjsParser = nodeParser();
    const html = edjsParser.parse(data);
    expect(html).toBeDefined();
  });
});
