export function ParseFunctionError(type: string){
  return new Error(`\x1b[31m The Parser function of type "${type}" is not defined. \n
  Define your custom parser functions as: \x1b[34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks \x1b[0m`);
}