import request from 'supertest';
import app from '../index.js';


let server; 

beforeAll(() => {
 server = app.listen(0); 
});

afterAll((done) => {
  server.close(done); 
});

describe(' GET /api/viajes', () => {
    it('Debería devolver una lista de viajes', async () => {
       const res = await request(app).get('/api/viajes');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('viajes');
       expect(Array.isArray(res.body.viajes)).toBe(true); 
     });
   });
  

  

