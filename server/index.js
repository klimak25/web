const express = require('express')
const cors = require('cors')
const useRouter = require('./routes/routes')
const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', useRouter)

   
  app.listen(PORT, () => {
    console.log(`server and ${PORT}`)
  })