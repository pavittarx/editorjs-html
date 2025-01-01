import parser from "../src/main";
import data from "./data.json";
import corruptData from "./shittyData.json";

test("All Methods are defined and available", () => {
  const edjsParser = parser();

  expect(edjsParser["parse"]).toBeDefined();
  expect(edjsParser["parseBlock"]).toBeDefined();
});

describe("Testing Parser Transformer Functions", () => {
  const edjsParser = parser();

  test("Code Works", () => {
    const block = {};
  });

  test("Delimiter Works", () => {
    const delimiterBlock = {
      type: "delimiter",
      data: {},
    };

    const html = edjsParser.parseBlock(delimiterBlock);
    expect(html).toBe("<br/>");
  });

  test("Header Works", () => {
    const h1Block = {
      type: "header",
      data: {
        text: "Editor.js",
        level: 1,
      },
    };

    const h5Block = {
      type: "header",
      data: {
        text: "Editor.js",
        level: 5,
      },
    };

    const h1html = edjsParser.parseBlock(h1Block);
    const h5html = edjsParser.parseBlock(h5Block);

    expect(h1html).toBe(`<h1>Editor.js</h1>`);
    expect(h5html).toBe(`<h5>Editor.js</h5>`);
  });

  test("Paragraph Works", () => {
    const paraBlock = {
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
        alignment: "justify",
      },
    };

    const html = edjsParser.parseBlock(paraBlock);
    expect(html).toBeDefined();
  });

  test("Nested List", () => {
    const listBlock = {
      type: "list",
      data: {
        style: "unordered",
        items: [
          {
            content: "Item 1",
            items: [],
          },
          {
            content: "Item 2",
            items: [
              {
                content: "Subitem 1",
                items: [],
              },
            ],
          },
        ],
      },
    };

    const html = edjsParser.parseBlock(listBlock);
    expect(html).toBe(
      "<ul><li>Item 1</li><li>Item 2<ul><li>Subitem 1</li></ul></li></ul>"
    );
  });
});

describe("Batch Parsing Check", () => {
  const edjsParser = parser();

  test("Parser Works on Complete Data", () => {
    const html = edjsParser.parse(data);

    expect(html).toBeDefined();
  });

  test("Shitty Data Parse Check", () => {
    const html = edjsParser.parse(corruptData);

    // This should pass with console.error() for unconfigured blocks
    expect(html).toBeDefined();
  });
});

describe("Strict Mode Check", () => {
  const edjsParser = parser({}, { strict: true });

  test("Parser Thows Error for Unrecognised Blocks", () => {
    const func = () => edjsParser.parse(corruptData);

    expect(func).toThrow();
  });
});

describe("Custom Parser Functions Check", () => {
  const customBlock = {
    type: "custom",
    data: {
      text: "Editor.js",
      level: 2,
    },
  };

  const customParsers = {
    custom: (block: typeof customBlock) => {
      return `<test>${block.data.text}</test>`;
    },
  };

  const edjsParser = parser(customParsers);
  test("parseBlock() Parses custom block", () => {
    const html = edjsParser.parseBlock(customBlock);
    expect(html).toBeDefined();
  });

  test("parse() Parses custom block", () => {
    const data = { blocks: [customBlock] };
    const html = edjsParser.parse(data);
    expect(html).toBeDefined();
  });
});
