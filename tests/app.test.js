import {test} from 'node:test';
import assert from 'node:assert/strict'
import request from 'supertest' 
import app from '../src/app.js'

test('GET / says the API IS ALIVE', async()=>{
    const res= await request (app).get('/');

    assert.equal(res.status, 200);
    assert.equal(res.text,'Budget tracker API is alive');

});

test ('POST createCategory creates a category', async()=>{
    const res=await request(app)
        .post('/categories/createCategory')
        .send({name:'groceries'});
    assert.equal(res.status, 201);
    assert.equal(res.body.name, 'groceries');
    assert.ok(res.body.id);

});

test('POST createCategory with a duplicate name returns 409', async()=>{
    const res= await request (app)
        .post('/categories/createCategory')
        .send({name:'groceries'});

    assert.equal(res.status, 409);
    assert.equal(res.body.code, 'CATEGORY_EXISTS');
});

test('GET getAllCategories lists the created category', async()=>{

    const res= await request (app).get('/categories/getAllCategories');

    assert.equal(res.status, 200);
    assert.equal(res.body.length, 1);
    assert.equal(res.body[0].name, 'groceries');

});