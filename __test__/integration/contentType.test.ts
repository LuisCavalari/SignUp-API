import request from 'supertest'
import app from '../../src/main/config/app'

describe('Content type', () => {
  test('Should return content type as json', async () => {
    app.post('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app).post('/test_content_type')
      .expect('content-type', /json/)
  })
})
