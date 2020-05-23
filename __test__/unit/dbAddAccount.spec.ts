import { DbAddAccount } from '../../src/data/useCases/addAccount/dbAddAccount'
import { Encrypter } from '../../src/data/protocols/encrypter'
import { AddAccountModel } from '../../src/domain/useCases/addAccount'
import { AccountModel } from '../../src/domain/models/account'
import { AddAccountRepository } from '../../src/data/protocols/addAccountRepository'

interface SutType {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

describe('Db AddAccount', () => {
  const makeAddRepositoryStub = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add (value: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: '1',
          name: 'valid_name',
          email: 'valid_email@email.com',
          password: 'valid_password'
        }
        return new Promise((resolve, reject) => resolve(fakeAccount))
      }
    }
    return new AddAccountRepositoryStub()
  }
  const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
      }
    }
    return new EncrypterStub()
  }

  const makeSut = (): SutType => {
    const encrypterStub = makeEncrypterStub()
    const addAccountRepositoryStub = makeAddRepositoryStub()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
      sut,
      encrypterStub,
      addAccountRepositoryStub
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
    expect(encryptySpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw an exception if encrypter throws ', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'hashed_value'
    })
  })

  test('Should throw an exception if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const accountData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })
})
