"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogController = void 0;
const DogBusiness_1 = __importDefault(require("../business/DogBusiness"));
class DogController {
    createWalk(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, duration, petNumber, start, finish, status } = req.body;
                const input = {
                    date,
                    duration,
                    petNumber,
                    start,
                    finish,
                    status
                };
                const result = yield DogBusiness_1.default.createWalk(input);
                res.status(201).send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).send(error.message);
                }
                else {
                    res.send({ message: "Algo deu errado ao cadastrar passeio" });
                }
            }
        });
    }
    getWalkById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield DogBusiness_1.default.getWalkById(id);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).send(error.message);
                }
                else {
                    res.send({ message: "Algo deu errado ao procurara por passeio" });
                }
            }
        });
    }
    getAllWalks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.params.page);
                const offset = Number(req.params.offset);
                const result = yield DogBusiness_1.default.getAllWalks(page, offset);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).send(error.message);
                }
                else {
                    res.send({ message: "Algo deu errado ao buscar todos os passeios" });
                }
            }
        });
    }
}
exports.DogController = DogController;
exports.default = new DogController();
