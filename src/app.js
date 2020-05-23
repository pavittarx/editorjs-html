import transforms from "./transforms";
import { ParseFunctionError } from "./errors";

export default (plugins = {}) => {
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
