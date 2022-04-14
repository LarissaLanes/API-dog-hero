import { DogWalking, DogDTO, ValueOfWalk } from './../model/DogModel';
import { DogDatabase } from './../data/DogDatabase';
import { IdGenerator } from './../services/idGenerator';
import { errorCustom } from './../error/ErrorCustom';

class DogBusiness {
    private hours: string[] = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

    constructor(
        private idGenerator: IdGenerator,
        private dogDatabase: DogDatabase,
        private valueOfWalk: ValueOfWalk
    ){
        
    }
    
 async createWalk(input : DogDTO) {

        try{
            const {date, duration, petNumber, start, finish, status} = input 

            if(!date || !petNumber || !start || !finish ) {
                throw new errorCustom(422, "preencha corretamente todos os campos")
            }

            const statusTrue = "PENDENTE" || "EM ANDAMENTO" || "FINALIZADO"

            if(!status && status != statusTrue){
                throw new errorCustom(422, "insira um status valido")
            }

            const durationTrue = "30" || "60"

            if(!duration && duration != durationTrue){
                throw new errorCustom(422, "insira uma duração valida 30 ou 60 minutos")
            }

            const id = this.idGenerator.generate()

            if(petNumber > 5 ){
                throw new errorCustom(422, "O número máximo de pets por passeio é de 5")
            }

            const startTime = this.hours.findIndex((h) => h === start)
            const finishTime = this.hours.findIndex((h) => h === finish)

            if(startTime === -1 || finishTime === -1){
                throw new errorCustom(422, "escolha um horario valido de 9 as 18")
            }

            if(finishTime === startTime){
                throw new errorCustom(422, `a diferença de horário não pode ser diferente de ${duration} minutos`)
            }

            const price = await this.valueOfWalk.value(duration, petNumber)
            
            await this.dogDatabase.createWalk(
                new DogWalking(
                    id,
                    date,
                    duration,
                    petNumber,
                    start,
                    finish,
                    status,
                    price
                )
            )

            return("Passeio cadastrado com sucesso")

        }catch(error){
            if (error instanceof Error) {
            throw new errorCustom(400, error.message)
         } else {
            throw new errorCustom(400, "Erro ao cadastrar passeio")
         }

        }
    }


    async getWalkById(id: string){
        try{
            if(!id){
                throw new errorCustom(422, "insira um id valido")
            }

            const walk = (async() => {
                const data = await this.dogDatabase.getWalkById(id)
                return data
            })

            const dataWalk = await walk()

            if(!dataWalk){
                throw new errorCustom(422, "Passeio não encontrado")
            }

            return dataWalk

        }catch(error){
            if (error instanceof Error) {
                throw new errorCustom(400, error.message)
             } else {
                throw new errorCustom(400, "Erro encontrar passeio pelo id")
             }
    
        }
    }

    async getAllWalks(page: number, offset: number){
        try{

            const pagination = (async (page: Number | any, offset: Number | any) => {
                if(page === 0){
                    throw new errorCustom(400, "Página 0 não existe")
                }else if (!page && !offset){
                    throw new errorCustom(400, "Preencha corretamente todos os dados da paginação")
                }else if (page && offset){
                    const result = await this.dogDatabase.pages(page, offset)
                    return result
                }else{
                    const result = await this.dogDatabase.getAllWalks()
                    return result
                }

            })
            
            return pagination(page, offset);

        }catch(error){
            if (error instanceof Error) {
                throw new errorCustom(400, error.message)
             } else {
                throw new errorCustom(400, "Erro encontrar passeios")
             }
        }
    }

    }




export default new DogBusiness(
    new IdGenerator(),
    new DogDatabase(),
    new ValueOfWalk()
)