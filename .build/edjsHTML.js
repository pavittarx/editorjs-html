!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).edjsHTML = t());
})(this, function () {
  'use strict';
  var e = {
    code: ({ data: e }) => `<pre><code>${e.code}</code></pre>`,
    embed: ({ data: e }) => {
      const t = e.service;
      return 'vimeo' === t
        ? `<iframe src="${e.embed}" height="${e.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
        : 'youtube' === t
          ? `<iframe width="${e.width}" height="${e.height}" src="${e.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          : (console.error(
              '[editorjs-html]: Only Youtube & Vimeo embeds are available by default. Write your own embed parser for other options.'
            ),
            '');
    },
    header: ({ data: e }) => `<h${e.level}>${e.text}</h${e.level}>`,
    image: ({ data: e }) => {
      const t = e.caption ? e.caption : 'Image';
      return `<img src="${e?.file?.url || e?.url}" alt="${t}" />`;
    },
    list: ({ data: e }) => {
      const t = 'unordered' === e.style ? 'ul' : 'ol',
        r = (e, t) => {
          const o = e.map((e) => {
            if (!e.content && !e.items) return `<li>${e}</li>`;
            let o = '';
            return e.items?.length && (o = r(e.items, t)), e.content ? `<li>${e.content}${o}</li>` : void 0;
          });
          return `<${t}>${o.join('')}</${t}>`;
        };
      return r(e.items, t);
    },
    paragraph: ({ data: e }) => {
      const t = e.alignment || e.align;
      return t ? `<p style="text-align:${t}"> ${e.text} </p>` : `<p>${e.text}</p>`;
    },
    quote: ({ data: e }) => `<blockquote>${e.text}</blockquote> - ${e.caption}`,
    delimiter: ({ data: e }) => '<br/>',
  };
  return (t = {}, r = { strict: !1 }) => {
    const o = { ...e, ...t };
    return {
      parse: (e) =>
        (({ blocks: e }, t, r) =>
          e.reduce((e, o) => {
            if (o.type in t) return e + t[o.type](o);
            const i = `[editorjs-html]: Parser function for ${o.type} does not exist`;
            if (r.strict) throw new Error(i);
            return console.error(i), e;
          }, ''))(e, o, r),
      parseBlock: (e) =>
        ((e, t, r) => {
          if (e.type in t) return t[e.type](e);
          const o = `[editorjs-html]: Parser function for ${e.type} does not exist`;
          if (r.strict) throw new Error(o);
          console.error(o);
        })(e, o, r),
    };
  };
});
