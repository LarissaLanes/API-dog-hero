"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const DogRouter_1 = require("./router/DogRouter");
app_1.default.use('/dog', DogRouter_1.DogRouter);
