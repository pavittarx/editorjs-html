import { OutputData } from '@editorjs/editorjs';
import { block } from "./transforms";
declare type parser = {
    parse(OutputData: OutputData): any;
    parseBlock(block: block): any;
};
declare const parser: (plugins?: {}) => parser;
export default parser;
