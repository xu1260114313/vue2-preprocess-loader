const compile = require('vue-template-compiler');
const pp = require('preprocess');
const platform = process.env.platform || 'development';
module.exports = function (source) {
    let option = {};
    option[platform] = true;
    let content = '';
    let {
        script,
        styles,
        template
    } = compile.parseComponent(source);
    let compilerArr = [script, template, ...styles];
    let pointer = 0;
    let curCompiler = null;
    for (var i = 1, len = compilerArr.length; i < len; i++) {
        pointer = i - 1;
        curCompiler = compilerArr[i];
        while (pointer >= 0 && compilerArr[pointer].start > curCompiler.start) {
            compilerArr[pointer + 1] = compilerArr[pointer];
            pointer--;
        }
        compilerArr[pointer + 1] = curCompiler;
    }
    let curPointer = 0;
    const codeLen = source.length;
    const typeEnum = {
        'template': 'html',
        'script': 'js',
        'style': 'css'
    };
    for (var i = 0, len = compilerArr.length; i < len; i++) {
        const compilerDOM = compilerArr[i];
        if (null === compilerDOM) {
            continue;
        }
        const startPointer = compilerDOM.start;
        const endPointer = compilerDOM.end;
        content += source.substring(curPointer, startPointer);
        content += pp.preprocess(compilerDOM.content, option, {type: typeEnum[compilerDOM.type]});
        if (i === len - 1) {
            content += source.substring(endPointer, codeLen);
        }
        curPointer = endPointer;
    }

    return content;
}