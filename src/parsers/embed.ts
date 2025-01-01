import { OutputBlockData } from "@editorjs/editorjs";

export const embed = ({ data }: OutputBlockData): string => {
  const provider = data.service;

  if (provider === "vimeo") {
    return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }

  if (provider === "youtube") {
    return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  console.error(
    "[editorjs-html]: Only Youtube & Vimeo embeds are available by default. Write your own embed parser for other options."
  );
  return "";
};
