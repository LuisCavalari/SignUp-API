import { HttpRequest, HttpResponse, Controller, EmailValidator } from './signUpProtocols'

import { badRequest, internalServerError, success } from '../../helpers/httpHelper'
import { MissingParamError, ServerError, InvalidParamError } from '../../errors'
import { AddAccount } from '../../../domain/useCases/addAccount'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const { password, passwordConfirmation, email, name } = httpRequest.body

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({
        name,
        email,
        password
      })
      return success(account)
    } catch {
      return internalServerError(new ServerError())
    }
  }
}
