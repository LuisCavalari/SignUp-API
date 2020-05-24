import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt;
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: any): Promise<string> {
    const { salt } = this
    const hash = await bcrypt.hash(value, salt)
    return hash
  }
}
