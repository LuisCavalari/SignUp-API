import { MongoClient } from 'mongodb'

export const mongoHelper = {
  client: null as MongoClient,
  async  connect (uri: string) {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async desconect () {
    await this.client.close()
  }
}
