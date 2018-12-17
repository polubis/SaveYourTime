import { Product } from "src/app/models/product";

export class ShoppingProduct {
  constructor(public product: Product, public cost: number, public sum: number, public discount: number, public quantity: number = 1) {

  }
}


export class Shopping {
  constructor(public _id: any, public name: string, public products: ShoppingProduct[],
    public date: any, public shops: string[], public sum: number, public payWay = 'cart') {

  }
}
