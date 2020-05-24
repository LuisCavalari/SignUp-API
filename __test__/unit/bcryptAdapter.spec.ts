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
  const makeSut = (): SutType => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    return { sut }
  }
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(12)
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(bcryptSpy).toHaveBeenCalledWith('password', salt)
  })

  test('Shoul ensure return encrypted password from bcrypt', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    jest.spyOn(bcrypt, 'hash')
    expect(hash).toBe('hashed_value')
  })
})
