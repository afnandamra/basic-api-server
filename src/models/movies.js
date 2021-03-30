'use strict';
const uuid = require('uuid').v4;
class Movie {
  constructor() {
    this.moviesDS = [];
  }
  create(obj) {
    const record = {
      id: uuid(),
      data: obj,
    };
    this.moviesDS.push(record);
    return record;
  }
  read(id) {
    if (id) {
      return this.moviesDS.find((record) => record.id === id);
    } else {
      return this.moviesDS;
    }
  }
  update(id, obj) {
    for (let i = 0; i < this.moviesDS.length; i++) {
      if (this.moviesDS[i].id === id) {
        this.moviesDS[i].data = obj;
        return this.moviesDS[i];
      }
    }
  }
  delete(id) {
    this.moviesDS = this.moviesDS.filter((person) => person.id !== id);
    return this.moviesDS;
  }
}

module.exports = Movie;
