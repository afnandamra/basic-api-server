'use strict';
const uuid = require('uuid').v4;
class Clothes {
  constructor() {
    this.clothesDS = [];
  }
  create(obj) {
    const record = {
      id: uuid(),
      data: obj,
    };
    this.clothesDS.push(record);
    return record;
  }
  read(id) {
    if (id) {
      return this.clothesDS.find((record) => record.id === id);
    } else {
      return this.clothesDS;
    }
  }
  update(id, obj) {
    for (let i = 0; i < this.clothesDS.length; i++) {
      if (this.clothesDS[i].id === id) {
        this.clothesDS[i].data = obj;
        return this.clothesDS[i];
      }
    }
  }
  delete(id) {
    this.clothesDS = this.clothesDS.filter((person) => person.id !== id);
    return this.clothesDS;
  }
}

module.exports = Clothes;