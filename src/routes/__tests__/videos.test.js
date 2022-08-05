const  {SetUpMockApp}  = require('../../../tests/test_helpers')
const supertest = require('supertest');
const router = require('../videos')
const db = require('../../config/db');


app = SetUpMockApp();
app.use('/videos', router);

beforeAll(async () =>{
  await db.query('use ytsearchDB_test')
})

describe('/videos', () => {
  describe('GET', () => {
    it('Should return array of videos and 200', async() =>{
      const response = await supertest(app).get('/videos');
      //console.log(response)
      expect(response.status).toBe(200);
    })
  })
})

afterAll(async () => {
  await db.end();
});