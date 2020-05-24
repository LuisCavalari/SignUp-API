import { BcryptAdapter } from '../../src/infra/criptography/bcryptAdapter'
import bcrypt from 'bcrypt'

interface SutType {
  sut: BcryptAdapter
}
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('Bcrypt Adapter', () => {
  const salt = 12
  const makeSut = (): SutType => {
    const sut = new BcryptAdapter(salt)
    return { sut }
  }
  test('Should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(bcryptSpy).toHaveBeenCalledWith('password', salt)
  })

  test('Should ensure return encrypted password from bcrypt', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw an exception if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
