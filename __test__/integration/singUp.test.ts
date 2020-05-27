import app from '../../src/main/config/app'
import request from 'supertest'
import { mongoHelper } from '../../src/infra/database/mongodb/helper/mongoDbHelper'

describe('SignUp route', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await mongoHelper.desconect()
  })

  beforeEach(async () => {
    const accountCollection = mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account ', async () => {
    await request(app).post('/api/signup').send({
      name: 'Luis Cavalari',
      email: 'lfelipe.felipe4@gmail.com',
      password: '123456',
      passwordConfirmation: '123456'

    }).expect(200)
  })
})
