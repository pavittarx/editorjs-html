var edjsHTML = (function () {
  'use strict';

  var transforms = {
    delimiter: () => {
      return `<br/>`;
    },
    header: ({
      data
    }) => {
      return `<h${data.level}> ${data.text} </h${data.level}>`;
    },
    paragraph: ({
      data
    }) => {
      return `<p> ${data.text} </p>`;
    },
    list: ({
      data
    }) => {
      let style = data.style === "unordered" ? "ul" : "ol";
      let list = data.items.map(i => `<li> ${i} </li>`).reduce((a, c) => a + c, "");
      return `<${style}> ${list} </${style}`;
    },
    image: ({
      data
    }) => {
      let caption = data.caption ? data.caption : "Image";
      return `<img src="${data.file.url}" alt="${caption}" />`;
    },
    paragraph: ({
      data
    }) => {
      return `<p> ${data.text} </p>`;
    }
  };

  function ParseFunctionError(type) {
    return new Error(`\x1b[31m The Parser function of type "${type}" is not defined. \n
  Define your custom parser functions as: \x1b[34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks \x1b[0m`);
  }

  var app = ((plugins = {}) => {
    Object.assign(transforms, plugins);
    return {
      parse: ({
        blocks
      }) => {
        return blocks.map(block => {
          return transforms[block.type] ? transforms[block.type](block) : ParseFunctionError(block.type);
        });
      },
      parseBlock: block => {
        return transforms[block.type] ? transforms[block.type](block) : ParseFunctionError(block.type);
      }
    };
  });

  return app;

}());
