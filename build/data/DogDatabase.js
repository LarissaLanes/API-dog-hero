"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogDatabase = void 0;
const ErrorCustom_1 = require("./../error/ErrorCustom");
const DogModel_1 = require("./../model/DogModel");
const BaseData_1 = __importStar(require("./BaseData"));
class DogDatabase extends BaseData_1.default {
    toModel(dbModel) {
        return (dbModel && new DogModel_1.DogWalking(dbModel.id, dbModel.date, dbModel.duration, dbModel.petNumber, dbModel.start, dbModel.finish, dbModel.status, dbModel.price));
    }
    createWalk(dog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseData_1.default.connection.raw(`
            INSERT INTO ${BaseData_1.table_name} (id, date, duration, pet_number, start, finish, status, price)
            VALUES (
                '${dog.getId()}',
                '${dog.getDate()}',
                '${dog.getDuration()}',
                '${dog.getPetNumber()}',
                '${dog.getStart()}',
                '${dog.getFinish()}',
                '${dog.getStatus()}',
                '${dog.getPrice()}')
            `);
            }
            catch (error) {
                if (error instanceof ErrorCustom_1.errorCustom) {
                    throw new ErrorCustom_1.errorCustom(401, error.message);
                }
            }
        });
    }
    getWalkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseData_1.default.connection.raw(`
            SELECT * FROM ${BaseData_1.table_name} WHERE id = '${id}'
            `);
                return this.toModel(result[0][0]);
            }
            catch (error) {
                if (error instanceof ErrorCustom_1.errorCustom) {
                    throw new ErrorCustom_1.errorCustom(401, error.message);
                }
            }
        });
    }
    getAllWalks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseData_1.default.connection.raw(`
                SELECT * FROM ${BaseData_1.table_name}
            `);
                return result[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
    pages(page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseData_1.default.connection.raw(`
                SELECT * FROM ${BaseData_1.table_name} LIMIT ${page - 1}, ${offset}
            `);
                return result[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.DogDatabase = DogDatabase;
