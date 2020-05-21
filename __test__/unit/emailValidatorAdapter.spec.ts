import { EmailValidatorAdapter } from '../../src/utils/emailValidatorAdapter'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('email@emai')

    expect(isValid).toBe(false)
  })
})
