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
exports.ValueOfWalk = exports.DogWalking = void 0;
class DogWalking {
    constructor(id, date, duration, petNumber, start, finish, status, price) {
        this.id = id;
        this.date = date;
        this.duration = duration;
        this.petNumber = petNumber;
        this.start = start;
        this.finish = finish;
        this.status = status;
        this.price = price;
    }
    getId() {
        return this.id;
    }
    getDate() {
        return this.date;
    }
    getDuration() {
        return this.duration;
    }
    getPrice() {
        return this.price;
    }
    getPetNumber() {
        return this.petNumber;
    }
    getStart() {
        return this.start;
    }
    getFinish() {
        return this.finish;
    }
    getStatus() {
        return this.status;
    }
}
exports.DogWalking = DogWalking;
class ValueOfWalk {
    constructor() {
        this.value = (duration, petNumber) => __awaiter(this, void 0, void 0, function* () {
            if (duration === "30") {
                if (petNumber === 1) {
                    return 25;
                }
                else {
                    return 25 + 15 * (petNumber - 1);
                }
            }
            else if (duration === "60") {
                if (petNumber === 1) {
                    return 35;
                }
                else {
                    return 35 + 20 * (petNumber - 1);
                }
            }
        });
    }
}
exports.ValueOfWalk = ValueOfWalk;
