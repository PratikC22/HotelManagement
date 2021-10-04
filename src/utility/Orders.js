class Orders {
  uniqueKey;
  item;
  quantity;
  price;

  constructor(...params) {
    this.uniqueKey = params[0];
    this.item = params[1];
    this.quantity = params[2];
    this.price = params[3];
  }
}

module.exports = Orders;