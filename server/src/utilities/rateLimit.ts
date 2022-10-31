import rateLimit from 'express-rate-limit'
import os from 'os'

const osInfo: string = `${os.platform()} ${os.arch()}`
const ipAddress: string | undefined = `${osInfo} ${os.networkInterfaces().wlp2s0?.[0].address}`

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,// => 15 min
    max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
    message:
        `Too many requests from this "${ipAddress}", please try again after a 15 min`,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


export default requestLimiter