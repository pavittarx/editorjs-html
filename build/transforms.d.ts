export declare type transforms = {
    [key: string]: any;
    delimiter(): string;
    header(block: block): string;
    paragraph(block: block): string;
    list(block: block): string;
    image(block: block): string;
    quote(block: block): string;
    code(block: block): string;
    embed(block: block): string;
};
declare type ListItem = {
    content: string;
    items: Array<ListItem>;
};
export declare type block = {
    type: string;
    data: {
        text?: string;
        level?: number;
        caption?: string;
        url?: string;
        file?: {
            url?: string;
        };
        stretched?: boolean;
        withBackground?: boolean;
        withBorder?: boolean;
        items?: Array<string> | Array<ListItem>;
        style?: string;
        code?: string;
        service?: "vimeo" | "youtube";
        source?: string;
        embed?: string;
        width?: number;
        height?: number;
    };
};
declare const transforms: transforms;
export default transforms;
