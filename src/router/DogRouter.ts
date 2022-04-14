import { DogController } from './../controller/DogController';
import express from "express";


export const DogRouter = express.Router();

const dogController = new DogController();

DogRouter.post('/createWalk', dogController.createWalk);

DogRouter.get('/:id', dogController.getWalkById)
DogRouter.get('/all/:page/:offset', dogController.getAllWalks)