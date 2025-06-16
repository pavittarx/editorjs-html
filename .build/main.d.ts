import { OutputBlockData, OutputData } from "@editorjs/editorjs";
type Plugins = (props: OutputBlockData) => {};
type Options = {
    strict: boolean;
};
declare const parser: (plugins?: Record<string, Plugins>, options?: Options) => {
    parse: (blocks: OutputData) => string;
    parseBlock: (block: OutputBlockData) => {} | undefined;
};
export default parser;
