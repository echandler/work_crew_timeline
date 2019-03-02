/*

Rollup.js config file.
https://rollupjs.org/guide/en#big-list-of-options
https://rollupjs.org/guide/en#es-module-syntax
https://rollupjs.org/guide/en#tools

How to use:
  Type "rollup -c" in cmd.

*/

//import pkg from "./package.json";

var pkg = require('./package.json');

export default {
   // input: "./editor/editor.js",
    input: "./frontend/src.js",
    output: {
        format: "umd",
        name: "The NAME",
        // extend : true,
        file: "./editor_bundle.js",
        // banner: "import info from \"../inmateJournal.js\";\n",
        // outro: '/* Fancy new Rollup.js outro! */',
        // banner: '/* Fancy new Rollup.js banner! */\n',
        // // footer: '\n /* Fancy new Footer! */',
    }
};
