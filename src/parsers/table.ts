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
      let isHeading = false;
      if (index === 0 && enableHeadings) {
        isHeading = true;
      }

      return `<tr>${tableContents(item, isHeading)}</tr>`;
    });
    return x.join("");
  };

  return `<table>${tableRow(data.content, data.withHeadings ?? false)}</table>`;
};
