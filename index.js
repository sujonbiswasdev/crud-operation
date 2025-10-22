import express from 'express'
import cors from 'cors'
import router from './src/router.js'
const app = express()
const port = 3000

// middleware
 app.use(cors())
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))

 app.use("/users",router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
