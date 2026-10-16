import {test, before} from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';


let categoryId;

before (async()=>{
    const res= await request(app)
    .post('/categories/CreateCategory')
    .send({name:'rent'});
    categoryId=res.body.id;

});

test('POST createTransaction creates a transaction', async()=>{
    const res=await request(app)
    .post('/transactions/createTransaction')
    .send({
        type:'expense',
        amount:500,
        category_id:categoryId,
        date:'2026-09-01',
    });

      assert.equal(res.status, 201);
      assert.equal(res.body.amount, 500);
      assert.equal(res.body.category, 'rent');
});

test('POST createTransaction with an unknown category_id returns 400', async () => {
  const res = await request(app)
    .post('/transactions/createTransaction')
    .send({
      type: 'expense',
      amount: 20,
      category_id: 999,
      date: '2026-09-02',
    });

  assert.equal(res.status, 400);
});

test('GET getAllTransactions returns the created transaction', async () => {
  const res = await request(app).get('/transactions/getAllTransactions');

  assert.equal(res.status, 200);
  assert.equal(res.body.length, 1);
});


test('GET summary returns the correct totals', async () => {
  const res = await request(app).get('/transactions/summary');

  assert.equal(res.status, 200);
  assert.equal(res.body.totalIncome, 0);
  assert.equal(res.body.totalExpenses, 500);
  assert.equal(res.body.balance, -500);
});

test('GET getTransactionByID returns one transaction', async () => {
  const list = await request(app).get('/transactions/getAllTransactions');
  const id = list.body[0].id;

  const res = await request(app).get(`/transactions/getTransactionByID/${id}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.id, id);
});

test('GET getTransactionByID with a missing id returns 404', async () => {
  const res = await request(app).get('/transactions/getTransactionByID/999');

  assert.equal(res.status, 404);
});

test('GET getTransactionByID with a non-numeric id returns 400', async () => {
  const res = await request(app).get('/transactions/getTransactionByID/abc');

  assert.equal(res.status, 400);
});

test('PUT updateTransaction replaces a transaction', async () => {
  const list = await request(app).get('/transactions/getAllTransactions');
  const id = list.body[0].id;

  const res = await request(app)
    .put(`/transactions/updateTransaction/${id}`)
    .send({
      type: 'expense',
      amount: 550,
      category_id: categoryId,
      description: 'Rent and extras',
      date: '2026-09-01',
    });

  assert.equal(res.status, 200);
  assert.equal(res.body.amount, 550);
  assert.equal(res.body.description, 'Rent and extras');
});

test('PUT updateTransaction with a missing id returns 404', async () => {
  const res = await request(app)
    .put('/transactions/updateTransaction/999')
    .send({
      type: 'expense',
      amount: 10,
      category_id: categoryId,
      date: '2026-09-01',
    });

  assert.equal(res.status, 404);
});

test('DELETE deleteTransaction removes a transaction', async () => {
  const list = await request(app).get('/transactions/getAllTransactions');
  const id = list.body[0].id;

  const res = await request(app).delete(`/transactions/deleteTransaction/${id}`);
  assert.equal(res.status, 204);

  const check = await request(app).get(`/transactions/getTransactionByID/${id}`);
  assert.equal(check.status, 404);
});

test('DELETE deleteTransaction with a missing id returns 404', async () => {
  const res = await request(app).delete('/transactions/deleteTransaction/999');

  assert.equal(res.status, 404);
});