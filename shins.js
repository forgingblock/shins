#!/usr/bin/env node

'use strict';

const fs = require('fs');
const options = require('tiny-opts-parser')(process.argv);
const shins = require('./index.js');

if (options.customcss) options.customCss = true; // backwards compatibility

var inputName = './source/index.html.md';

if (options._.length > 2) {
    inputName = options._[2];
}

if (options.h) options.help = options.h;

if (options.help) {
    console.log('Usage: node shins [options] [input-markdown-filename]');
    console.log();
    console.log('-h,--help   show help and exit');
    console.log('--customcss include custom override css files');
    console.log('--inline    inline css and javascript resources');
    console.log('--logo      specify path to custom logo file');
    console.log('--minify    minify output html');
    console.log('--unsafe    do not sanitise input markdown');
    process.exit(0);
}

var inputStr = fs.readFileSync(inputName,'utf8');
options.source = inputName;

shins.render(inputStr,options,function(err,str){
    if (err) {
       console.log(err);
    }
    else {
        str = str.split('\r').join('');
        fs.writeFileSync('./index.html',str,'utf8');
    }
});

