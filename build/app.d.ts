import { OutputData } from "@editorjs/editorjs";
import { block } from "./transforms";
declare type parser = {
    parse(OutputData: OutputData): Array<string>;
    parseStrict(OutputData: OutputData): Array<string> | Error;
    parseBlock(block: block): string;
    validate(OutputData: OutputData): Array<string>;
};
declare const parser: (plugins?: {}) => parser;
export default parser;
