const edjsHTML = require("../build/edjsHTML");
const data = require("./shittyData.json");

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
