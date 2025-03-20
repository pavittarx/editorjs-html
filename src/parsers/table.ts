import { OutputBlockData } from "@editorjs/editorjs";

export const table = ({ data }: OutputBlockData) => {
  const tableRow = (items: string[][], enableHeadings: boolean): string => {
    const tableContents = (
      innerItems: string[],
      isHeading: boolean
    ): string => {
      let tableContentStyle = isHeading ? "th" : "td";
      const y = innerItems.map((item: string, index: number) => {
        return `<${tableContentStyle}>${item}</${tableContentStyle}>`;
      });
      return y.join("");
    };

    const x = items.map((item: string[], index: number) => {
      if (index === 0 && enableHeadings) {
        return `<tr>${tableContents(item, true)}</tr>`;
      }
      return `<tr>${tableContents(item, false)}</tr>`;
    });
    return x.join("");
  };

  return `<table class="text-center mx-auto">${tableRow(data.content, data.withHeadings ?? false)}</table>`;
};
