import { DogDTO } from './../model/DogModel';
import { Request, Response } from "express"
import DogBusiness from '../business/DogBusiness';

export class DogController {

   async createWalk(req: Request, res: Response) {
      try {
         const { date, duration, petNumber, start, finish, status } = req.body

         const input: DogDTO = {
            date,
            duration,
            petNumber,
            start,
            finish,
            status
         }

         const result = await DogBusiness.createWalk(
            input
         )


         res.status(201).send(result);

      } catch (error) {

         if (error instanceof Error) {
            res.status(400).send(error.message);
         } else {
            res.send({ message: "Algo deu errado ao cadastrar passeio" })
         }
      }
   }

   async getWalkById(req: Request, res: Response) {
      try {
         const id = req.params.id

         const result = await DogBusiness.getWalkById(id)

         res.status(200).send(result)

      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
         } else {
            res.send({ message: "Algo deu errado ao procurara por passeio" })
         }
      }
   }

   async getAllWalks(req: Request, res: Response) {
      try {
         const page = Number(req.params.page)
         const offset = Number(req.params.offset)

         const result = await DogBusiness.getAllWalks(page, offset)

         res.status(200).send(result)
   
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).send(error.message);
         } else {
            res.send({ message: "Algo deu errado ao buscar todos os passeios" })
         }
      }
   }
}

export default new DogController()



