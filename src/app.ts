import { OutputData } from "@editorjs/editorjs";
import transforms, { block } from "./transforms";
import { ParseFunctionError } from "./errors";

type parser = {
  parse(OutputData: OutputData): Array<string>;
  parseStrict(OutputData: OutputData): Array<string> | Error;
  parseBlock(block: block): string;
  validate(OutputData: OutputData): Array<string>;
};

const parser = (plugins = {}): parser => {
  const parsers = Object.assign({}, transforms, plugins);

  return {
    parse: ({ blocks }) => {
      return blocks.map((block) => {
        return parsers[block.type]
          ? parsers[block.type](block)
          : ParseFunctionError(block.type);
      });
    },

    parseBlock: (block) => {
      return parsers[block.type]
        ? parsers[block.type](block)
        : ParseFunctionError(block.type);
    },

    parseStrict: ({ blocks }) => {
      const parserFreeBlocks = parser(parsers).validate({ blocks });

      if (parserFreeBlocks.length){
        throw new Error(`Parser Functions missing for blocks: ${parserFreeBlocks.toString()}`);
      }

      const parsed = [];

      for (let i = 0; i < blocks.length; i++) {
        if (!parsers[blocks[i].type])
          throw ParseFunctionError(blocks[i].type);

        parsed.push(parsers[blocks[i].type](blocks[i]));
      }

      return parsed;
    },

    validate: ({ blocks }) => {
      const types = blocks
        .map((item: block) => item.type)
        .filter(
          (item: string, index: number, blocksArr: Array<string>) =>
            blocksArr.indexOf(item) === index
        );

      const parser_keys = Object.keys(parsers);

      return types.filter((type) => !parser_keys.includes(type));
    },
  };
};

export default parser;
