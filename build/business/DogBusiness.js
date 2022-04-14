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
Object.defineProperty(exports, "__esModule", { value: true });
const DogModel_1 = require("./../model/DogModel");
const DogDatabase_1 = require("./../data/DogDatabase");
const idGenerator_1 = require("./../services/idGenerator");
const ErrorCustom_1 = require("./../error/ErrorCustom");
class DogBusiness {
    constructor(idGenerator, dogDatabase, valueOfWalk) {
        this.idGenerator = idGenerator;
        this.dogDatabase = dogDatabase;
        this.valueOfWalk = valueOfWalk;
        this.hours = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
    }
    createWalk(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, duration, petNumber, start, finish, status } = input;
                if (!date || !petNumber || !start || !finish) {
                    throw new ErrorCustom_1.errorCustom(422, "preencha corretamente todos os campos");
                }
                const statusTrue = "PENDENTE" || "EM ANDAMENTO" || "FINALIZADO";
                if (!status && status != statusTrue) {
                    throw new ErrorCustom_1.errorCustom(422, "insira um status valido");
                }
                const durationTrue = "30" || "60";
                if (!duration && duration != durationTrue) {
                    throw new ErrorCustom_1.errorCustom(422, "insira uma duração valida 30 ou 60 minutos");
                }
                const id = this.idGenerator.generate();
                if (petNumber > 5) {
                    throw new ErrorCustom_1.errorCustom(422, "O número máximo de pets por passeio é de 5");
                }
                const startTime = this.hours.findIndex((h) => h === start);
                const finishTime = this.hours.findIndex((h) => h === finish);
                if (startTime === -1 || finishTime === -1) {
                    throw new ErrorCustom_1.errorCustom(422, "escolha um horario valido de 9 as 18");
                }
                if (finishTime === startTime) {
                    throw new ErrorCustom_1.errorCustom(422, `a diferença de horário não pode ser diferente de ${duration} minutos`);
                }
                const price = yield this.valueOfWalk.value(duration, petNumber);
                yield this.dogDatabase.createWalk(new DogModel_1.DogWalking(id, date, duration, petNumber, start, finish, status, price));
                return ("Passeio cadastrado com sucesso");
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new ErrorCustom_1.errorCustom(400, error.message);
                }
                else {
                    throw new ErrorCustom_1.errorCustom(400, "Erro ao cadastrar passeio");
                }
            }
        });
    }
    getWalkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new ErrorCustom_1.errorCustom(422, "insira um id valido");
                }
                const walk = (() => __awaiter(this, void 0, void 0, function* () {
                    const data = yield this.dogDatabase.getWalkById(id);
                    return data;
                }));
                const dataWalk = yield walk();
                if (!dataWalk) {
                    throw new ErrorCustom_1.errorCustom(422, "Passeio não encontrado");
                }
                return dataWalk;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new ErrorCustom_1.errorCustom(400, error.message);
                }
                else {
                    throw new ErrorCustom_1.errorCustom(400, "Erro encontrar passeio pelo id");
                }
            }
        });
    }
    getAllWalks(page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = ((page, offset) => __awaiter(this, void 0, void 0, function* () {
                    if (page === 0) {
                        throw new ErrorCustom_1.errorCustom(400, "Página 0 não existe");
                    }
                    else if (!page && !offset) {
                        throw new ErrorCustom_1.errorCustom(400, "Preencha corretamente todos os dados da paginação");
                    }
                    else if (page && offset) {
                        const result = yield this.dogDatabase.pages(page, offset);
                        return result;
                    }
                    else {
                        const result = yield this.dogDatabase.getAllWalks();
                        return result;
                    }
                }));
                return pagination(page, offset);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new ErrorCustom_1.errorCustom(400, error.message);
                }
                else {
                    throw new ErrorCustom_1.errorCustom(400, "Erro encontrar passeios");
                }
            }
        });
    }
}
exports.default = new DogBusiness(new idGenerator_1.IdGenerator(), new DogDatabase_1.DogDatabase(), new DogModel_1.ValueOfWalk());
