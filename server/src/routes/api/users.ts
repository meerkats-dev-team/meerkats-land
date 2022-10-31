import { Router } from "express";
import UserControllers from "../../controllers/user";

const userControlles = new UserControllers

const router = Router()

router.route('/').get(userControlles.getAllUsers)
router.route('/register').post(userControlles.createNewUser)

export default router