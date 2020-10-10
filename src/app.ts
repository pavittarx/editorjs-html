import { OutputData } from '@editorjs/editorjs';
import transforms, { block } from "./transforms";
import { ParseFunctionError } from "./errors";

type parser = {
  parse(OutputData: OutputData): any;
  parseBlock(block: block): any;
}

const parser = (plugins = {}): parser => {
  Object.assign(transforms, plugins);

  return {
    parse: ({ blocks }) => {
      return blocks.map((block) => {
        return transforms[block.type]? 
        transforms[block.type](block)
          : ParseFunctionError(block.type);
      });
    },

    parseBlock: (block) => {
      return transforms[block.type]
        ? transforms[block.type](block)
        : ParseFunctionError(block.type);
    },
  };
};

export default parser