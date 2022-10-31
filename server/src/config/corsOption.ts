import allowedOrigins from "./allowedOrigins"

const corsOption =  {
    origin: (origin: unknown, callback: Function): void => {
        if(allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true as boolean,
    optionsSuccessStatus: 200 as number,
}

export default corsOption