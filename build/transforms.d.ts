export declare type transforms = {
    [key: string]: any;
    delimiter(): string;
    header(block: block): string;
    paragraph(block: block): string;
    list(block: block): string;
    image(block: block): string;
};
export declare type block = {
    type: string;
    data: {
        text?: string;
        level?: number;
        caption?: string;
        file?: {
            url?: string;
        };
        stretched?: boolean;
        withBackground?: boolean;
        withBorder?: boolean;
        items?: string[];
        style?: string;
    };
};
declare const transforms: transforms;
export default transforms;
