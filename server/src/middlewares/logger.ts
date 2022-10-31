import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuid } from 'uuid'

const logEvents = async (message: string, fileNameLog: string): Promise<void> => {
    const timeItem = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${timeItem}\t${uuid()}\t${message}\n`
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', 'logs'))
        }
        await appendFile(path.join(__dirname, '..', 'logs', fileNameLog), logItem)
    } catch (error) {
        console.error(error)
    }
}


const loggers = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requests.log')
    next()
}


export default { logEvents, loggers }