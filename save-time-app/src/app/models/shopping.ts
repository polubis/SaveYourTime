import { Product } from "src/app/models/product";

export class Shopping {
  constructor(public _id: any, public name: string, public products: Product[], public date: any, public shops: string[],
    public sum: number, public payWay = 'cart') {

  }
}
