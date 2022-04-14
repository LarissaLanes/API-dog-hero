"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCustom = void 0;
class errorCustom extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.errorCustom = errorCustom;
