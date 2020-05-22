import { DbAddAccount } from '../../src/data/useCases/addAccount/dbAddAccount'
import { Encrypter } from '../../src/data/protocols/encrypter'

describe('Db AddAccount', () => {
  test('Should call encrypter with correct password ', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: any): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptySpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptySpy).toHaveBeenCalledWith(accountData)
  })
})
