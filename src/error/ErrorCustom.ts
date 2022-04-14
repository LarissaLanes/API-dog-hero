export class errorCustom extends Error {
    constructor(
       public statusCode: number,
       message: string
    ) {
       super(message);
    }
  
  }