import app from '../../src/main/config/app'
import request from 'supertest'

describe('SignUp route', () => {
  test('Should return an account ', async () => {
    await request(app).post('/api/signup').send({
      name: 'Luis Cavalari',
      email: 'lfelipe.felipe4@gmail.com',
      password: '123456',
      passwordConfirmation: '123456'

    }).expect(200)
  })
})
