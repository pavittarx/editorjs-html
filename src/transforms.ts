export type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  image(block: block): string;
  quote(block: block): string;
  code(block: block): string;
};

export type block = {
  type: string;
  data: {
    text?: string;
    level?: number;
    caption?: string;
    file?: {
      url?: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    items?: string[];
    style?: string;
    code?: string;
  };
};

const transforms: transforms = {
  delimiter: () => {
    return `<br/>`;
  },

  header: ({ data }) => {
    return `<h${data.level}>${data.text}</h${data.level}>`;
  },

  paragraph: ({ data }) => {
    return `<p>${data.text}</p>`;
  },

  list: ({ data }) => {
    let style = data.style === "unordered" ? "ul" : "ol";
    let list = "";
    if (data.items) {
      list = data.items
        .map((i) => `<li>${i}</li>`)
        .reduce((a, c) => a + c, "");
    }
    return `<${style}>${list}</${style}>`;
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : "Image";
    let tempfile
  	if (data.file) {
      tempfile = data.file
    } else if (data.file?.url) {
      tempfile = data.file.url
    }
    return `<img src="${tempfile}" alt="${caption}" />`;
  },

  quote: ({ data }) => {
    return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
  },
  
  code: ({ data }) => {
    return `<pre><code>${data.code}</code></pre>`;
  },
};

export default transforms;
