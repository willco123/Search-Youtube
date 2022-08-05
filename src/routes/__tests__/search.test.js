require('iconv-lite').encodingExists('foo')//Handles mysql2 encoding error
const  {SetUpMockApp}  = require('../../../tests/test_helpers')
const supertest = require('supertest');
const router = require('../search')
const db = require('../../config/db')
app = SetUpMockApp();
app.use('/search', router);
//jest.useFakeTimers();//Handles ReferenceError 

// beforeAll(async () =>{
//   await db.query('use ytsearchDB_test')
// })

describe('/search', () => {
  describe('GET', () => {
    it('Should save videos to DB', async() =>{
    const response = await supertest(app).get('/search');
     expect(response.status).toBe(200);

    })
  })
})

afterAll(async () => {
  await db.end();
});