import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import { default as parsers } from "./parsers";

type Plugins = (props: OutputBlockData) => {};
type Options = {
  strict: boolean;
};

const parse = (
  { blocks }: OutputData,
  parsers: Record<string, Plugins>,
  options: Options
) => {
  return blocks.reduce((accumlator: string, block: OutputBlockData) => {
    if (block.type in parsers) {
      accumlator += parsers[block.type](block);
      return accumlator;
    }

    const error = `[editorjs-html]: Parser function for ${block.type} does not exist`;
    if (options.strict) {
      throw new Error(error);
    } else {
      console.error(error);
    }

    return accumlator;
  }, "");
};

const parseBlock = (
  block: OutputBlockData,
  parsers: Record<string, Plugins>,
  options: Options
) => {
  if (block.type in parsers) {
    return parsers[block.type](block);
  }

  const error = `[editorjs-html]: Parser function for ${block.type} does not exist`;
  if (options.strict) {
    throw new Error(error);
  } else {
    console.error(error);
  }
};

const parser = (
  plugins: Record<string, Plugins> = {},
  options: Options = { strict: false }
) => {
  const combinedParsers = { ...parsers, ...plugins };

  return {
    parse: (blocks: OutputData) => parse(blocks, combinedParsers, options),
    parseBlock: (block: OutputBlockData) =>
      parseBlock(block, combinedParsers, options),
  };
};

export default parser;
