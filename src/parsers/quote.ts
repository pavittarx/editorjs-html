import { OutputBlockData } from "@editorjs/editorjs";

export const quote = ({ data }: OutputBlockData): string => {
  return `<blockquote>${data.text}</blockquote> - ${data.caption}`;
};
