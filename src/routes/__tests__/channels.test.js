const  {SetUpMockApp}  = require('../../../tests/test_helpers')
const supertest = require('supertest');
const router = require('../channels')
const db = require('../../config/db')

app = SetUpMockApp();
app.use('/channels', router);

beforeAll(async () =>{
  await db.query('use ytsearchDB_test')
})


describe('/channels', () => {
  describe('GET', () => {
    it('Should return array of channels and 200', async() =>{
      const response = await supertest(app).get('/channels');
      expect(response.status).toBe(200);
    })
  })
})

afterAll(async () => {
  await db.end();
});