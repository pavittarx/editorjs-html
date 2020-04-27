import transforms from './transforms';

export default (plugins = {})=>{
  Object.assign(transforms, plugins);
  
  return {
    parse: (data)=>{
      const { blocks } = data;
      return blocks.map(b => transforms[b.type](b.data));
      
    },

    parseBlock: (block) => {
      return transforms[block.type](block.data);
    }
  }
}