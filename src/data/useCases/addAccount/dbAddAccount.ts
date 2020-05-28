import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './dbAddAccountProtocols'
import { AddAccountRepository } from '../../protocols/addAccountRepository'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { email, name, password } = account
    const encryptedPassword = await this.encrypter.encrypt(password)

    const newAccount = await this.addAccountRepository.add({
      name, email, password: encryptedPassword
    })

    return newAccount
  }
}
