const db = require('../util/database')

const Cart = require('./cart');

const getProductsFromFile = () => {
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
      if(this.id){
        return db.execute(`UPDATE products
        SET title = '${this.title}', price = '${this.price}', description = '${this.description}', imageUrl = '${this.imageUrl}'
        WHERE products.product_id = ${this.id};`);
      }
        return db.execute('INSERT INTO products (product_id, title, price, description, imageUrl) VALUES (?, ?, ?, ?, ?)', [this.id, this.title,  this.price, this.description, this.imageUrl]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.product_id = ?', [id]);
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.product_id = ?', [id]);

  }
};
