import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from './middlewares/logger'
import routes from './routes'
import config from './config/config'
import dbConnect from './config/dbConnect'
import requestLimiter from './utilities/rateLimit'
import { connection } from 'mongoose'
import corsOption from './config/corsOption'
import errorHandler from './middlewares/errorHandler'

const app: Application = express()
const port = config.port

dbConnect()

app.use(requestLimiter)

app.use(logger.loggers)


app.use(express.json())

app.use(cors(corsOption))
app.use(cookieParser())

app.use(helmet())
app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response): void => {
    res.json({
        message: 'Hello! there.'
    })
})
app.use("/api" ,routes)

app.use((_req: Request, res:Response) => {
    res.status(404).json({
        success: false,
        message: "Oops! Not found page"
    })
})

connection.once('open', (): void => {
    console.info(`Database is running MONGODB`)
    app.listen(port, () => console.info(`Server is runnig on: http://localhost:${port}`))
})

connection.on('error', (err): void => {
    logger.logEvents(`${err.no}:\t${err.code}\t${err.syscall}\t${err.hostname} `,
        'databaseErrors.log')
})

app.use(errorHandler)


export default app