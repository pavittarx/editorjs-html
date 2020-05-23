import transforms from './transforms';

export default (plugins = {})=>{
  Object.assign(transforms, plugins);
  
  return {
    parse: ({blocks})=>{
      return blocks.map(block => transforms[block.type](block));
      
    },

    parseBlock: (block) => {
      return transforms[block.type](block);
    }
  }
}