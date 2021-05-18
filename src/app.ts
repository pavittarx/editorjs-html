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
  Object.assign(plugins, transforms);

  return {
    parse: ({ blocks }) => {
      return blocks.map((block) => {
        return transforms[block.type]
          ? transforms[block.type](block)
          : ParseFunctionError(block.type);
      });
    },

    parseBlock: (block) => {
      return transforms[block.type]
        ? transforms[block.type](block)
        : ParseFunctionError(block.type);
    },

    parseStrict: ({ blocks }) => {
      const parserFreeBlocks = parser(plugins).validate({ blocks });

      if (parserFreeBlocks.length)
        return new Error(
          `Parser Functions missing for blocks: ${parserFreeBlocks.toString()}`
        );

      const parsed = [];

      for (let i = 0; i < blocks.length; i++) {
        if (!transforms[blocks[i].type])
          throw ParseFunctionError(blocks[i].type);

        parsed.push(transforms[blocks[i].type](blocks[i]));
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

      const parsers = Object.keys(transforms);

      return types.filter((type) => !parsers.includes(type));
    },
  };
};

export default parser;
