# editorjs-html
A utility to parse editorjs clean data to HTML. 


# Installation

### Host on Your Own

**Browser** - [Get /build/edjsHTML.browser.js](./build/edjsHTML.browser.js)

**Nodejs** -  [Get /build/edjsHTML.node.js](./build/edjsHTML.node.js)

**For Both Browser & Node** - [Get /build/edjsHTML.js](./build/edjsHTML.js)

### NPM 

npm install editorjs-html

### CDN
* https://cdn.jsdelivr.net/npm/editorjs-html@2.1.0/build/edjsHTML.js
* (Browser Only Build): https://cdn.jsdelivr.net/npm/editorjs-html@2.1.0/build/edjsHTML.browser.js

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

* Header (H1-H6)
* Lists (Ordered & Unordered)
* Images
* Delimiter 
* Paragraph

## Parse Entire EditorJS Data Object

```js
  const edjsParser = edjsHTML();
  const HTML = edjsParser.parse(editorjs_data);
  // returns array of html strings per block
  console.log(HTML);
```

## Parse Single Clean Data Block

```js
  const edjsParser = edjsHTML();
  const blockHTML = edjsParser.parseBlock(editorjs_clean_data_block);
  // returns string of html for this block
  console.log(blockHTML);
```

### Extend For Custom Blocks 
`editorjs-html`  supports extending its functionality to render custom editorjs blocks. Moroever, You can even override these basic supported blocks.

* The `edjsHTML()` accepts an optional object that would allow you to extend its functionality. 

* The name of the function must match with editor-js custom block type.


```js
  // Your custom editorjs generated block
  {
    type: "custom",
    data: {
      text: "Hello World"
    }
 }

```

```js
  // Parse this block in editorjs-html
  function customParser(block){
    return `<custom-tag> ${block.data.text} </custom-tag>`;
  }

  const edjsParser =  edjsHTML({custom: customParser});

```

[Update] From v2.0.0 onwards, the parser functions recieves full `block` instead of just `data` property of the block. Read [releases](https://github.com/pavittarx/editorjs-html/releases) for more information.

## Contribution 
Create an issue or send a PR for any contributions.

## Suggestions 
I would love to have your feedback and any suggestions. You can also let me know, if you need support for any more editorjs blocks. 

## Support 
If you find this helpful, consider giving this repository a Star. You can also buy me a coffee [here](https://www.buymeacoffee.com/pavittarx)

## License 
MIT Public License

## Author 
[@pavittarx](https://github.com/pavittarx)

