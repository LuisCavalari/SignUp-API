import { mongoHelper } from '../../src/infra/database/mongodb/helper/mongoDbHelper'
import AccountMongoRepository from '../../src/infra/database/mongodb/accountRepository/account'
describe('Account repository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await mongoHelper.desconect()
  })

  test('Should return an account on sucess', async () => {
    const sut = new AccountMongoRepository()
    const fakeAccount = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const account = await sut.add(fakeAccount)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(fakeAccount.name)
    expect(account.email).toBe(fakeAccount.email)
    expect(account.password).toBe(fakeAccount.password)
  })
})
