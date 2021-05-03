'use strict';

const server=require('../src/server');

const superTest=require('supertest');
const serverRequest=superTest(server.app);

describe('testing server',()=>{
  it('handle not found routes',async ()=>{
    let response= await serverRequest.get('/not-found');
    expect(response.status).toEqual(404);
  });
  it('handle server error',async ()=>{
    let response= await serverRequest.get('/badRequet');
    expect(response.status).toEqual(500);
  });
  it('handle home route',async ()=>{
    let response= await serverRequest.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('i am work');
  });
  it('handle  bad method',async ()=>{
    let response= await serverRequest.post('/person');
    expect(response.status).toEqual(404);
  });
  
  it('status 500 if no name', async()=>{
    const res=await serverRequest.get('/person');
    expect(res.status).toEqual(500);
  });
  it('status 200 if name in query',async()=>{
    const res=await serverRequest.get('/person?name=areen');
    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual('areen');
  });
});