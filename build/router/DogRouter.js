"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogRouter = void 0;
const DogController_1 = require("./../controller/DogController");
const express_1 = __importDefault(require("express"));
exports.DogRouter = express_1.default.Router();
const dogController = new DogController_1.DogController();
exports.DogRouter.post('/createWalk', dogController.createWalk);
exports.DogRouter.get('/:id', dogController.getWalkById);
exports.DogRouter.get('/all/:page/:offset', dogController.getAllWalks);
