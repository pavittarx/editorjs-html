# editorjs-html

A utility to parse editorjs clean data to HTML.

- Use it with plain Javascript/Typescript, React, Angular, Vue or any templating engine/framework of your choice.
- Fast, Efficient and Lightweight.
- Fully customizable to the core.
- Supports basic editorjs blocks which are customizable as well.
- Extend to parse your own blocks.

### Whats' new in v4?

- Complete Rewrite, latest dependencies with minimal API changes.
- Redundant `parseStrict()` and `validate()` functions are removed.
- Strict mode is configurable via options.
- Console errors if parser functions for block is not avaiable. Strict Mode throws errors.
- Code is more readable, modular. It would make it easier to contribute and track changes.
- Type definitions directly fetched from Editor.js, so development becomes easier.
- Unit Testing with Jest.

# Installation

### Self Host, precompiled versions.

- **Browser** - [Get /.build/edjsHTML.browser.js](./.build/edjsHTML.browser.js)

- **NodeJs** - [Get /.build/edjsHTML.node.js](./.build/edjsHTML.node.js)

- **For Both Browser & Node** - [Get /.build/edjsHTML.js](./.build/edjsHTML.js)

### NPM

```shell
npm install editorjs-html
```

### CDN

- https://cdn.jsdelivr.net/npm/editorjs-html@4.0.0/.build/edjsHTML.js
- (Browser Only Build): https://cdn.jsdelivr.net/npm/editorjs-html@4.0.0/.build/edjsHTML.browser.js

## Usage

### Browser

```js
const edjsParser = edjsHTML();
let html = edjsParser.parse(editorjs_clean_data);
console.log(html);
```

### Nodejs

```js
const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();
const html = edjsParser.parse(editorjs_clean_data);

console.log(html);
```

## Updates

See [Releases](https://github.com/pavittarx/editorjs-html/releases)

## Docs

### Supported Block Types

- Header (H1-H6)
- Lists (Ordered & Unordered)
- Nested Lists
- Image
- Delimiter
- Paragraph
- Quote
- Code
- Embed

## Parse Entire EditorJS Data Object

```js
const edjsParser = edjsHTML();
const HTML = edjsParser.parse(editorjs_data);
// returns array of html strings per block
console.log(HTML);
```

## Parse Entire EditorJS Data Object (Strict Mode)

```js
const edjsParser = edjsHTML();
const HTML = edjsParser.parse(editorjs_data);
// returns an error
if (HTML instanceof Error) throw HTML;

// in case of success, returns an array of strings
console.log(HTML);
```

## Parse Single Clean Data Block

```js
const edjsParser = edjsHTML();
const blockHTML = edjsParser.parseBlock(editorjs_data_block);
// returns string of html for this block
console.log(blockHTML);
```

## Strict Mode

```js
const edjsParser = edjsHTML({}, { strict: true });
// returns the list of missing parser functions
const blockHTML = edjsParser.parse(editorjs_data);
console.log(blockHTML);
```

### Extend For Custom Blocks

`editorjs-html` supports extending and overriding parser functions for blocks.

```js
  // Example Custom or Unrecognised Block
  {
    type: "custom",
    data: {
      text: "Hello World"
    }
 }

```

```js
// Parse this block in editorjs-html
function customParser(block) {
  return `<custom-tag> ${block.data.text} </custom-tag>`;
}

const plugins = {
  // The keyname must match with the type of block you want to parse with this funcion
  custom: customParser,
  // ... add more or overwrite
};

const edjsParser = edjsHTML(plugins);
```

## Contribution

Please add an issue, or open a PR for any bugs, review or suggestions.

### New Parser Functions

1. For additional parser functions, please add them to `parsers/block-name`. Check existing functions for suggestions.
2. Test everyting works fine, with `pnpm test` && `pnpm build`.
3. Open a PR, for review.
4. Add tests in `tests` directory. Make sure your tests pass with appropriate coverage.

## Suggestions & Recommendations

I would love to have your feedback and any suggestions. You can also let me know, if you need support for any more editorjs blocks.

## Support

If you find this helpful, consider giving this repository a Star. You can also buy me a coffee [here](https://www.buymeacoffee.com/pavittarx)

## License

MIT Public License

## Author

[@pavittarx](https://github.com/pavittarx)
