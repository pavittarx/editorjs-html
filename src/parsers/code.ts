import { OutputBlockData } from "@editorjs/editorjs";

export const code = ({ data }: OutputBlockData): string => {
  return `<pre><code>${data.code}</code></pre>`;
};
