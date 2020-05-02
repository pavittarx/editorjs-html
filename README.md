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
* https://cdn.jsdelivr.net/npm/editorjs-html@1.0.4/build/edjsHTML.js
* (Browser Only Build): https://cdn.jsdelivr.net/npm/editorjs-html@1.0.4/build/edjsHTML.browser.js

## Usage

### Browser
```js
    const edjsParser = edjsHTML();

    let html = edjsParser.parse(editorjs-clean-data);

    console.log(html);
```

### Nodejs

```js
  const edjsParser = edjsHTML();
  
  const html = edjsParser.parse(editorjs-clean-data);

  console.log(html);
```

### Supported Block Types 

* Header (H1-H6)
* Lists (Ordered & Unordered)
* Images
* Delimiter 

### Extend For Custom Blocks 
`editorjs-html`  supports extending its functionality to render custom editorjs blocks. Moroever, You can even override these basic supported blocks.

* the `edjsHTML()` accepts an optional object that would allow you to extend its functionality. 

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
     return `<custom>`+block.data.text+`</custom>`;
   }

   const edjsParser =  edjsHTML({custom: customParser});

```

## Contribution 
Create an issue or send me a PR for any new contributions.

## Suggestions 
I would love to have your feedback and any suggestions. You can also let me know, if you need support for any more editorjs blocks. 

## Support 
If you find this helpful, consider giving this repository a Star. You can also support me on [Patreon](https://patreon.com/pavittarx)

## License 
MIT Public License

## Author 
[@pavittarx](https://github.com/pavittarx)

