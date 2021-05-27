import _ from "lodash";
import Order from "./Order.js";

export default class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    calcDiscount = (product) => {
    let discounts = {
        "DIS_10": 0.1,
        "DIS_15": 0.15,
        "DIS_20": 0.20,
    };

      let discountCode = product.code.substring(0, 6);
      if (discounts[discountCode] == undefined) {
        return 0;
      } else {
        return product.price * discounts[discountCode]
      }

      //if(product.code.startwith("DIS 10")) return product.price *0.1;
    };
    

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;

        this.products.forEach(product => {
            let discount = 0;
            discount = this.calcDiscount(product);

            if (product.code.startsWith("DIS_10")) {
                loyaltyPointsEarned += product.price / 10;
            }
            else if (product.code.startsWith( "DIS_20")) {
                loyaltyPointsEarned += product.price / 20;

            } else if (product.code.startsWith("DIS_15")) {
                loyaltyPointsEarned += product.price / 15;
            } else {
                loyaltyPointsEarned += product.price / 5;
            }

            totalPrice += product.price - discount;
        });

        return new Order(totalPrice, loyaltyPointsEarned);
    };

    displaySummary = () =>  {
        return "Customer: " + this.customer.name + "\n" + 
            "Bought:  \n" + this.products.map(p => "- " + p.name + ", " + p.price).join('\n');
    }
};
