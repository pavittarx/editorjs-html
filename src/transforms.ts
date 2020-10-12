export type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  image(block: block): string;
}

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
  };
}


const transforms: transforms = {
  delimiter: () => {
    return `<br/>`;
  },

  header: ({ data }) => {
    return `<h${data.level}> ${data.text} </h${data.level}>`;
  },

  paragraph: ({ data }) => {
    return `<p> ${data.text} </p>`;
  },

  list: ({ data }) => {
    let style = data.style === "unordered" ? "ul" : "ol";
    let list = '';
    if (data.items) {
      list = data.items
        .map(
          (i) =>
            `<li> ${i} </li>`
        )
        .reduce((a, c) => a + c, '');
    }
    return `<${style}> ${list} </${style}>`;
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : "Image";
    return `<img src="${data.file ? data.file.url : ''}" alt="${caption}" />`;
  },

 
};

export default transforms;