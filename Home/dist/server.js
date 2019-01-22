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

/***/ "./src/server/app-dev.js":
/*!*******************************!*\
  !*** ./src/server/app-dev.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconsole.log(\"\\x1b[31m\", \"\\nApp Setting Start...\");\nconsole.log(\"\\x1b[32m\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\"); //수정사항이 생길 경우 다시 빌드\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\"); //새로고침\nvar config = __webpack_require__(/*! ../../webpack.dev.config */ \"./webpack.dev.config.js\");\nvar expressLayouts = __webpack_require__(/*! express-ejs-layouts */ \"express-ejs-layouts\");\n\nvar app = express(),\n    compiler = webpack(config),\n    DIST_DIR = __dirname,\n    HTML_FILE = path.join(DIST_DIR, 'test.html');;\n\napp.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));\n\napp.use(webpackHotMiddleware(compiler));\n\napp.set('views', path.join(__dirname, '/src/view/'));\napp.set('view engine', 'ejs');\napp.engine('html', __webpack_require__(/*! ejs */ \"ejs\").renderFile);\n// app.set('layout', 'index');\n// app.set(\"layout extractScripts\", true);\n// app.use(expressLayouts);\n\n\n//app.use(express.static(\"dist\"));\n\napp.get('*', function (req, res) {\n    //res.sendFile(HTML_FILE);\n    console.log(__dirname + 'test');\n    res.render('index');\n    // compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {\n    //     if (err)\n    //         console.log(err);\n    //     console.log(\"======================\")\n    //     console.log(result)\n    //     console.log(\"======================\")\n    //     res.set('content-type', 'text/html')\n    //     res.send(result)\n    //     res.end()\n    // })\n});\n\nvar PORT = process.env.PORT || 80;\napp.listen(PORT, function () {\n    console.log(\"App listening to \" + PORT);\n});\n\nconsole.log(\"\\x1b[31m\", \"\\nApp Setting Finish...\");\nconsole.log(\"\\x1b[37m\");\n\n//# sourceURL=webpack:///./src/server/app-dev.js?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\nvar HtmlLayoutWebpackPlugin = __webpack_require__(/*! html-layout-webpack-plugin */ \"html-layout-webpack-plugin\");\n\nmodule.exports = {\n    entry: {\n        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],\n        test: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/test.js']\n    },\n    output: {\n        path: path.join(__dirname, 'dist'),\n        publicPath: '/',\n        filename: '[name].js'\n    },\n    mode: 'development',\n    target: 'web',\n    devtool: '#source-map',\n    module: {\n        rules: [{\n            enforce: \"pre\",\n            test: /\\.js$/,\n            exclude: /node_modules/,\n            loader: \"eslint-loader\",\n            options: {\n                emitWarning: true,\n                failOnError: false,\n                failOnWarning: false\n            }\n        }, {\n            test: /\\.js$/,\n            exclude: /node_modules/,\n            loader: \"babel-loader\"\n        }, {\n            test: /\\.html$/,\n            use: [{\n                loader: \"html-loader\"\n                //, options: {minimize: true}\n            }]\n        }, {\n            test: /\\.css$/,\n            use: ['style-loader', 'css-loader']\n        }, {\n            test: /\\.(png|svg|jpg|gif)$/,\n            use: ['file-loader']\n        }]\n    },\n    plugins: [new HtmlWebPackPlugin({\n        template: \"./src/view/index.html\",\n        filename: \"./index.html\",\n        chunks: ['main']\n    }), new HtmlWebPackPlugin({\n        template: \"./src/view/test.html\",\n        filename: \"./test.html\",\n        chunks: ['test']\n    }), new HtmlLayoutWebpackPlugin({\n        include: path.resolve('./src/view/includes'),\n        layout: path.resolve('./src/view/layouts')\n    }), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

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

/***/ "express-ejs-layouts":
/*!**************************************!*\
  !*** external "express-ejs-layouts" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-ejs-layouts\");\n\n//# sourceURL=webpack:///external_%22express-ejs-layouts%22?");

/***/ }),

/***/ "html-layout-webpack-plugin":
/*!*********************************************!*\
  !*** external "html-layout-webpack-plugin" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-layout-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-layout-webpack-plugin%22?");

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