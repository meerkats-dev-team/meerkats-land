import rateLimit from 'express-rate-limit'

const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,// => 15 min
    max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
    message:
        'Too many requests from this IP, please try again after a 15 min',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


export default requestLimiter