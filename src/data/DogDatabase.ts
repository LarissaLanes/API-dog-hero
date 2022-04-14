import { stat } from 'fs';
import { errorCustom } from './../error/ErrorCustom';
import { DogWalking } from './../model/DogModel';
import BaseDataBase, { table_name } from "./BaseData";


export class DogDatabase extends BaseDataBase {

    private toModel(dbModel?: any): DogWalking | undefined {
        return(
            dbModel && new DogWalking(
                dbModel.id,
                dbModel.date,
                dbModel.duration,
                dbModel.petNumber,
                dbModel.start,
                dbModel.finish,
                dbModel.status,
                dbModel.price
            )
        )
    }

   async createWalk(dog: DogWalking): Promise<void>{

        try{
            await BaseDataBase.connection.raw(`
            INSERT INTO ${table_name} (id, date, duration, pet_number, start, finish, status, price)
            VALUES (
                '${dog.getId()}',
                '${dog.getDate()}',
                '${dog.getDuration()}',
                '${dog.getPetNumber()}',
                '${dog.getStart()}',
                '${dog.getFinish()}',
                '${dog.getStatus()}',
                '${dog.getPrice()}')
            `)

        }catch(error){
            if(error instanceof errorCustom){
                throw new errorCustom(401, error.message)
            }
        }
    }

    async getWalkById(id: string): Promise<DogWalking | any>{
        try{
            const result = await BaseDataBase.connection.raw(`
            SELECT * FROM ${table_name} WHERE id = '${id}'
            `);
            return this.toModel(result[0][0]);

    }catch(error){
        if(error instanceof errorCustom){
            throw new errorCustom(401, error.message)
        }
    }
    }

    async getAllWalks(): Promise<DogWalking[] | any>{
        try{
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${table_name}
            `)
            return result[0]

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }

    async pages(page: number | any, offset: number | any): Promise<void | any>{
        try{
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${table_name} LIMIT ${page - 1}, ${offset}
            `)
            return result[0]

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }
}