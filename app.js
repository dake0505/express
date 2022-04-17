const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./middleware/errorHandler')

require('./model')

const app = express()
const PORT = process.env.PORT || 3000


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})