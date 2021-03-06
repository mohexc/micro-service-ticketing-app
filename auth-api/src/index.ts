import express from 'express'
import mongoose from 'mongoose'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middleware/error-handler'
import { currentUserRouter } from './routers/current-user'
import { signinRouter } from './routers/signin'
import { signoutRouter } from './routers/signout'
import { singupRouter } from './routers/signup'
const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(singupRouter)

app.all('*', async () => { throw new NotFoundError() })

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('Connect to mongodb')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, () => { console.log('Listening on port 3000!!!') })
}

start()