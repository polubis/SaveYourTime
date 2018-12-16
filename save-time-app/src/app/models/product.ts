export class Product {
    constructor(public _id: any, public name: string, public company: string,
         public type: string, public picturePath?: string | any, public rate?: number, public calories?: number, public price?: number) {

    }
}
