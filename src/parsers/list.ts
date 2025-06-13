import { OutputBlockData } from "@editorjs/editorjs";

export const list = ({ data }: OutputBlockData) => {
  let listStyle = "ul";
  if (data.style === "ordered") {
    listStyle = "ol";
  }

  const recursor = (items: any, listStyle: string) => {
    if (!items || !items.length) {
      return "";
    }

    const list = items.map((item: any) => {
      // If it's legacy format (just strings)
      if (typeof item === "string") {
        return `<li>${item}</li>`;
      }

      // For v2.0 format with content property
      let content = item.content || "";
      let nestedList = "";

      if (item.items && item.items.length) {
        nestedList = recursor(item.items, listStyle);
      }

      if (
        data.style === "checklist" &&
        item.meta &&
        item.meta.hasOwnProperty("checked")
      ) {
        const checked = item.meta.checked ? " checked" : "";
        return `<li><label><input type="checkbox"${checked} disabled> ${content}</label>${nestedList}</li>`;
      }

      return `<li>${content}${nestedList}</li>`;
    });

    let attributes = "";

    if (listStyle === "ol" && data.meta) {
      if (data.meta.start && data.meta.start !== 1) {
        attributes += ` start="${data.meta.start}"`;
      }
      if (data.meta.counterType && data.meta.counterType !== "numeric") {
        attributes += ` type="${getCounterTypeAttribute(data.meta.counterType)}"`;
      }
    }

    return `<${listStyle}${attributes}>${list.join("")}</${listStyle}>`;
  };

  return recursor(data.items, listStyle);
};

function getCounterTypeAttribute(counterType: string): string {
  switch (counterType) {
    case "lower-alpha":
      return "a";
    case "upper-alpha":
      return "A";
    case "lower-roman":
      return "i";
    case "upper-roman":
      return "I";
    default:
      return "1";
  }
}
