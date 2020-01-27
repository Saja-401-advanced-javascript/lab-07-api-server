'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {
  it('responds with a 500 on error', () => {
    return mockRequest
      .get('/real-error')
      .then(results =>{
        expect(results.status).toBe(500);
      })
      .catch(console.error);
  });

  it('responds with a 404 if a route is not found', () => {
    return mockRequest
      .get('/some-route-that-doesnt-exist')
      .then(results =>{
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });

  it('respond properly to a get request to /api/v1/products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
        expect(typeof results.body.results).toBe('object');
      });
  });

  it('respond properly to a post request to /api/v1/categories', () => {
    return mockRequest
      .post('/api/v1/categories')
      .send({ name: 'test name' })
      .then(results => {
        expect(results.status).toBe(201);
        expect(results.body.name).toEqual('test name');
        expect(results.body).toBeDefined();
      });
  });
})




const Element = require('../../in-memory-data-model.js');
// const Products = require('../products/products.js');


describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Element();

  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });


  

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        record.name = 'new Category';
        categories.update(record._id, record);
        categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        categories.delete(record)
          .then(category => {
            expect(category).toBeUndefined();
          });
      });

  });


});




describe('Products Model', () => {

  let products;

  beforeEach(() => {
    products = new Element();
  });

  it('can post() a new product', () => {
    let obj = { name: 'test product' };
    return products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });


  it('can get() a product', () => {
    let obj = { name: 'test product' };
    return products.create(obj)
      .then(record => {
        return products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a product', () => {
    let obj = {name: 'test product' };
    return products.create(obj)
      .then(record => {
        record.price = 50;
        products.update(record._id, record);
        products.get(record._id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { name: 'test product'};
    return products.create(obj)
      .then(record => {
        products.delete(record)
          .then(product => {
            expect(product).toBeUndefined();
          });
      });
  });

});