import express, { Application } from 'express'

const app: Application = express()
const port: number = 5000 || Number(process.env.PORT)

app.listen(port, () => console.info(`Server is runnig on: http://localhost:${port}`))

export default app