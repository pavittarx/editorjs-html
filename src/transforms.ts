export type transforms = {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  image(block: block): string;
  quote(block: block): string;
  code(block: block): string;
  embed(block: block): string;
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
    service?: "vimeo" | "youtube";
    source?: string;
    embed?: string;
    width?: number;
    height?: number;
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
      list = data.items.map((i) => `<li>${i}</li>`).reduce((a, c) => a + c, "");
    }
    return `<${style}>${list}</${style}>`;
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : "Image";
    return `<img src="${
      data.file && data.file.url ? data.file.url : data.file
    }" alt="${caption}" />`;
  },

  quote: ({ data }) => {
    return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
  },

  code: ({ data }) => {
    return `<pre><code>${data.code}</code></pre>`;
  },

  embed: ({ data }) => {
    switch (data.service) {
      case "vimeo":
        return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      case "youtube":
        return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      default:
        throw new Error(
          'Unsupported embed service type. Supported are "youtube" and "vimeo"'
        );
    }
  },
};

export default transforms;
