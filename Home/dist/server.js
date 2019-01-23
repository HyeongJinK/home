/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/app-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./layout.js":
/*!*******************!*\
  !*** ./layout.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nmodule.exports = function () {\n  function HTMLLayout(options) {\n    var _this = this;\n\n    _classCallCheck(this, HTMLLayout);\n\n    this.pattern = /(!!!\\s*)@([\\w-\\/]+):([\\w-\\/]+)(\\s!!!)?/g;\n    this.options = options;\n    Object.keys(this.options).forEach(function (key) {\n      var filePath = _this.options[key];\n      if (typeof filePath !== \"string\" || !path.isAbsolute(filePath)) {\n        throw new Error(\"Invalid '\" + key + \"' option provided, it must be a string path.\");\n      }\n    });\n  }\n\n  _createClass(HTMLLayout, [{\n    key: \"apply\",\n    value: function apply(compiler) {\n      var _this2 = this;\n\n      var optionsKeys = Object.keys(this.options);\n      compiler.hooks.compilation.tap(\"HTMLLayout\", function (compilation) {\n        compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(\"HTMLLayout\", function (htmlPluginData, cb) {\n          var matches = null;\n          var slotData = htmlPluginData.html.replace(_this2.pattern, \"\");\n          htmlPluginData.html = htmlPluginData.html.replace(slotData, \"\");\n          while ((matches = _this2.pattern.exec(htmlPluginData.html)) !== null) {\n            htmlPluginData.html = htmlPluginData.html.replace(_this2.pattern, function (match, $1, $2, $3) {\n              if (optionsKeys.includes($2)) {\n                var fliePath = path.join(_this2.options[$2], $3 + \".html\");\n                var flieData = fs.readFileSync(fliePath, \"utf8\");\n                compiler.hooks.afterCompile.tap('after-compile', function (compilation) {\n                  //beforeCompile 로 수정\n                  compilation.fileDependencies.add(fliePath);\n                });\n                return flieData;\n              } else if ($2 === \"slot\" && $3 === \"true\") {\n                return slotData;\n              } else {\n                throw new Error(\"HTMLLayout\\uFF1Aunrecognized this command: '\" + match + \"'\");\n              }\n            });\n          }\n          cb(null, htmlPluginData);\n        });\n      });\n    }\n  }]);\n\n  return HTMLLayout;\n}();\n\n//# sourceURL=webpack:///./layout.js?");

/***/ }),

/***/ "./src/server/app-dev.js":
/*!*******************************!*\
  !*** ./src/server/app-dev.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconsole.log(\"\\x1b[31m\", \"\\nApp Setting Start...\");\nconsole.log(\"\\x1b[32m\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\"); //수정사항이 생길 경우 다시 빌드\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\"); //새로고침\nvar config = __webpack_require__(/*! ../../webpack.dev.config */ \"./webpack.dev.config.js\");\n\nvar app = express(),\n    compiler = webpack(config),\n    DIST_DIR = __dirname,\n    HTML_FILE = path.join(DIST_DIR, 'index.html');;\n\napp.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));\n\napp.use(webpackHotMiddleware(compiler));\n\napp.set('views', path.join(__dirname, ''));\napp.set('view engine', 'ejs');\napp.engine('html', __webpack_require__(/*! ejs */ \"ejs\").renderFile);\n\n//app.use(express.static(\"dist\"));\n\napp.get('*', function (req, res) {\n    res.render('index.html');\n    // compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {\n    //     if (err)\n    //         console.log(err);\n    //     console.log(\"======================\")\n    //     console.log(result)\n    //     console.log(\"======================\")\n    //     res.set('content-type', 'text/html')\n    //     res.send(result)\n    //     res.end()\n    // })\n});\n\nvar PORT = process.env.PORT || 80;\napp.listen(PORT, function () {\n    console.log(\"App listening to \" + PORT);\n});\n\nconsole.log(\"\\x1b[31m\", \"\\nApp Setting Finish...\");\nconsole.log(\"\\x1b[37m\");\n\n//# sourceURL=webpack:///./src/server/app-dev.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\nvar HTMLLayout = __webpack_require__(/*! ./layout */ \"./layout.js\");\n\nmodule.exports = {\n    entry: {\n        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],\n        test: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/test.js']\n    },\n    output: {\n        path: path.join(__dirname, 'dist'),\n        publicPath: '/',\n        filename: '[name].js'\n    },\n    mode: 'development',\n    target: 'web',\n    devtool: '#source-map',\n    module: {\n        rules: [{\n            enforce: \"pre\",\n            test: /\\.js$/,\n            exclude: /node_modules/,\n            loader: \"eslint-loader\",\n            options: {\n                emitWarning: true,\n                failOnError: false,\n                failOnWarning: false\n            }\n        }, {\n            test: /\\.js$/,\n            exclude: /node_modules/,\n            loader: \"babel-loader\"\n        }, {\n            test: /\\.html$/,\n            use: [{\n                loader: \"html-loader\"\n                //, options: {minimize: true}\n            }]\n        }, {\n            test: /\\.css$/,\n            use: ['style-loader', 'css-loader']\n        }, {\n            test: /\\.(png|svg|jpg|gif)$/,\n            use: ['file-loader']\n        }]\n    },\n    plugins: [new HtmlWebPackPlugin({\n        template: \"./src/views/index.html\",\n        filename: \"./index.html\",\n        chunks: ['main']\n    }), new HtmlWebPackPlugin({\n        template: \"./src/views/test.html\",\n        filename: \"./test.html\",\n        chunks: ['test']\n    }), new HTMLLayout({\n        include: path.resolve('./src/views/includes'),\n        layout: path.resolve('./src/views/layouts')\n    }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs\");\n\n//# sourceURL=webpack:///external_%22ejs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });