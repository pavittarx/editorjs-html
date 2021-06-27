# editorjs-html
A utility to parse editorjs clean data to HTML. 
  - Use it with plain Javascript/Typescript, React, Angular, Vue or any templating engine/framework of your choice.
  - Fast, Efficient and Lightweight. 
  - Fully customizable to the core. 
  - Supports basic editorjs blocks which are customizable as well.
  - Extendable for any new or custom editorjs blocks.

**[Note]** As of recent release, editorjs v2.10 a read-only mode available. You can use the same to display your editorjs data. However, **someone looking for something lightweight with customizability and more granular control are free to use this library.**

# Installation

### Host on Your Own

* **Browser** - [Get /build/edjsHTML.browser.js](./build/edjsHTML.browser.js)

* **NodeJs** -  [Get /build/edjsHTML.node.js](./build/edjsHTML.node.js)

* **For Both Browser & Node** - [Get /build/edjsHTML.js](./build/edjsHTML.js)

### NPM 

```shell
npm install editorjs-html
```

### CDN
* https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.js
* (Browser Only Build): https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.browser.js

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
* Nested Lists
* Image
* Delimiter 
* Paragraph
* Quote
* Code
* Embed

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
  const HTML = edjsParser.parseStrict(editorjs_data);
  // returns an error
  if(HTML instanceof Error) throw HTML;

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
## Get the list of missing parser functions 

```js
  const edjsParser = edjsHTML();
  // returns the list of missing parser functions
  const blockHTML = edjsParser.validate(editorjs_data);
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
Create an issue or send a PR for any contributions you would like to make.

I am thankful for everyone who has contributed their own bits to the repository. Even though the library is small and the scope for writing new or lots of features is limited. I still grateful to see a lots of contributions coming in.

## Suggestions & Recommendations
I would love to have your feedback and any suggestions. You can also let me know, if you need support for any more editorjs blocks. 

## Support 
If you find this helpful, consider giving this repository a Star. You can also buy me a coffee [here](https://www.buymeacoffee.com/pavittarx)

## License 
MIT Public License

## Author 
[@pavittarx](https://github.com/pavittarx)

