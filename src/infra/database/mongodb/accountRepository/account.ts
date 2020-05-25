import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import { AccountModel } from '../../../../domain/models/account'
import { mongoHelper } from '../helper/mongoDbHelper'

export default class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const collection = mongoHelper.getCollection('accounts')
    const response = await collection.insertOne(account)
    const newAccount = response.ops[0]
    const { _id, ...accountWithoutId } = newAccount

    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
