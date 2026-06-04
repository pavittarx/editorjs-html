import { OutputBlockData } from "@editorjs/editorjs";

export const header = ({ data }: OutputBlockData) => {
  const align = data.alignment || data.align;

  if (align) {
    return `<h${data.level} style="text-align:${align}">${data.text}</h${data.level}>`;
  }

  return `<h${data.level}>${data.text}</h${data.level}>`;
};
