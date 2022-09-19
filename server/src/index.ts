import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'

const app: Application = express()
const port: number = 5000 || Number(process.env.PORT)

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response): void => {
    console.log(_req)
    res.json({
        message: 'Hello! there.'
    })
})
app.use("/api" ,routes)

app.use((req: Request, res:Response) => {
    res.status(404).json({
        success: false,
        message: "Oops! This page isn't found."
    })
})

app.listen(port, () => console.info(`Server is runnig on: http://localhost:${port}`))

export default app