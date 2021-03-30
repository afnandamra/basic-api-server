'use strict';

const superTest = require('supertest');
const { app } = require('../src/server');
const request = superTest(app);
let id;

describe('Server Test', () => {
  it('handle working routes', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Home Page');
  });
  it('handle invalid routes', async () => {
    const response = await request.get('/whatever');
    expect(response.status).toEqual(404);
  });
  it('handle bad method', async () => {
    const response = await request.patch('/*');
    // expect(response.request.method).toBe('POST');
    expect(response.status).toEqual(404);
  });
});

describe('Clothes Route CRUD Test', () => {
  it('read all from DataBase test on GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data Available');
  });
  it('create test on POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      type: 'pants',
      color: 'Black',
    });
    expect(response.status).toEqual(201);
    expect(response.body.data.type).toEqual('pants');
    id = response.body.id;
  });
  it('read all from DataBase test on GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('should be able to read specific data on GET /clothes', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual('pants');
  });
  it('should throw an error if the ID does not exist on GET /clothes', async () => {
    const response = await request.get(`/api/v1/clothes/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`ID doesn't exist`);
  });
  it('should be able to update data on PUT /clothes', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      type: 'Pants',
      color: 'Black',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual('Pants');
  });
  it('should throw an error if the ID does not exist on PUT /clothes', async () => {
    const response = await request.put(`/api/v1/clothes/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`ID doesn't exist`);
  });
  it('should give an error if you try to update data without id', async () => {
    const response = await request.put(`/api/v1/clothes`).send({
      type: 'Pants',
      color: 'Black',
    });
    expect(response.status).toEqual(500);
  });
  it('should be able to delete data on DELETE /clothes', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data Available');
  });
});

describe('Movies Route CRUD Test', () => {
  it('read all from DataBase test on GET /movies', async () => {
    const response = await request.get('/api/v1/movies');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data Available');
  });
  it('create test on POST /clothes', async () => {
    const response = await request.post('/api/v1/movies').send({
      type: 'Action',
      actor: 'Ryan Reynolds',
    });
    expect(response.status).toEqual(201);
    expect(response.body.data.actor).toEqual('Ryan Reynolds');
    id = response.body.id;
  });
  it('read all from DataBase test on GET /movies', async () => {
    const response = await request.get('/api/v1/movies');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('should be able to read specific data on GET /movies', async () => {
    const response = await request.get(`/api/v1/movies/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.data.actor).toEqual('Ryan Reynolds');
  });
  it('should throw an error if the ID does not exist on GET /movies', async () => {
    const response = await request.get(`/api/v1/movies/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`ID doesn't exist`);
  });
  it('should be able to update data on PUT /movies', async () => {
    const response = await request.put(`/api/v1/movies/${id}`).send({
      type: 'Action',
      actor: 'Ryan Reynolds',
      actress: 'Blake Lively',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data.actress).toEqual('Blake Lively');
  });
  it('should throw an error if the ID does not exist on PUT /movies', async () => {
    const response = await request.put(`/api/v1/movies/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`ID doesn't exist`);
  });
  it('should give an error if you try to update data without id', async () => {
    const response = await request.put(`/api/v1/movies`).send({
      type: 'Comedy',
      actor: 'Ryan Reynolds',
    });
    expect(response.status).toEqual(500);
  });
  it('should be able to delete data on DELETE /movies', async () => {
    const response = await request.delete(`/api/v1/movies/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data Available');
  });
});

