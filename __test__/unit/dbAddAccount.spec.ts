import { DbAddAccount } from '../../src/data/useCases/addAccount/dbAddAccount'
import { Encrypter } from '../../src/data/protocols/encrypter'

interface SutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

describe('Db AddAccount', () => {
  const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: any): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
      }
    }
    return new EncrypterStub()
  }

  const makeSut = (): SutType => {
    const encrypterStub = makeEncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
      sut,
      encrypterStub
    }
  }

  test('Should call encrypter with correct password ', async () => {
    const { sut, encrypterStub } = makeSut()
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
