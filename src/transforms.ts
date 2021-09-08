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

type ListItem = {
  content: string;
  items: Array<ListItem>;
};

export type block = {
  type: string;
  data: {
    text?: string;
    level?: number;
    caption?: string;
    url?: string;
    file?: {
      url?: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    items?: Array<string> | Array<ListItem>;
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
    const listStyle = data.style === "unordered" ? "ul" : "ol";

    const recursor = (items: any, listStyle: string) => {
      const list = items.map((item: any) => {
        if (!item.content && !item.items) return `<li>${item}</li>`;

        let list = "";
        if (item.items) list = recursor(item.items, listStyle);
        if (item.content) return `<li> ${item.content} </li>` + list;
      });

      return `<${listStyle}>${list.join("")}</${listStyle}>`;
    };

    return recursor(data.items, listStyle);
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : "Image";
    return `<img src="${
      data.file && data.file.url ? data.file.url : data.url
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
          "Only Youtube and Vime Embeds are supported right now."
        );
    }
  },
};

export default transforms;
