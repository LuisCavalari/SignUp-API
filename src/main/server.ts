import app from './config/app'
import env from './config/env'
import { mongoHelper } from '../infra/database/mongodb/helper/mongoDbHelper'

mongoHelper.connect(env.MONGO_URL).then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server runing at http://localhost:${env.PORT}`)
  })
}).catch(console.error)
