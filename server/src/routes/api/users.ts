import { Router, Request, Response } from "express";

const router = Router()

router.get("/", (_req: Request, res: Response): void => {
    res.json({
        success: true,
        message: "All users"
    })
})

export default router