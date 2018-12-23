export class Product {
    constructor(public _id: any, public name: string, public detailedName: string, public category: string,
        public picturePath?: string | any, public rate?: number, public calories?: number, public caloriesUnit: string = 'kcal') {
    }
}

export interface IProductCategory {
  _id: string;
  name: string;
}
