import User from '../models/User'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

export default class UserControllers {
    /**
     * @desc Create new user (register)
     * @router POST /users/register
     * @access Public
     */
    createNewUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { username, email, password } = req.body
        if(!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
            return
        }
        let user = await User.findOne({email})
        if(user || user !== null) {
            res.status(400).json({
                success: false,
                message: 'Email is already exist'
            })
            return
        }
        await User.create({
            username,
            email,
            password
        })
        res.status(201).json({
            success: true,
            message: 'User register successful'
        })
    })

    /**
     * @desc Get all users 
     * @router GET /users
     * @access Private
     */

    getAllUsers = asyncHandler( async(_req: Request, res: Response): Promise<void> => {
        const users = await User.find()
        //.select('-password').lean()
        if(!users || users.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Not found user',
                users
            })

            return
        }
        res.json({
            success: true,
            message: 'These are all users',
            users
        })
    })
}