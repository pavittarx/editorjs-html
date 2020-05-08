var edjsHTML = (function () {
  'use strict';

  var transforms = {
    delimiter: () => {
      return `<br/>`;
    },
    header: data => {
      return `<h${data.level}> ${data.text} </h${data.level}>`;
    },
    paragraph: data => {
      return `<p> ${data.text} </p>`;
    },
    list: data => {
      let style = data.style === 'unordered' ? 'ul' : 'ol';
      let list = data.items.map(i => `<li> ${i} </li>`).reduce((a, c) => a + c, '');
      return `<${style}> ${list} </${style}`;
    },
    image: data => {
      let caption = data.caption ? data.caption : 'Image';
      return `<img src="${data.file.url}" alt="${caption}"`;
    }
  };

  var app = ((plugins = {}) => {
    Object.assign(transforms, plugins);
    return {
      parse: ({
        blocks
      }) => {
        return blocks.map(b => transforms[b.type](b.data));
      },
      parseBlock: block => {
        return transforms[block.type](block.data);
      }
    };
  });

  return app;

}());
