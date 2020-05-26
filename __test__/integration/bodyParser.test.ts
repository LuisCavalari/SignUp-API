import request from 'supertest'
import app from '../../src/main/config/app'

describe('Body parser middleware', () => {
  test('should ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Luis' })
      .expect({ name: 'Luis' })
  })
})
