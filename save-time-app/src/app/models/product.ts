export class Product {
    constructor(public id: any, public name: string, public company: string,
         public type: string, public rate?: number, public calories?: number, public numberOfVotes: number = 0) {
            
    }
}