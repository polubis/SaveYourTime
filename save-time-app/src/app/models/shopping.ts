import { Product } from "src/app/models/product";

export class ShoppingProduct {
  constructor(public productName: string, public cost: number, public discount: number, public quantity: number = 1, public sum: number = 0) {
    console.log(cost);
    const sumVal: number = quantity * cost;
    this.sum = Math.round(sumVal * 100) / 100
  }
}


export class Shopping {
  constructor(public _id: any, public name: string, public products: ShoppingProduct[],
    public date: any, public shops: string[], public sum: number, public payWay = 'cart') {

  }
}
