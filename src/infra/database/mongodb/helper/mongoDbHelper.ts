import { MongoClient, Collection } from 'mongodb'

export const mongoHelper = {
  client: null as MongoClient,
  async  connect (uri: string) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async desconect () {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
