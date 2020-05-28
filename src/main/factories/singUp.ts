import { SignUpController } from '../../presentation/controllers/signUp/signup'
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter'
import { DbAddAccount } from '../../data/useCases/addAccount/dbAddAccount'
import AccountRepository from '../../infra/database/mongodb/accountRepository/account'
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const accountRepository = new AccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)

  return signUpController
}
