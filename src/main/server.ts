import express from 'express'

const app = express()

app.listen(3333, () => {
  console.log('Server runing at http://localhost:3333')
})
