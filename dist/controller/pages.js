"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlPage = exports.loginPage = void 0;
const handlebars_1 = require("../helpers/handlebars");
const loginPage = (req, res) => {
    res.render('home');
};
exports.loginPage = loginPage;
const controlPage = (req, res) => {
    res.render('controlpanel', handlebars_1.home);
};
exports.controlPage = controlPage;
//# sourceMappingURL=pages.js.map