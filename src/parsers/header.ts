import { OutputBlockData } from "@editorjs/editorjs";

export const header = ({ data }: OutputBlockData) => {
  return `<h${data.level}>${data.text}</h${data.level}>`;
};
