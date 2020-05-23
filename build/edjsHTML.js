(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.edjsHTML = factory());
}(this, (function () { 'use strict';

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

  var app = ((plugins = {}) => {
    Object.assign(transforms, plugins);
    return {
      parse: ({
        blocks
      }) => {
        return blocks.map(block => transforms[block.type](block));
      },
      parseBlock: block => {
        return transforms[block.type](block);
      }
    };
  });

  return app;

})));
