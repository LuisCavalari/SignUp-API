import { SignUpController } from '../../src/presentation/controllers/signup'

describe('SignUp Controller', () => {
  test('Should return 400 code error if no name is provide', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpReponse = sut.handle(httpRequest)
    expect(httpReponse.statusCode).toBe(400)
  })
})
