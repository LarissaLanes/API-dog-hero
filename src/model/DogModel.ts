
export class DogWalking {

   constructor(
      private id: String,
      private date: Date,
      private duration: String,
      private petNumber: Number,
      private start: String,
      private finish: String,
      private status: String,
      private price : String
   ) { }

   public getId(): String {
      return this.id;
   }

   public getDate(): Date {
      return this.date;
   }

   public getDuration(): String {
      return this.duration;
   }

   public getPrice(): String {
     return this.price;
   }

   public getPetNumber(): Number {
      return this.petNumber;
   }

   public getStart(): String {
      return this.start;
   }

   public getFinish(): String {
      return this.finish;
   }

   public getStatus(): String{
      return this.status;
   }

   
}

export interface DogDTO{
    date: Date,
    duration: String,
    petNumber: Number,
    start: String,
    finish: String,
    status: String

}

export class ValueOfWalk{
   
     value = async( duration: String, petNumber: Number | any): Promise<any> => {

        if(duration === "30"){
            if(petNumber === 1){
                return 25
            }else{
                return 25 + 15 * (petNumber -1)
            }
        }else if(duration === "60"){
            if(petNumber ===  1){
                return 35
            }else{
                return 35 + 20 * (petNumber -1)
            }
        }
    }

  


}
