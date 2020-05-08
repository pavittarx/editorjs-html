import transforms from './transforms';

export default (plugins = {})=>{
  Object.assign(transforms, plugins);
  
  return {
    parse: ({blocks})=>{
      return blocks.map(b => transforms[b.type](b.data));
      
    },

    parseBlock: (block) => {
      return transforms[block.type](block.data);
    }
  }
}