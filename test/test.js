const edjsHTML = require("../build/edjsHTML");
const data = require("./data.json");

const edjsParser = edjsHTML();
console.log(edjsParser.parseStrict(data));

console.log(edjsParser.validate(data));

// test for custom parser
const customParser = edjsHTML({
    custom: function({data}) {
        return `<custom>success</custom>`;
    },
    paragraph: function({data}) {
        return `<p>override test</p>`;
    }
})

console.log(customParser.parseStrict({
    blocks: [
        {
            type: "custom",
            data: {}
        }
    ]
}))
console.log(customParser.parseStrict(data));
console.log(customParser.validate(data));

// test for issue #21
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar"}}) === '<p>foo bar</p>');

// test for issue #39
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", alignment: "right"}}) === '<p style="text-align:right;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", alignment: "justify"}}) === '<p style="text-align:justify;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", alignment: "center"}}) === '<p style="text-align:center;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", alignment: "left"}}) === '<p style="text-align:left;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", alignment: "wrong type"}}) === '<p>foo bar</p>');

console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", align: "right"}}) === '<p style="text-align:right;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", align: "justify"}}) === '<p style="text-align:justify;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", align: "center"}}) === '<p style="text-align:center;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", align: "left"}}) === '<p style="text-align:left;">foo bar</p>');
console.log(edjsParser.parseBlock({type: "paragraph", data: {text: "foo bar", align: "wrong type"}}) === '<p>foo bar</p>');



